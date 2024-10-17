import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Q1A3MRw8r3Vx2XaZ5foTvPbqzA9mHzHXhpuCHUglltHjhIYMb5FxY0q1gJLwsJOV9PzBypVzw2MARd7UBl5Euih00TQGsoMiD"
);

const products = [
  {
    id: 1,
    name: "Basic Plan",
    billingType: "payment",
    priceId: "price_1QAl44Rw8r3Vx2XaUjBTrb2A",
  },
  {
    id: 2,
    name: "Standard Plan",
    billingType: "subscription",
    priceId: "price_1QAl5VRw8r3Vx2XaDWCOvwqo",
  },
  {
    id: 3,
    name: "Premium Plan",
    billingType: "payment",
    priceId: "price_1QAl60Rw8r3Vx2XasJswcHT0",
  },
];

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // Default to the first product

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: selectedProduct.priceId,
          billingType: selectedProduct.billingType,
        }), // Send the selected product's price ID
      }
    );

    const session = await response.json();

    if (response.ok) {
      // Redirect to the Stripe Checkout page
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error("Error:", session.error);
    }
  };

  return (
    <>
      <h1>Select a Product</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button onClick={() => setSelectedProduct(product)}>
              {product.name}
            </button>
          </li>
        ))}
      </ul>
      <h2>Selected Product: {selectedProduct.name}</h2>
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );
};

export default App;
