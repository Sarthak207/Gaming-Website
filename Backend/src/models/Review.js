// src/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  game: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String,
    required: [true, 'Review comment is required'],
    trim: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Prevent user from submitting more than one review per game
reviewSchema.index({ game: 1, user: 1 }, { unique: true });

// Static method to get average rating
reviewSchema.statics.getAverageRating = async function(gameId) {
  const obj = await this.aggregate([
    {
      $match: { game: gameId }
    },
    {
      $group: {
        _id: '$game',
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    const Game = mongoose.model('Game');
    await Game.findByIdAndUpdate(gameId, {
      rating: obj.length > 0 ? Math.round(obj[0].avgRating * 10) / 10 : 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.game);
});

// Call getAverageRating after remove
reviewSchema.post('remove', function() {
  this.constructor.getAverageRating(this.game);
});

module.exports = mongoose.model('Review', reviewSchema);