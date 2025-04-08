// src/app.js
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error');

// Import route files
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const newsRoutes = require('./routes/news');
const userRoutes = require('./routes/users');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);

// Simple welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Gaming Website API' });
});

// Error handler middleware (should be last)
app.use(errorHandler);

module.exports = app;