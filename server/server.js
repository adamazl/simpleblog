const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('basic-auth');

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json());

const BLOG_POSTS_FILE = path.join(__dirname, 'blog-posts.json');

// Environment variables for admin credentials
const username = process.env.ADMIN_USERNAME || '';
const password = process.env.ADMIN_PASSWORD || '';

// Middleware for basic authentication
const authenticate = (req, res, next) => {
  const user = auth(req);
  if (!user || user.name !== username || user.pass !== password) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Access denied. Admins only.');
  }
  next();
};

// Load existing blog posts
const loadBlogPosts = () => {
  try {
    const data = fs.readFileSync(BLOG_POSTS_FILE);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Save blog posts to file
const saveBlogPosts = (posts) => {
  fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
};

// API route to fetch blog posts
app.get('/api/blog-posts', (req, res) => {
  const posts = loadBlogPosts();
  res.json(posts);
});

// API route to create a new blog post (admin only)
app.post('/api/blog-posts', authenticate, (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    date: new Date().toISOString(),
  };

  const posts = loadBlogPosts();
  posts.push(newPost);
  saveBlogPosts(posts);

  res.status(201).json({ message: 'Blog post created!', post: newPost });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
