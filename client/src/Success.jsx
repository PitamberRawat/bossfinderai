import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const [sessionData, setSessionData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    // Fetch session details from the server
    if (sessionId) {
      fetch(`http://localhost:5000/checkout-session?sessionId=${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          setSessionData(data); // Store session data in state
        })
        .catch((error) => {
          console.error("Error fetching session details:", error);
        });
    }
  }, [location]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaCheckCircle style={styles.icon} />
        </div>
        <h1 style={styles.title}>Payment Successful!</h1>
        {sessionData ? (
          <>
            <p style={styles.text}>
              Thank you for your purchase, {sessionData.customer_details.email}.
            </p>
            <p style={styles.text}>
              You have been charged ${sessionData.amount_total / 100}.
            </p>
          </>
        ) : (
          <p style={styles.text}>Loading your payment details...</p>
        )}
        <a
          href="/"
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    background: "linear-gradient(135deg, #81c784, #4caf50)",
    fontFamily: "'Arial', sans-serif",
    margin: 0,
    padding: 0,
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  icon: {
    color: "#4caf50",
    fontSize: "60px",
    marginBottom: "20px",
  },
  title: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "10px",
  },
  text: {
    color: "#666",
    fontSize: "16px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#388e3c",
  },
};

export default Success;
