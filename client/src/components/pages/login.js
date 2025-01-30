import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8000/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Login successful!");
        localStorage.setItem("token", JSON.stringify(data));

        setTimeout(() => {
          navigate("/feeds");
        }, 1000);
      } else {
        setErrorMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* <h2 className="RisingSun-logo">RisingSun Blog</h2> */}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <span className="login-heading">Login</span>{" "}
              <p> To Explore Blogs </p>
            </legend>

            {/* Email Input */}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button type="submit">Login</button>

            {/* Error and Success Messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            {/* Signup Link */}
            <p className="signup-link">
              New to RisingSun? <Link to="/signup">Create a new account</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
