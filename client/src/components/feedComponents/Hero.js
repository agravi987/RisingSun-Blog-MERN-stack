import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import boyImage from "../assets/boyImage.webp";

import "./HeroAnimations.css";
import "../styles/Hero.css";

const Hero = () => {
  const texts = [
    "Rise with Your Words",
    "Illuminate the World with Stories",
    "A New Dawn for Blogging",
  ];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero d-flex w-full justify-content-center align-items-center"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
          "linear-gradient(135deg, rgb(95, 86, 72), rgb(68, 44, 94))",
      }}
    >
      <div
        className="hero-container text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "80vh",
          width: "65%",
        }}
      >
        <h1 className={`hero-title ${fade ? "fade-in" : "fade-out"}`}>
          {texts[index]}
        </h1>
        <p className="hero-subtitle">
          Welcome to <strong>Rising Sun Blog</strong> – where thoughts turn into
          powerful words.
        </p>

        <div className="hero-actions">
          <Link
            to="/blogs/create"
            className="btn btn-primary hero-btn"
            style={{
              backgroundColor: "#ff9800",
              borderColor: "#ff9800",
            }}
          >
            Start Your Blog
          </Link>
          <a
            href="#blogs"
            className="btn btn-secondary hero-btn"
            style={{
              backgroundColor: "#9c27b0",
              borderColor: "#9c27b0",
            }}
          >
            Explore Inspiring Stories
          </a>
        </div>

        <div className="hero-footer">
          <p className="animated-text">
            🌅 "Every sunrise brings a new story. Share yours today."
          </p>
        </div>
      </div>
      <div className="image-section d-flex" style={{ width: "35%" }}>
        <img src={boyImage} alt="hero-img" height={400} />
      </div>
    </div>
  );
};

export default Hero;
