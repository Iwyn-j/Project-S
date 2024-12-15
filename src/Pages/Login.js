import React from 'react';
import './Login.css';


const Login = () => {
  return (
    <div className="login-container">
      {/* Floating Background Shapes */}
      <div className="floating-shape shape-blue"></div>
      <div className="floating-shape shape-orange"></div>

      {/* Login Form */}
      <form className="login-form">
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button type="submit" className="login-button">Log In</button>

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
