import React, { useEffect } from "react";
import Promotion from "../feedComponents/Promotion";
import BlogList from "../feedComponents/BlogList";
import Header from "../feedComponents/Header";
import Footer from "../feedComponents/Footer";
import Hero from "../feedComponents/Hero";
import RecentBlogs from "../feedComponents/RecentBlogs";
import { useNavigate } from "react-router-dom";

const Feeds = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    };
    validateToken();
  }, [navigate]);

  return (
    <div>
      <Header />
      <Hero />
      <RecentBlogs />
      <BlogList />
      <Promotion />
      <Footer />
    </div>
  );
};

export default Feeds;
