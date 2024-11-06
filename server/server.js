const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const Stripe = require("stripe");
const TelegramBot = require("node-telegram-bot-api");

const admin = require("firebase-admin"); // Import Firebase Admin SDK
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// Ensure this environment variable is set
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// Replace with your Telegram chat ID
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Ensure you have set your Firebase credentials
  databaseURL: "https://bossfinderai.firebaseio.com",
});

const db = admin.firestore();
app.use(
  cors({
    origin: [
      "https://bossfinderai.com",
      "https://bossfinderai.netlify.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  if (req.originalUrl === "/stripe-webhook") {
    // For the webhook route, use a custom middleware to capture the raw body
    const buffer = [];
    req.on("data", (chunk) => buffer.push(chunk));
    req.on("end", () => {
      req.rawBody = Buffer.concat(buffer).toString(); // Set rawBody
      next();
    });
  } else {
    bodyParser.json()(req, res, next); // Use body-parser for other routes
  }
});
const replyQueue = [];

// Handle incoming website messages
app.post("/messages", async (req, res) => {
  const { userId, text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userMessagesRef = db
      .collection("users")
      .doc(userId)
      .collection("messages");

    const messageData = {
      text: text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      fromAdmin: false,
      status: "unread", // Add status to track message state
    };

    await userMessagesRef.add(messageData);

    // Forward message to Telegram
    await bot.sendMessage(
      ADMIN_CHAT_ID,
      `New message from user ${userId}:\n${text}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Reply",
                callback_data: `reply_${userId}`,
              },
            ],
          ],
        },
      }
    );

    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Failed to process message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handle reply button clicks
bot.on("callback_query", async (callbackQuery) => {
  try {
    const userId = callbackQuery.data.split("_")[1];

    if (!userId) {
      throw new Error("Invalid callback data");
    }

    if (!replyQueue.includes(userId)) {
      replyQueue.push(userId);
      await bot.answerCallbackQuery(callbackQuery.id);
      await bot.sendMessage(
        ADMIN_CHAT_ID,
        `Please type your reply for user: ${userId}. There are ${replyQueue.length} pending replies.`
      );
    } else {
      await bot.answerCallbackQuery(callbackQuery.id, {
        text: "Already queued for a reply to this user.",
      });
    }
  } catch (error) {
    console.error("Error handling callback query:", error);
    await bot.answerCallbackQuery(callbackQuery.id, {
      text: "Failed to process request.",
    });
  }
});

// Handle admin replies
bot.on("message", async (msg) => {
  if (msg.chat.id.toString() !== ADMIN_CHAT_ID || replyQueue.length === 0) {
    return;
  }

  const currentUserId = replyQueue[0];

  try {
    const adminReplyData = {
      text: msg.text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      fromAdmin: true,
      status: "sent",
    };

    const userMessagesRef = db
      .collection("users")
      .doc(currentUserId)
      .collection("messages");

    await userMessagesRef.add(adminReplyData);

    // Remove the user from the queue after successful reply
    replyQueue.shift();

    await bot.sendMessage(
      ADMIN_CHAT_ID,
      `Reply sent to user: ${currentUserId}${
        replyQueue.length > 0
          ? `\nNext user in queue: ${replyQueue[0]}`
          : "\nNo more pending replies."
      }`
    );
  } catch (error) {
    console.error("Error saving admin reply:", error);
    await bot.sendMessage(
      ADMIN_CHAT_ID,
      `Failed to send reply to user: ${currentUserId}. Please try again.`
    );
  }
});
// Get all messages for a user
app.get("/messages/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Reference to the user's messages subcollection
    const userMessagesRef = db
      .collection("users")
      .doc(userId)
      .collection("messages");

    // Fetch all documents in the messages subcollection
    const snapshot = await userMessagesRef.orderBy("timestamp", "asc").get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "No messages found for this user" });
    }

    // Map the documents into an array of messages
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id, // Document ID for each message
      ...doc.data(), // Spread the document data (e.g., sender, message, timestamp)
    }));

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
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
        "https://bossfinderai.com/success?session_id={CHECKOUT_SESSION_ID}", // Redirect URL on success
      cancel_url: "https://bossfinderai.com/cancel", // Redirect URL on cancel
      metadata: { userId }, // Add userId to metadata for later use in webhook
    });

    res.json({ id: session.id }); // Send back the session ID
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Function to send a Telegram message
async function sendTelegramNotification(flag, email, message) {
  const formattedMsg = flag
    ? `${email} asked for a new boss for ${message}`
    : `${email}" "${message}`;
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: formattedMsg,
    }),
  });
}
async function handlePurchaseEvent(customerEmail, userId, amountReceived) {
  const message = `🎉 New Plan Purchase!\n\nUser ID: ${userId}\nAmount Received: $${(
    amountReceived / 100
  ).toFixed(2)}`;
  await sendTelegramNotification(false, customerEmail, message);
}

app.post("/msgtelegram", async (req, res) => {
  const { email, message } = req.body;

  if (!message) {
    return res.status(400).send("Message content is required");
  }

  try {
    await sendTelegramNotification(true, email, message);
    res.status(200).send("Message sent to Telegram");
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    res.status(500).send("Failed to send message to Telegram");
  }
});
// Webhook endpoint to handle Stripe events
app.post("/stripe-webhook", async (req, res) => {
  let event;

  // Verify the webhook signature
  const sig = req.headers["stripe-signature"];
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Webhook received: ", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object; // Contains the session details
      const userId = session.metadata.userId; // Retrieve userId from metadata
      const amountReceived = session.amount_total; // Total amount in cents
      const customerEmail = session.customer_email; // Email of customer

      // Update Firestore based on the amount
      await updateFields(userId, amountReceived);
      // Send notification to Telegram
      await handlePurchaseEvent(customerEmail, userId, amountReceived);
    }
    res.status(200).send("Webhook received");
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// Function to update credits in Firestore
async function updateFields(userId, amount) {
  let creditsToAdd = 0;
  let plan = "";

  // Determine credits based on the amount received
  if (amount === 300) {
    // Example price ID for $3
    creditsToAdd = 5;
    plan = "Basic";
  } else if (amount === 1900) {
    // Example price ID for $19
    creditsToAdd = 50;
    plan = "Standard";
  } else if (amount === 4900) {
    // Example price ID for $49
    creditsToAdd = 50;
    plan = "Premium";
  }

  // Update the Firestore user's credits
  const userRef = admin.firestore().collection("users").doc(userId);
  try {
    await userRef.update({
      credits: admin.firestore.FieldValue.increment(creditsToAdd),
      plan: plan,
    });
    console.log("Firestore updated successfully");
  } catch (error) {
    console.error("Firestore update failed:", error);
  }
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
