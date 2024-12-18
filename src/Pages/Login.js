import React, { useState } from 'react';
import './Login.css';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Firebase login with email and password
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      setError('');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      {/* Floating Background Shapes */}
      <div className="floating-shape shape-blue"></div>
      <div className="floating-shape shape-orange"></div>

      {/* Login Form */}
      <form className="login-form" onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email or Phone"
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

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="login-button">
          Log In
        </button>

        <div className="social-login">
          <button type="button" className="google-login">
            <i className="fab fa-google"></i> Google
          </button>
          <button type="button" className="facebook-login">
            <i className="fab fa-facebook"></i> Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
