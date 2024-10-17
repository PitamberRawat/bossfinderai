// import express from "express";
// import cors from "cors";
// import stripe from "stripe";
// import dotenv from "dotenv";
// dotenv.config();

// const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.static("public"));
// app.use(express.json());

// app.post("/checkout", async (req, res) => {
//   console.log(req.body);
//   console.log("helo");
//   const items = req.body.items;
//   let lineItems = [];
//   items.forEach((item) => {
//     lineItems.push({
//       price: item.id,
//       quantity: 1,
//     });
//   });

//   const session = await Stripe.checkout.sessions.create({
//     line_items: lineItems,
//     mode: "payment",
//     success_url: `http://localhost:${PORT}/success`,
//     cancel_url: `http://localhost:${PORT}/cancel`,
//   });

//   res.send(
//     JSON.stringify({
//       url: session.url,
//     })
//   );
// });

// app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const Stripe = require("stripe");
// require("dotenv").config();

// const app = express();
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// app.use(cors());
// app.use(bodyParser.json());

// app.post("/create-payment-intent", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd", // Change this to your desired currency
//     });
//     res.status(200).send(paymentIntent);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

//              WTIHOUT PRICE ID

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const Stripe = require("stripe");
// require("dotenv").config();

// const app = express();
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this environment variable is set

// app.use(cors());
// app.use(bodyParser.json());

// app.post("/create-payment-intent", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd", // Change this to your desired currency
//     });
//     console.log(paymentIntent); // Log the entire payment intent object
//     res.status(200).send(paymentIntent); // This sends back the entire payment intent
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

//                  WITH PRICE_ID

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const Stripe = require("stripe");
// require("dotenv").config();

// const app = express();
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this environment variable is set

// app.use(cors());
// app.use(bodyParser.json());

// // Endpoint to fetch the price based on priceId
// app.get("/get-price/:priceId", async (req, res) => {
//   const { priceId } = req.params;

//   try {
//     const price = await stripe.prices.retrieve(priceId);
//     res.status(200).send(price); // Send back the price object
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// app.post("/create-payment-intent", async (req, res) => {
//   const { priceId } = req.body;

//   try {
//     const price = await stripe.prices.retrieve(priceId); // Get price details
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: price.unit_amount, // Use the amount from the price
//       currency: "usd", // Change this to your desired currency
//     });
//     console.log(paymentIntent); // Log the entire payment intent object
//     res.status(200).send(paymentIntent); // This sends back the entire payment intent
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ANOTHER WAYYYYYYY

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
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}", // Redirect URL on success
      cancel_url: "http://localhost:5173/cancel", // Redirect URL on cancel
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
