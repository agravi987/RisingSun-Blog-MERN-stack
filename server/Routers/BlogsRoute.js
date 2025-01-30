const express = require("express");
const Blog = require("../Modals/blogs");

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

// Get the most recent 3 blogs
router.get("/recent", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent blogs", error });
  }
});

// Get a specific blog by ID, including externalLink if available
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog); // The blog object should include externalLink if it's part of the schema
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
});

// Delete a specific blog by ID
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Error deleting blog", error });
  }
});

router.post("/create", async (req, res) => {
  const { title, content, author, category, externalLink } = req.body;

  if (!title || !content || !author || !category) {
    return res
      .status(400)
      .json({ message: "Title, content, author, and category are required" });
  }

  const newBlog = new Blog({
    title,
    content,
    author,
    category,
    externalLink,
    createdAt: new Date(),
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
});

// Post a comment to a specific blog
router.post("/:id/comments", async (req, res) => {
  const { comment, user } = req.body;

  if (!comment || !user) {
    return res
      .status(400)
      .json({ message: "Comment and user name are required" });
  }

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({ user, comment });
    await blog.save();

    res.status(201).json({ message: "Comment posted successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Error posting comment", error });
  }
});

// Delete a comment from a specific blog
router.delete("/:id/comments/:commentId", async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const initialLength = blog.comments.length;
    blog.comments = blog.comments.filter(
      (comment) =>
        `${comment.user}${comment.comment}` !== decodeURIComponent(commentId)
    );

    if (blog.comments.length === initialLength) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await blog.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
});

module.exports = router;

// Update a specific blog by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, author, category, externalLink } = req.body;

  if (!title || !content || !author || !category) {
    return res
      .status(400)
      .json({ message: "Title, content, author, and category are required" });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = title;
    blog.content = content;
    blog.author = author;
    blog.category = category;
    blog.externalLink = externalLink;
    blog.updatedAt = new Date();

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
});
