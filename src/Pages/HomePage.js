import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="floating-shape shape-blue"></div>
      <div className="floating-shape shape-orange"></div>
      <div className="home-content">
        <h1>Welcome to Project S</h1>
        <p>Your journey starts here. Ready to improve your skills?</p>
        <button className="start-button" onClick={() => navigate("/chatbot")}>
          Start Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
