import React, { useState } from "react";

const Promotion = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const doSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center p-5 text-center"
      style={{
        // backgroundColor: "#FFF8E7",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        marginTop: "50px",
      }}
      id="subscribe"
    >
      <h2 style={{ fontWeight: "700", color: "#5D3FD3" }}>🌟 Stay Updated!</h2>
      <p className="text-muted">
        Subscribe to never miss our latest blog posts.
      </p>

      <div className="input-group mb-3 d-flex w-50">
        <input
          type="email"
          style={{ width: "80%" }}
          className="form-control "
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="btn text-white"
          style={{ backgroundColor: "#5D3FD3", width: "20%" }}
          onClick={doSubscribe}
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {message && <p className="text-success">{message}</p>}
      <small className="text-muted">We respect your privacy. No spam!</small>
    </div>
  );
};

export default Promotion;
