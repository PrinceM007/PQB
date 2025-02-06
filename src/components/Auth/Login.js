import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useUser } from "../../contexts/UserContext"; // Import UserContext

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
  const { login } = useUser(); // Use the login function from UserContext
  const navigate = useNavigate(); // React Router for navigation

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    const url = isSignUp
      ? "http://localhost:5000/api/auth/signup" // Adjust URL for your signup route
      : "http://localhost:5000/api/auth/login";

    try {
      const payload = isSignUp
        ? {
            fullName: formData.fullName,
            email: formData.email,
            username: formData.username,
            password: formData.password,
          }
        : {
            username: formData.username,
            password: formData.password,
          };

      const response = await axios.post(
        url,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Enable credentials (cookies)
        }
      );

      if (isSignUp) {
        alert("Sign Up successful! Please log in.");
        setIsSignUp(false); // Switch to login mode after signup
      } else {
        const { user } = response.data;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          login(user);
          alert("Login successful!");
          navigate("/home");
        } else {
          setErrorMessage("Invalid response from server.");
        }
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "An error occurred. Please try again.";
      setErrorMessage(errMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

        <form onSubmit={handleFormSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <p className="toggle-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
