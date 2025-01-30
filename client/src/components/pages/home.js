import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const phrases = useMemo(
    () => [
      "A space where your ideas shine bright",
      "Connect with passionate minds",
      "Turn thoughts into engaging stories",
      "Dive into diverse discussions",
      "Be part of an inspiring community",
      "Share, explore, and evolve",
      "Your words can make a difference",
      "Start your journey with RisingSun!",
    ],
    []
  ); // Added useMemo hook to memoize the phrases array

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFadeOut(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases]);

  const gotoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h2 className="RisingSun-logo">RisingSun Blog</h2>
        <h1 className="title">Rise with Your Words, inspire the world!</h1>
        <p className={`dynamic-subtitle ${fadeOut ? "fade-out" : "fade-in"}`}>
          {phrases[currentPhraseIndex]}
        </p>
        <button className="login-button" onClick={gotoLogin}>
          Start Writing!
        </button>
      </div>
    </div>
  );
};

export default Home;
