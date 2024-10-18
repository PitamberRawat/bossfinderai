import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import basic from "../assets/basic.png";
import standard from "../assets/standard.png";
import premium from "../assets/premium.png";

const stripePromise = loadStripe(
  "pk_test_51Q1A3MRw8r3Vx2XaZ5foTvPbqzA9mHzHXhpuCHUglltHjhIYMb5FxY0q1gJLwsJOV9PzBypVzw2MARd7UBl5Euih00TQGsoMiD"
);

const products = [
  {
    id: 1,
    image: basic,
    name: "Basic Plan",
    billingType: "payment",
    priceId: "price_1QAl44Rw8r3Vx2XaUjBTrb2A",
  },
  {
    id: 2,
    image: standard,
    name: "Standard Plan",
    billingType: "subscription",
    priceId: "price_1QAl5VRw8r3Vx2XaDWCOvwqo",
  },
  {
    image: premium,
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
      "https://bossfinderai.onrender.com/create-checkout-session",
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
    <div style={styles.container}>
      <h1 style={styles.heading}>Select a Product</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          style={styles.productImage}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ul style={styles.productList}>
            {products.map((product) => (
              <li key={product.id} style={styles.productItem}>
                <button
                  style={{
                    ...styles.productButton,
                    backgroundColor:
                      selectedProduct.id === product.id ? "#4CAF50" : "#f0f0f0",
                    color: selectedProduct.id === product.id ? "#fff" : "#333",
                  }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </button>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={styles.selectedProduct}>
              Selected Product: {selectedProduct.name}
            </h2>

            <button style={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
  },
  productImage: {
    // width: "300px",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "1.5rem",
  },
  heading: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1rem",
  },
  productList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  productItem: {
    margin: "0",
  },
  productButton: {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  selectedProduct: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "1rem",
  },
  checkoutButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default App;
