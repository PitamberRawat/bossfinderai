import express from "express";
import cors from "cors";
import stripe from "stripe";

const Stripe = stripe(
  "sk_test_51Q1A3MRw8r3Vx2XaqsfEnX5FY4KcEwjXKLp5WacBKN5UwIr2Q8HgpQmsaw17peAiY4C6Uj1H6zr10eDDdWHw7L3E005KasTgMm"
);

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  console.log("helo");
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: 1,
    });
  });

  const session = await Stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:4000/success",
    cancel_url: "http://localhost:4000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("listening on port 4000!"));
