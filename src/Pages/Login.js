import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Alert user of successful login
      alert("Login successful!");
      setError("");

      // Redirect to Chatbot page
      navigate("/chatbot");
    } catch (err) {
      // Set error message for invalid login
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="floating-shape shape-blue"></div>
      <div className="floating-shape shape-orange"></div>

      <form className="login-form" onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
