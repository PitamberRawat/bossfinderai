import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./config/firebase"; // Import your Firebase auth

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; // Get the current user

  return user ? children : <Navigate to="/auth" />; // Replace '/login' with your actual login route
};

export default ProtectedRoute;
