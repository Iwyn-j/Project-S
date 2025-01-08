import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Import useAuth from AuthProvider

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Access user from AuthContext

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
