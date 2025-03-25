import React, { useState } from "react";
import "./Login.css";
import { auth, db } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // NEW: Back button handler to navigate to main page ("/")
  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the last logged in time in the user's document
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        lastLoginAt: serverTimestamp(),
      });

      // Alert user of successful login
      alert("Login successful!");
      setError("");

      // Redirect to Dashboard page
      navigate("/dashboard");
    } catch (err) {
      // Set error message for invalid login
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      {/* Back Button on Top Left */}
      <button type="button" className="back-button-top" onClick={handleBack}>
        &larr; Back
      </button>
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
