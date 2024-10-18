const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this environment variable is set

app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch checkout session details
app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query; // Get session ID from query parameters

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session); // Send session details as JSON
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to create a checkout session
app.post("/create-checkout-session", async (req, res) => {
  const { priceId, billingType } = req.body; // Get the price ID from the request body

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
    });

    res.json({ id: session.id }); // Send back the session ID
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//bossfinderai.netlify.app
