import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../feedComponents/Header";

const BlogDetails = () => {
  const { id: blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const userName = token ? token.user.name : null;
  const Navigate = useNavigate();

  const postComment = async () => {
    if (!token) return alert("You need to be logged in to post a comment.");
    if (!userName) return alert("Invalid token: User name not found.");
    if (!comment.trim()) return alert("Comment cannot be empty!");

    try {
      const res = await fetch(
        `http://localhost:8000/blogs/${blogId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment, user: userName }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          comments: [
            ...prevBlog.comments,
            { user: userName, comment, createdAt: new Date() },
          ],
        }));
        setComment("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("An error occurred while posting the comment.");
    }
  };

  const deleteComment = async (comment) => {
    if (!token) return alert("You need to be logged in to delete a comment.");
    const commentId = `${comment.user}${comment.comment}`;

    try {
      const res = await fetch(
        `http://localhost:8000/blogs/${blogId}/comments/${encodeURIComponent(
          commentId
        )}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          comments: prevBlog.comments.filter(
            (c) => `${c.user}${c.comment}` !== commentId
          ),
        }));
      } else {
        alert("Error deleting comment");
      }
    } catch (err) {
      alert("An error occurred while deleting the comment.");
    }
  };

  const updateBlog = () => {
    Navigate(`/blogs/${blogId}/update`);
  };

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        Navigate("/feeds");
      }
    } catch (err) {
      console.error("Error deleting the blog:", err);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:8000/blogs/${blogId}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) return <div className="text-center mt-4">Loading ...</div>;

  const isAuthor = blog.author === userName;

  return (
    <div>
      <Header />
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          overflowY: "auto",
          marginTop: "5vh",
        }}
      >
        <div
          className="container mt-4 p-4 border rounded bg-light"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <h2
            className=" mb-1"
            style={{
              fontWeight: "bold",
              color: "#5D3FD3",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {blog.title.toUpperCase()}
          </h2>

          <hr />

          <div className="mt-2">
            <div className="d-flex justify-content-between">
              <p className="text-secondary mb-0">
                <strong>Author:</strong> {blog.author}
              </p>
              <p className="text-secondary mb-0">
                <strong>Published on:</strong>{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="text-secondary mb-3">
              <strong>Category:</strong> {blog.category}
            </p>
          </div>

          <div>
            <p
              className="lead"
              style={{ fontSize: "medium", fontWeight: "400" }}
            >
              {blog.content}
            </p>
          </div>

          {isAuthor && (
            <div className="mt-3 d-flex justify-content-end">
              <button className="btn btn-warning mr-2" onClick={updateBlog}>
                Update Blog
              </button>
              <button className="btn btn-danger" onClick={deleteBlog}>
                Delete Blog
              </button>
            </div>
          )}

          {blog.externalLink && (
            <div className="mt-4">
              <a
                href={blog.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-info"
                style={{ color: "white" }}
              >
                Know More
              </a>
            </div>
          )}

          <div className="mt-4">
            <h4>Add a Comment</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postComment();
              }}
            >
              <div className="form-group">
                <textarea
                  name="comment"
                  className="form-control"
                  rows="3"
                  placeholder="Write your comment here..."
                  value={comment}
                  maxLength="200"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button
                className="btn btn-primary mt-2"
                type="submit"
                style={{ backgroundColor: "#5D3FD3" }}
              >
                Post a comment
              </button>
            </form>
          </div>
          {blog.comments && blog.comments.length > 0 && (
            <div className="mt-4">
              <h4>Comments</h4>
              <ul className="list-group mb-3">
                {blog.comments.map((comment) => (
                  <li
                    key={`${comment.user}-${comment.comment}`}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <table style={{ width: "100%", tableLayout: "fixed" }}>
                      <tbody>
                        <tr>
                          <td style={{ width: "20%" }}>
                            <strong>{comment.user}</strong>
                          </td>
                          <td style={{ width: "60%", color: "#555" }}>
                            {comment.comment}
                          </td>
                          <td style={{ width: "20%", textAlign: "right" }}>
                            {comment.user === userName && (
                              <button
                                className="btn btn-danger btn-sm"
                                style={{ margin: "5%" }}
                                onClick={() => deleteComment(comment)}
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <span
                      className="text-muted"
                      style={{ float: "right", fontSize: "0.8rem" }}
                    >
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
