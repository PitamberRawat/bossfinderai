import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./cancel.css";

const Cancel = () => {
  return (
    <div className="cancel-container" style={styles.container}>
      <div style={styles.card}>
        <FaTimesCircle style={styles.icon} />
        <h1 style={styles.title}>Payment Canceled</h1>
        <p style={styles.paragraph}>
          We're sorry to see you go! Your payment has not been processed.
        </p>
        <h2 style={styles.subtitle}>Why was the payment canceled?</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            The payment was not completed in time.
          </li>
          <li style={styles.listItem}>
            You may have changed your mind about the purchase.
          </li>
          <li style={styles.listItem}>
            There may have been an issue with your payment method.
          </li>
          <li style={styles.listItem}>
            Other reasons, such as needing more information or time to decide.
          </li>
        </ul>
        <p style={styles.paragraph}>
          If you need any assistance, feel free to{" "}
          <a href="/contact" style={styles.link}>
            contact us
          </a>
          .
        </p>
        <p style={styles.paragraph}>
          You can return to our{" "}
          <a href="/" style={styles.link}>
            homepage
          </a>{" "}
          to continue browsing.
        </p>
      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  container: {
    backgroundColor: "#ff4d4d", // Red background
    // height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  icon: {
    color: "#ff4d4d",
    fontSize: "60px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff", // White card background
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
    maxWidth: "500px", // Max width for the card
    width: "100%", // Full width for smaller screens
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    color: "#ff4d4d", // Red color for the title
    marginBottom: "10px",
  },
  paragraph: {
    textAlign: "center",
    fontSize: "18px",
    margin: "10px 0",
  },
  subtitle: {
    fontSize: "20px",
    margin: "20px 0",
  },
  list: {
    textAlign: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    listStyleType: "none", // Remove bullet points
    padding: 0,
  },
  listItem: {
    margin: "5px 0",
  },
  link: {
    color: "#007bff", // Bootstrap primary color
    textDecoration: "none",
  },
};

// Export the component
export default Cancel;
