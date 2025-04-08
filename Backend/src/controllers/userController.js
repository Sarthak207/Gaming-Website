// src/controllers/userController.js
const User = require('../models/User');
const Game = require('../models/Game');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { username, email, profilePicture } = req.body;
    
    // Build update object
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (profilePicture) updateFields.profilePicture = profilePicture;
    
    // Check if username or email already exists
    if (username || email) {
      const query = [];
      if (username) query.push({ username });
      if (email) query.push({ email });
      
      const existingUser = await User.findOne({
        $or: query,
        _id: { $ne: req.user.id }
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Username or email already in use'
        });
      }
    }
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add game to favorites
// @route   POST /api/users/favorites/:gameId
// @access  Private
exports.addFavorite = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.gameId);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        error: 'Game not found'
      });
    }
    
    // Check if already in favorites
    const user = await User.findById(req.user.id);
    
    if (user.favorites.includes(req.params.gameId)) {
      return res.status(400).json({
        success: false,
        error: 'Game already in favorites'
      });
    }
    
    // Add to favorites
    user.favorites.push(req.params.gameId);
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove game from favorites
// @route   DELETE /api/users/favorites/:gameId
// @access  Private
exports.removeFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Remove from favorites
    user.favorites = user.favorites.filter(
      gameId => gameId.toString() !== req.params.gameId
    );
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    next(error);
  }
};