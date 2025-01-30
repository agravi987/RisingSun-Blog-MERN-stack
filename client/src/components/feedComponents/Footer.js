import React from "react";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        backgroundColor: "#212121", // Dark theme for footer
        color: "#ffffff", // White text for contrast
        textAlign: "center",
        padding: "30px 20px",
        fontSize: "14px", // Slightly bigger font for readability
      }}
    >
      <p style={{ marginBottom: "10px" }}>
        &copy; 2025 <span style={{ color: "#ff9800" }}>RisingSun</span>. All
        Rights Reserved.
      </p>
      <p style={{ marginBottom: "10px" }}>
        A project by <span style={{ color: "#ff9800" }}>Ravi Agrahari</span>
      </p>
      <p>
        Contact us:{" "}
        <a
          href="mailto:support@blogit.com"
          style={{
            color: "#ff9800", // Matching the theme color for the link
            textDecoration: "none",
          }}
        >
          support@risingsun.com
        </a>
      </p>
    </div>
  );
};

export default Footer;
