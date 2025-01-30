import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/blogs/recent");
        const data = await response.json();
        setBlogs(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mt-5">
      <center>
        <h2 className="mb-4" style={{ fontWeight: "600", color: "#5D3FD3" }}>
          🌅 LATEST BLOGS
        </h2>
      </center>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog._id} className="col-md-4">
              <div
                className="card shadow-sm h-100 border-0 p-3 m-3"
                style={{
                  backgroundColor: "#FFF8E7",
                  transition: "transform 0.2s ease-in-out",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
                onClick={() => navigate(`/blogs/${blog._id}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body">
                  <h5
                    className="card-title  text-center"
                    style={{ fontWeight: "bold", color: "#5D3FD3" }}
                  >
                    {blog.title}
                  </h5>
                  <p
                    className="card-text text-muted"
                    style={{ height: "80px", overflow: "hidden" }}
                  >
                    {blog.content.substring(0, 100)}...
                  </p>
                  <p className="text-dark">
                    <strong>Author:</strong> {blog.author}
                    <br />
                    <strong>Published Date:</strong> {"  "}
                    {blog.createdAt.substring(0, 10)}
                  </p>
                  <button
                    className="btn btn-sm text-white "
                    style={{ backgroundColor: "#5D3FD3", fontSize: "1.1rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blogs/${blog._id}`);
                    }}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentBlogs;
