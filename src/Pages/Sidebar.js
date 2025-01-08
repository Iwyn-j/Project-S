// src/components/Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css"; // CSS file for styling
import logo from "./logo.png"; // Path to your logo

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Perform signout logic
    localStorage.removeItem("authToken"); // Optional: Clear token
    navigate("/login"); // Redirect to login after signout
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">🏠 Home</Link>
          </li>
          <li>
            <Link to="/skills">📚 Skills</Link>
          </li>
          <li>
            <Link to="/topics">🗂️ Topics</Link>
          </li>
          <li>
            <Link to="/certifications">🎓 Certifications</Link>
          </li>
          <li>
            <Link to="/settings">⚙️ Settings</Link>
          </li>
          <li onClick={handleSignOut} className="signout-btn">
            🚪 Sign Out
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
