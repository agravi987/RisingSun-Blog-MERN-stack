import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const BlogModal = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem("token")) || {};
  const userName = token?.user?.name || "";

  // ✅ Fix: Include `userName` in useCallback dependency array
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      const userBlogs = data.filter((blog) => blog.author === userName);
      setBlogs(userBlogs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [userName]); // ✅ Now userName is included as a dependency

  useEffect(() => {
    if (userName) {
      fetchBlogs();
    } else {
      setLoading(false);
    }
  }, [fetchBlogs]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <center>
          <h2 className="mb-4" style={{ fontWeight: "600", color: "#5D3FD3" }}>
            MY BLOGS
          </h2>
        </center>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : blogs.length > 0 ? (
          <div className="row">
            {blogs.map((blog) => (
              <div key={blog._id} className="col-md-4 mb-4">
                <Link
                  to={`/blogs/${blog._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card shadow-sm h-100 border-0 p-3"
                    style={{
                      backgroundColor: "#FFF8E7",
                      transition: "transform 0.2s ease-in-out",
                      cursor: "pointer",
                      borderRadius: "10px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <div className="card-body">
                      <h5
                        className="card-title text-center"
                        style={{ fontWeight: "bold", color: "#5D3FD3" }}
                      >
                        {blog.title.toUpperCase()}
                      </h5>
                      <p
                        className="card-text text-muted"
                        style={{ height: "80px", overflow: "hidden" }}
                      >
                        {blog.content.substring(0, 100)}...
                      </p>
                      <small className="text-dark">
                        <strong>Author:</strong> {blog.author}
                        <br />
                        <strong>Published on:</strong>{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </small>
                      <button
                        className="btn btn-sm text-white"
                        style={{
                          backgroundColor: "#5D3FD3",
                          fontSize: "1.1rem",
                        }}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {/* Add more blog card */}
            <div className="col-md-4 mb-4">
              <Link to="/blogs/create" style={{ textDecoration: "none" }}>
                <div
                  className="card shadow-sm h-100 border-0 p-3"
                  style={{
                    backgroundColor: "#FFF8E7",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{
                        fontWeight: "bold",
                        color: "#5D3FD3",
                        fontSize: "6rem",
                      }}
                    >
                      +
                    </h5>
                    <p className="card-text text-muted">Add more blog</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <center>
            <p>You have not created any blogs yet.</p>
          </center>
        )}
      </div>
    </div>
  );
};

export default BlogModal;
