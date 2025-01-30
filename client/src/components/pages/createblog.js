import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../feedComponents/Header";

import "../styles/CreateBlog.css"; // Import the custom CSS file

const CreateBlog = () => {
  const navigate = useNavigate();
  const tokenString = localStorage.getItem("token");
  let token = null;

  try {
    token = tokenString ? JSON.parse(tokenString).user : null;
  } catch (error) {
    console.error("Error parsing token:", error);
  }

  useEffect(() => {
    if (!token || !token.name) {
      navigate("/");
    }
  }, [navigate, token]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(token ? token.name : "");
  const [category, setCategory] = useState("");
  const [externalLink, setExternalLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
      author,
      category,
      externalLink,
    };

    try {
      const response = await fetch("http://localhost:8000/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      const data = await response.json();
      console.log("Blog created:", data);

      setTitle("");
      setContent("");
      setCategory("");
      setExternalLink("");
      navigate("/feeds");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="create-blog-container" style={{ paddingTop: "10vh" }}>
        <div className="create-blog-form-container">
          <h2 className="text-center"> CREATE YOUR INSPIRING BLOG</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-2">
              <label>
                <strong>Author Name</strong>
              </label>
              <span className="author-name">{author}</span>
            </div>

            <div className="form-group mt-2">
              <label>
                <strong>Blog Category</strong>
              </label>
              <select
                className="select-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Business">Business</option>
                <option value="Relationship">Relationship</option>
                <option value="Food">Food</option>
              </select>
            </div>

            <div className="form-group mt-2">
              <label>
                <strong>Blog Title</strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-2">
              <label>
                <strong>Content</strong>
              </label>
              <textarea
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-2">
              <label>
                <strong>External Link (optional)</strong>
              </label>
              <input
                type="url"
                className="external-link"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
              />
            </div>

            <button type="submit">Publish Your Blog</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
