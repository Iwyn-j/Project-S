import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const navigate = useNavigate(); // For navigation

  const goToHomePage = () => {
    // Redirect to App.js (home page)
    navigate("/");
  };

  return (
    <div className="container">
      <h1>404</h1>
      <p>Oops... the page you're looking for doesn't exist!</p>
      <div className="character"></div>
      <button onClick={goToHomePage}>Go Back to Home Page</button>
    </div>
  );
};

export default Error;
