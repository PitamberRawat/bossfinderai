import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase"; // Import your Firebase auth

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true); // State to track loading status
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
      setLoading(false); // Set loading to false after checking
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // If loading, you can return a loader or null
  if (loading) {
    return <div>Loading...</div>; // You can customize this
  }

  return user ? children : <Navigate to="/auth" />; // Replace '/auth' with your actual login route
};

export default ProtectedRoute;
