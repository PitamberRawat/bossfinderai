import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import basic from "../assets/basic.png";
import standard from "../assets/standard.png";
import premium from "../assets/premium.png";
import "./checkoutpage.css";
import { auth } from "./config/firebase";
import { useLocation } from "react-router-dom";
import Radio, { RadioGroup } from "./Radio";
import {
  ArrowRight,
  BadgePercent,
  Crown,
  Gem,
  Plane,
  Sparkle,
} from "lucide-react";
import bfalogo from "../assets/bfalogo.png";

const stripePromise = loadStripe(
  "pk_live_51Q1A3MRw8r3Vx2XawqJw5vLjGJjlqh81j4t8cKETx5eeFWbE4v3HFnOfVgtD7a2EsH2n988nwjCbUilrFsarMFWO00tgKJPnhR"
);

const products = [
  {
    id: 1,
    icon: "Sparkle",
    image: basic,
    name: "Basic",
    price: "3",
    features: [
      "• 5 Credits",

      "•  Get Top 2 Matches per search",

      "• Look For Upto 5 Jobs",
    ],
    billingType: "payment",
    priceId: process.env.PRICE_ID_BASIC,
  },
  {
    id: 2,
    icon: "Gem",
    features: [
      "•  50 Credits",
      "•  Get Top 5 Matches per search",
      "•  Look For Upto 50 Jobs",
      "•  Upto 10 AI Email Copy: Coming Soon",
    ],
    image: standard,
    price: "19",
    name: "Standard",
    billingType: "subscription",
    priceId: process.env.PRICE_ID_STANDARD,
  },
  {
    id: 3,
    icon: "Crown",
    price: "49",
    features: [
      "•  50 Credits",
      "•  Get Top 7 Matches",
      "•  Look For Unlimited Jobs",
      "•  LifeTime Support & Updates",
      "•  Unlimited AI Email Copy: Coming Soon",
    ],
    image: premium,
    name: "Premium",
    billingType: "payment",
    priceId: process.env.PRICE_ID_PREMIUM,
  },
];

const CheckoutPage = () => {
  const location = useLocation();
  const user = auth.currentUser;
  const [plan, setPlan] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  useEffect(() => {
    const idx = location.state || 0;
    setSelectedProduct(products[idx]);
    setPlan(products[idx].name);
  }, [location.state]);

  // useEffect(() => {
  //   setSelectedProduct(products[idx] || products[0]);
  // }, [idx, products]);

  if (!user) {
    console.error("No user is logged in");
    return;
  }

  const userId = user.uid;
  const handleCheckout = async () => {
    if (!plan) {
      console.error("No plan selected");
      return;
    }
    const stripe = await stripePromise;

    const response = await fetch(
      "https://bossfinderai1.onrender.com/create-checkout-session",
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
        <img src={bfalogo} alt="Company bfaLogo" className="logo" />
      </header>
      <div className="container">
        <h1 className="heading">Select Your Plan</h1>
        <div>
          {/* {selectedProduct && (
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="product-image"
            />
          )} */}

          <RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)}>
            <div className="flex gap-4 justify-center flex-col">
              {products.map((product) => (
                <Radio
                  value={product.name}
                  onClick={() => setSelectedProduct(product)}
                >
                  <Plan
                    icon={
                      product.icon === "Sparkle" ? (
                        <Sparkle />
                      ) : product.icon === "Gem" ? (
                        <Gem />
                      ) : (
                        <Crown />
                      )
                    }
                    title={product.name}
                    features={product.features}
                    price={product.price}
                    active={plan === product.name}
                  />
                </Radio>
              ))}
            </div>
          </RadioGroup>
          <hr className="my-3 w-100" />
          <button
            onClick={handleCheckout}
            className={`
    flex gap-4 items-center px-6 py-3 rounded-lg
    bg-violet-800 hover:bg-violet-700
    font-semibold text-lg text-white m-auto
`}
          >
            Proceed with {plan} plan
            <ArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};
function Plan({ icon, title, features, price, active }) {
  return (
    <div className={`flex gap-4 items-center ${active ? "active" : ""}`}>
      <div className="">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {features.map((item) => {
          return <p className="text-sm">{item}</p>;
        })}
      </div>
      <span className="ml-auto font-medium">${price}</span>
    </div>
  );
}

export default CheckoutPage;
