// src/models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Game title is required'],
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, 'Game description is required'] 
  },
  imageUrl: { 
    type: String, 
    required: [true, 'Game image URL is required'] 
  },
  coverImage: {
    type: String,
    default: 'default-cover.jpg'
  },
  genre: [{ 
    type: String, 
    required: true 
  }],
  platform: [{ 
    type: String, 
    required: true 
  }],
  releaseDate: { 
    type: Date 
  },
  developer: { 
    type: String 
  },
  publisher: { 
    type: String 
  },
  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5 
  },
  price: { 
    type: Number 
  },
  discountPrice: { 
    type: Number 
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  trailerUrl: {
    type: String
  },
  screenshots: [{
    type: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
gameSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'game',
  justOne: false
});

// Method to calculate and update average rating
gameSchema.methods.calculateAverageRating = async function() {
  const Review = mongoose.model('Review');
  
  const stats = await Review.aggregate([
    {
      $match: { game: this._id }
    },
    {
      $group: {
        _id: '$game',
        avgRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    this.rating = Math.round(stats[0].avgRating * 10) / 10; // Round to 1 decimal
  } else {
    this.rating = 0;
  }
  
  await this.save();
};

module.exports = mongoose.model('Game', gameSchema);