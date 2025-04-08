// src/routes/users.js
const express = require('express');
const { 
  updateProfile,
  addFavorite,
  removeFavorite 
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.use(protect);

router.put('/profile', updateProfile);
router.post('/favorites/:gameId', addFavorite);
router.delete('/favorites/:gameId', removeFavorite);

module.exports = router;