import React, { useState } from "react";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isValid = {
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    num: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    length: password.length >= 8,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");

    if (
      !isValid.upper ||
      !isValid.lower ||
      !isValid.num ||
      !isValid.special ||
      !isValid.length
    ) {
      setErrMsg("Password does not meet the requirements.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/account/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 800);
      } else {
        setErrMsg(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrMsg("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* <div className="RisingSun-logo">RisingSun</div> */}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Signup</legend>
            <p>Be a part of RisingSun Blogging</p>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="password-requirements">
                <p className={isValid.upper ? "valid" : ""}>Uppercase</p> |
                <p className={isValid.lower ? "valid" : ""}>Lowercase</p> |
                <p className={isValid.num ? "valid" : ""}>Number</p> |
                <p className={isValid.special ? "valid" : ""}>Special</p> |
                <p className={isValid.length ? "valid" : ""}>8+ Characters</p>
              </div>
            </div>
            <button type="submit">Create Account</button>
            {errMsg && <p className="error-message">{errMsg}</p>}
            {successMsg && <p className="success-message">{successMsg}</p>}
            <p className="login-link">
              Already have an account?
              <Link to="/login"> Try Login</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
