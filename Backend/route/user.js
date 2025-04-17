// File: backend/routes/user.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const User = require('../models/User');

// Get user statistics
router.get('/stats', requireAuth, async (req, res) => {
  try {
    // req.userId comes from the auth middleware after verifying with Clerk
    const userId = req.userId;
    
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Calculate win rate
    const winRate = user.gamesPlayed > 0 
      ? Math.round((user.gamesWon / user.gamesPlayed) * 100) 
      : 0;
    
    res.json({
      gamesPlayed: user.gamesPlayed || 0,
      gamesWon: user.gamesWon || 0,
      gamesLost: user.gamesLost || 0,
      winRate,
      recentGames: user.gameHistory.slice(0, 10) // Get 10 most recent games
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Record game result
router.post('/record-game', requireAuth, async (req, res) => {
  try {
    const { gameType, outcome } = req.body;
    const userId = req.userId;
    
    if (!gameType || !outcome) {
      return res.status(400).json({ message: 'Game type and outcome are required' });
    }
    
    let user = await User.findOne({ clerkId: userId });
    
    // If user doesn't exist in our DB yet, create them
    if (!user) {
      user = new User({
        clerkId: userId,
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        gameHistory: []
      });
    }
    
    // Update user stats
    user.gamesPlayed += 1;
    
    if (outcome === 'win') {
      user.gamesWon += 1;
    } else if (outcome === 'loss') {
      user.gamesLost += 1;
    }
    
    // Add to game history
    user.gameHistory.unshift({
      gameType,
      outcome,
      playedAt: new Date()
    });
    
    // Keep history manageable (optional)
    if (user.gameHistory.length > 100) {
      user.gameHistory = user.gameHistory.slice(0, 100);
    }
    
    await user.save();
    
    res.status(200).json({ message: 'Game recorded successfully' });
  } catch (error) {
    console.error('Error recording game:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;