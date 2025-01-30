import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { id: blogId } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    externalLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/blogs/${blogId}`);
        const data = await response.json();
        if (response.ok) {
          setBlog(data);
        } else {
          setError(data.message || "Error fetching blog details");
        }
      } catch (error) {
        setError("An error occurred while fetching the blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!token) {
      return alert("You need to be logged in to update a blog.");
    }

    try {
      const res = await fetch(`http://localhost:8000/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
      });

      const data = await res.json();
      if (res.ok) {
        navigate(`/blogs/${blogId}`);
      } else {
        alert(data.message || "Error updating blog");
      }
    } catch (err) {
      alert("An error occurred while updating the blog.");
    }
  };

  if (loading) return <div>Loading blog details...</div>;

  return (
    <div className="container mt-4 w-50">
      <h2
        className="text-center"
        style={{ color: "#5D3FD3", fontSize: "2rem", fontWeight: "bold" }}
      >
        Update Blog
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdate} className="mt-4">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows="5"
            value={blog.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={blog.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="externalLink">External Link (optional)</label>
          <input
            type="url"
            id="externalLink"
            name="externalLink"
            className="form-control"
            value={blog.externalLink}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn  mt-4"
          style={{
            backgroundColor: "#5D3FD3",
            color: "white",
          }}
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
