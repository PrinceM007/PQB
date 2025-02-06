    import React, { useState } from 'react';
    import axios from 'axios';
    import './LoginSignup.css';

    const LoginSignup = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    });

    const toggleForm = () => {
    setIsSignup(!isSignup);
    };

    const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup
    ? `${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`
    : `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`;

    if (isSignup && formData.password !== formData.confirmPassword) {
    return alert('Passwords do not match.');
    }

    try {
    const response = await axios.post(endpoint, formData);
    alert(response.data.message);
    } catch (error) {
    console.error('Error:', error.response?.data?.message || error.message);
    alert(error.response?.data?.message || 'Something went wrong.');
    }
    };

    return (
    <div className="auth-container">
    <div className="auth-form">
      <h2>{isSignup ? "Create an Account" : "Login"}</h2>
      <form onSubmit={handleFormSubmit}>
        {isSignup && (
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {isSignup && (
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button type="submit" className="auth-button">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <p onClick={toggleForm} className="toggle-link">
        {isSignup
          ? "Already have an account? Login here."
          : "Don’t have an account? Sign up here."}
      </p>
    </div>
    </div>
    );
    };

    export default LoginSignup;               
