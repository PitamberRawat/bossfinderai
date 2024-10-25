// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import basic from "../assets/basic.png";
// import standard from "../assets/standard.png";
// import premium from "../assets/premium.png";
// import "./checkoutpage.css";
// import { auth } from "./config/firebase";
// import { useLocation } from "react-router-dom";

// const stripePromise = loadStripe(
//   "pk_test_51Q1A3MRw8r3Vx2XaZ5foTvPbqzA9mHzHXhpuCHUglltHjhIYMb5FxY0q1gJLwsJOV9PzBypVzw2MARd7UBl5Euih00TQGsoMiD"
// );

// const products = [
//   {
//     id: 1,
//     image: basic,
//     name: "Basic Plan",
//     billingType: "payment",
//     priceId: "price_1QAl44Rw8r3Vx2XaUjBTrb2A",
//   },
//   {
//     id: 2,
//     image: standard,
//     name: "Standard Plan",
//     billingType: "subscription",
//     priceId: "price_1QAl5VRw8r3Vx2XaDWCOvwqo",
//   },
//   {
//     image: premium,
//     id: 3,
//     name: "Premium Plan",
//     billingType: "payment",
//     priceId: "price_1QAl60Rw8r3Vx2XasJswcHT0",
//   },
// ];

// const CheckoutPage = () => {
//   // Get the Firebase auth instance
//   const location = useLocation();
//   const user = auth.currentUser;
//   const [idx, setIdx] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState(products[0]);

//   useEffect(() => {
//     // Get the value passed through navigate and set it as state
//     if (location.state !== undefined) {
//       setIdx(location.state);
//     }
//   }, [location.state]);
//   useEffect(() => {
//     // Update selectedProduct whenever idx changes
//     setSelectedProduct(products[idx]);
//   }, [idx, products]);
//   if (!user) {
//     console.error("No user is logged in");
//     return;
//   }

//   const userId = user.uid;
//   const handleCheckout = async () => {
//     const stripe = await stripePromise;

//     const response = await fetch(
//       "https://bossfinderai.onrender.com/create-checkout-session",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           priceId: selectedProduct.priceId,
//           billingType: selectedProduct.billingType,
//           userId: userId,
//         }), // Send the selected product's price ID
//       }
//     );

//     const session = await response.json();

//     if (response.ok) {
//       // Redirect to the Stripe Checkout page
//       const result = await stripe.redirectToCheckout({ sessionId: session.id });
//       if (result.error) {
//         console.error(result.error.message);
//       }
//     } else {
//       console.error("Error:", session.error);
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <h1 className="heading">Select a Plan</h1>
//         <div className="product-wrapper">
//           <img
//             src={selectedProduct.image}
//             alt={selectedProduct.name}
//             className="product-image"
//           />
//           <div className="product-details">
//             <ul className="product-list">
//               {products.map((product) => (
//                 <li key={product.id} className="product-item">
//                   <button
//                     className={`product-button ${
//                       selectedProduct.id === product.id ? "active" : ""
//                     }`}
//                     onClick={() => setSelectedProduct(product)}
//                   >
//                     {product.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <div className="selected-details">
//               <h2 className="selected-product">
//                 Selected Plan: {selectedProduct.name}
//               </h2>
//               <button className="checkout-button" onClick={handleCheckout}>
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%",
//     backgroundColor: "#f8f9fa",
//     fontFamily: "Arial, sans-serif",
//   },
//   productImage: {
//     // width: "300px",
//     height: "auto",
//     borderRadius: "8px",
//     marginBottom: "1.5rem",
//   },
//   heading: {
//     fontSize: "2rem",
//     color: "#333",
//     marginBottom: "1rem",
//   },
//   productList: {
//     listStyle: "none",
//     padding: 0,
//     display: "flex",
//     gap: "1rem",
//     marginBottom: "1.5rem",
//   },
//   productItem: {
//     margin: "0",
//   },
//   productButton: {
//     padding: "0.5rem 1rem",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s, color 0.3s",
//   },
//   selectedProduct: {
//     fontSize: "1.2rem",
//     color: "#555",
//     marginBottom: "1rem",
//   },
//   checkoutButton: {
//     padding: "0.75rem 1.5rem",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
// };

// export default CheckoutPage;

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import basic from "../assets/basic.png";
import standard from "../assets/standard.png";
import premium from "../assets/premium.png";
import "./checkoutpage.css";
import { auth } from "./config/firebase";
import { useLocation } from "react-router-dom";

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

const CheckoutPage = () => {
  const location = useLocation();
  const user = auth.currentUser;
  const [idx, setIdx] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  useEffect(() => {
    if (location.state !== undefined) {
      setIdx(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    setSelectedProduct(products[idx]);
  }, [idx, products]);

  if (!user) {
    console.error("No user is logged in");
    return;
  }

  const userId = user.uid;
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
          userId: userId,
        }),
      }
    );

    const session = await response.json();

    if (response.ok) {
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
      <header className="header">
        <img
          src="https://framerusercontent.com/images/gAKACEGDrWnhhE9OEb1ppLbSqc.png"
          alt="Company bfaLogo"
          className="logo"
        />
      </header>
      <div className="container">
        <h1 className="heading">Select Your Plan</h1>
        <div className="product-wrapper">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="product-image"
          />
          <div className="product-details">
            <ul className="product-list">
              {products.map((product) => (
                <li key={product.id} className="product-item">
                  <button
                    className={`product-button ${
                      selectedProduct.id === product.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="selected-details">
              <h2 className="selected-product">
                You selected: {selectedProduct.name}
              </h2>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
