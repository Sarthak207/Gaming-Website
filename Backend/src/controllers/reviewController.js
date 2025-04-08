// src/controllers/reviewController.js

const Review = require('../models/Review');
const Game = require('../models/Game');

// @desc    Add review for game
// @route   POST /api/games/:gameId/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
  try {
    req.body.game = req.params.gameId;
    req.body.user = req.user.id;

    // Check if game exists
    const game = await Game.findById(req.params.gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        error: 'Game not found'
      });
    }

    // Check if user already submitted a review for this game
    const existingReview = await Review.findOne({
      user: req.user.id,
      game: req.params.gameId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        error: 'You have already reviewed this game'
      });
    }

    // Create review
    const review = await Review.create(req.body);

    // Populate user data
    await review.populate('user', 'username profilePicture');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
