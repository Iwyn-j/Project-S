import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Corrected import

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Access user and loading state

  if (loading) {
    return <div>Loading...</div>; // Optional loading spinner
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
