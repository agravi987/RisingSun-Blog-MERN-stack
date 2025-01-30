const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    category: { type: String, required: true },
    comments: [{
        user: String,
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }],
    externalLink: { type: String } 
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
