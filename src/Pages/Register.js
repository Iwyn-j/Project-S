import React from 'react';
import './Register.css'; // Import the Register styles

const Register = () => {
  return (
    <div className="register-container">
      {/* Floating Background Shapes */}
      <div className="floating-shape shape-blue"></div>
      <div className="floating-shape shape-orange"></div>

      {/* Registration Form */}
      <form className="register-form">
        <h3>Registration Form</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" placeholder="First Name" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" placeholder="Last Name" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Email Address" />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" placeholder="Confirm Password" />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
