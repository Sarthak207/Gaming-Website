// File: backend/models/User.js
const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
  gameType: {
    type: String,
    required: true
  },
  outcome: {
    type: String,
    enum: ['win', 'loss', 'draw'],
    required: true
  },
  playedAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  gamesPlayed: {
    type: Number,
    default: 0
  },
  gamesWon: {
    type: Number,
    default: 0
  },
  gamesLost: {
    type: Number,
    default: 0
  },
  gameHistory: [gameHistorySchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);