// src/controllers/gameController.js
const Game = require('../models/Game');
const Review = require('../models/Review');

// @desc    Get all games
// @route   GET /api/games
// @access  Public
exports.getGames = async (req, res, next) => {
  try {
    // Build query
    let query;
    
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    
    // Remove fields from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Handle special query params
    let queryStr = JSON.stringify(reqQuery);
    
    // Handle genre and platform arrays
    if (req.query.genre) {
      query = { ...query, genre: { $in: req.query.genre.split(',') } };
    }
    
    if (req.query.platform) {
      query = { ...query, platform: { $in: req.query.platform.split(',') } };
    }
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Finding resource
    query = Game.find(JSON.parse(queryStr));
    
    // Handle search
    if (req.query.search) {
      query = query.find({
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
          { developer: { $regex: req.query.search, $options: 'i' } },
          { publisher: { $regex: req.query.search, $options: 'i' } }
        ]
      });
    }
    
    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Game.countDocuments(JSON.parse(queryStr));
    
    query = query.skip(startIndex).limit(limit);
    
    // Execute query
    const games = await query;
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: games.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: games
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured games
// @route   GET /api/games/featured
// @access  Public
exports.getFeaturedGames = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 6;
    
    const games = await Game.find({ featured: true })
      .sort('-releaseDate')
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: games.length,
      data: games
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single game
// @route   GET /api/games/:id
// @access  Public
exports.getGame = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username profilePicture'
      }
    });
    
    if (!game) {
      return res.status(404).json({
        success: false,
        error: 'Game not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: game
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new game (Admin only in a real app)
// @route   POST /api/games
// @access  Public (would be Private/Admin)
exports.createGame = async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    
    res.status(201).json({
      success: true,
      data: game
    });
  } catch (error) {
    next(error);
  }
};