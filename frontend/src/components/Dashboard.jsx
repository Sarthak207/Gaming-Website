// server/models/User.js
const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
  gameType: {
    type: String,
    required: true,
    enum: ['TicTacToe', 'RockPaperScissors', 'MemoryGame', 'SnakeGame', 'Hangman', 'Wordle', 'Chess']
  },
  outcome: {
    type: String,
    enum: ['win', 'loss', 'draw'],
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  opponent: {
    type: String,
    default: 'Computer'
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
    unique: true,
    index: true
  },
  username: {
    type: String,
    sparse: true,
    trim: true
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
  gamesTied: {
    type: Number,
    default: 0
  },
  // Game-specific stats
  gameStats: {
    TicTacToe: {
      played: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
      tied: { type: Number, default: 0 }
    },
    RockPaperScissors: {
      played: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
      tied: { type: Number, default: 0 }
    },
    MemoryGame: {
      played: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
      bestScore: { type: Number, default: 0 }
    },
    SnakeGame: {
      played: { type: Number, default: 0 },
      highScore: { type: Number, default: 0 }
    },
    Hangman: {
      played: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      lost: { type: Number, default: 0 }
    },
    Wordle: {
      played: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
      averageAttempts: { type: Number, default: 0 }
    },
    Chess: {
      played: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
      tied: { type: Number, default: 0 }
    }
  },
  gameHistory: [gameHistorySchema],
  // Preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for win rate calculation
userSchema.virtual('winRate').get(function() {
  if (this.gamesPlayed === 0) return 0;
  return Math.round((this.gamesWon / this.gamesPlayed) * 100);
});

// For each game type
const gameTypes = ['TicTacToe', 'RockPaperScissors', 'MemoryGame', 'SnakeGame', 'Hangman', 'Wordle', 'Chess'];
gameTypes.forEach(game => {
  userSchema.virtual(`${game}WinRate`).get(function() {
    const stats = this.gameStats[game];
    if (!stats || stats.played === 0) return 0;
    return Math.round((stats.won / stats.played) * 100);
  });
});

module.exports = mongoose.model('User', userSchema);