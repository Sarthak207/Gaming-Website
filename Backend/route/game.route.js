import express from 'express';
const { requireAuth } = require('../middleware/auth');
import {getAllGames} from '../controller/game.controller.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'List of all games.',
    });
  });
  
  // Example: Add a new game (protected route)
  router.post('/add', requireAuth, (req, res) => {
    const { title, genre, price } = req.body;
  
    // Simulate adding a game
    res.status(201).json({
      success: true,
      message: 'Game added successfully!',
      data: { title, genre, price },
    });
  });
  
  module.exports = router;