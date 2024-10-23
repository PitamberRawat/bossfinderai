const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const admin = require("firebase-admin"); // Import Firebase Admin SDK
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this environment variable is set

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Ensure you have set your Firebase credentials
  databaseURL: "https://bossfinderai.firebaseio.com",
});

app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // Skip body-parser for this route
  } else {
    bodyParser.json()(req, res, next); // Use body-parser for other routes
  }
});

// Endpoint to fetch checkout session details
app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query; // Get session ID from query parameters
  if (!sessionId) {
    return res.status(400).send({ error: "Session ID is required" });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session); // Send session details as JSON
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to create a checkout session
app.post("/create-checkout-session", async (req, res) => {
  const { priceId, billingType, userId } = req.body; // Get userId from the request body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Use the price ID from the request
          quantity: 1, // Set quantity
        },
      ],
      mode: billingType === "subscription" ? "subscription" : "payment",
      success_url:
        "https://bossfinderai.netlify.app/success?session_id={CHECKOUT_SESSION_ID}", // Redirect URL on success
      cancel_url: "https://bossfinderai.netlify.app/cancel", // Redirect URL on cancel
      metadata: { userId }, // Add userId to metadata for later use in webhook
    });

    res.json({ id: session.id }); // Send back the session ID
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Webhook endpoint to handle Stripe events
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    // Verify the webhook signature
    const sig = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object; // Contains the session details
        const userId = session.metadata.userId; // Retrieve userId from metadata
        const amountReceived = session.amount_total; // Total amount in cents

        // Update Firestore based on the amount
        await updateCredits(userId, amountReceived);
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send("Webhook received");
  }
);

// Function to update credits in Firestore
async function updateCredits(userId, amount) {
  let creditsToAdd = 0;

  // Determine credits based on the amount received
  if (amount === 300) {
    // Example price ID for $3
    creditsToAdd = 5;
  } else if (amount === 1900) {
    // Example price ID for $19
    creditsToAdd = 50;
  } else if (amount === 4900) {
    // Example price ID for $49
    creditsToAdd = 50;
  }

  // Update the Firestore user's credits
  const userRef = admin.firestore().collection("users").doc(userId);
  await userRef.update({
    credits: admin.firestore.FieldValue.increment(creditsToAdd),
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//bossfinderai.netlify.app
