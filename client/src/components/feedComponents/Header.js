import React from "react";
import ProfileModal from "./ProfileModal";
import { Link } from "react-router-dom";

import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <div className="container d-flex align-items-center justify-content-between">
        <div>
          <h2 className="RisingSun-logo">RisingSun Blog</h2>
        </div>
        <nav className="navbar navbar-expand-lg">
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/feeds" className="nav-link custom-nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs" className="nav-link custom-nav-link">
                  My Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs/create" className="nav-link custom-nav-link">
                  Create Blog
                </Link>
              </li>
              <li className="nav-item">
                <ProfileModal />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
