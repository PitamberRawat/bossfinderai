//                WITH PRICE_IDDDDDDDDDD
// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51Q1A3MRw8r3Vx2XaZ5foTvPbqzA9mHzHXhpuCHUglltHjhIYMb5FxY0q1gJLwsJOV9PzBypVzw2MARd7UBl5Euih00TQGsoMiD"
// );

// const products = [
//   { id: 1, name: "Normal Plan", priceId: "price_1XXXXXXXXXXXXXX" }, // Replace with your actual price IDs
//   { id: 2, name: "Standard Plan", priceId: "price_1XXXXXXXXXXXXXX" },
//   { id: 3, name: "Premium Plan", priceId: "price_1XXXXXXXXXXXXXX" },
// ];

// const cardElementOptions = {
//   style: {
//     base: {
//       color: "#f71313f9",
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       lineHeight: "24px",
//       padding: "10px",
//       // You can add other CSS properties here
//     },
//     invalid: {
//       color: "#fa755a",
//       iconColor: "#fa755a",
//     },
//     complete: {
//       color: "#28a745",
//       iconColor: "#28a745",
//     },
//   },
// };

// const CheckoutForm = ({ priceId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [amount, setAmount] = useState(0); // State to hold the amount

//   // Fetch the price amount based on priceId
//   useEffect(() => {
//     const fetchPrice = async () => {
//       const response = await fetch(
//         `http://localhost:5000/get-price/${priceId}`
//       );
//       const priceData = await response.json();
//       setAmount(priceData.unit_amount); // Set the amount state
//     };

//     fetchPrice();
//   }, [priceId]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const response = await fetch(
//       "http://localhost:5000/create-payment-intent",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ priceId }), // Send priceId instead of amount
//       }
//     );

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       console.error("Error fetching client secret:", errorMessage);
//       return;
//     }

//     const { client_secret } = await response.json();

//     const cardElement = elements.getElement(CardElement);

//     const { error } = await stripe.confirmCardPayment(client_secret, {
//       payment_method: {
//         card: cardElement,
//       },
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       console.log("Payment successful");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement options={cardElementOptions} />
//       <button type="submit" disabled={!stripe}>
//         Pay ${amount / 100} {/* Display the amount next to the button */}
//       </button>
//     </form>
//   );
// };

// const App = () => {
//   const [selectedProduct, setSelectedProduct] = useState(products[0]); // Default to the first product

//   return (
//     <>
//       <h1>Select a Product</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             <button onClick={() => setSelectedProduct(product)}>
//               {product.name}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <h2>Selected Product: {selectedProduct.name}</h2>
//       <Elements stripe={stripePromise}>
//         <CheckoutForm priceId={selectedProduct.priceId} />
//       </Elements>
//     </>
//   );
// };

// export default App;

//        WITHOUT PIRCE__ID

// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
// const stripePromise = loadStripe(
//   "pk_test_51Q1A3MRw8r3Vx2XaZ5foTvPbqzA9mHzHXhpuCHUglltHjhIYMb5FxY0q1gJLwsJOV9PzBypVzw2MARd7UBl5Euih00TQGsoMiD"
// );
// const products = [
//   { id: 1, name: "Normal Plan", price: 1000 }, // Price in cents
//   { id: 2, name: "Standard Plan", price: 2000 },
//   { id: 3, name: "Premium Plan", price: 3000 },
// ];

// const CheckoutForm = ({ amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const response = await fetch(
//       "http://localhost:5000/create-payment-intent",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount }),
//       }
//     );

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       console.error("Error fetching client secret:", errorMessage);
//       return;
//     }

//     const { client_secret } = await response.json();

//     const cardElement = elements.getElement(CardElement);

//     const { error } = await stripe.confirmCardPayment(client_secret, {
//       payment_method: {
//         card: cardElement,
//       },
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       console.log("Payment successful");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay ${amount / 100}
//       </button>
//     </form>
//   );
// };

// const App = () => {
//   const [selectedProduct, setSelectedProduct] = useState(products[0]); // Default to the first product
//   return (
//     <>
//       <h1>Select a Product</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             <button onClick={() => setSelectedProduct(product)}>
//               {product.name} - ${product.price / 100}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <h2>Selected Product: {selectedProduct.name}</h2>
//       <Elements stripe={stripePromise}>
//         <CheckoutForm amount={selectedProduct.price} />
//       </Elements>
//     </>
//   );
// };

// export default App;

// ANOTHER WAYYY

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
