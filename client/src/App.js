import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";
import Home from "./components/pages/home";
import SignUp from "./components/pages/signup";
import Feeds from "./components/pages/feedpage";
import CreateBlog from "./components/pages/createblog";
import BlogDetails from "./components/pages/BlogDetails";
import UpdateBlog from "./components/pages/updateBlog";
import BlogModal from "./components/feedComponents/BlogModal";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/blogs/:id/update" element={<UpdateBlog />} />
        <Route path="/blogs" element={<BlogModal />} />

        <Route
          path="*"
          element={
            <div
              className="d-flex flex-column justify-content-center align-items-center vh-100"
              style={{
                backgroundColor: "#f8f9fa",
                textAlign: "center",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              <h1
                style={{
                  fontSize: "3rem",
                  color: "rgb(1, 183, 255)",
                  fontWeight: "bold",
                }}
              >
                404 | Not Found
              </h1>
              <p style={{ fontSize: "1.25rem", color: "#555" }}>
                The page you’re looking for doesn’t exist.
              </p>
              <a
                href="/"
                className="btn btn-primary"
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  backgroundColor: "rgb(1, 183, 255)",
                }}
              >
                Go Back to Home
              </a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
