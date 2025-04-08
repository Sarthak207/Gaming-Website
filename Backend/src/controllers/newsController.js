// src/controllers/newsController.js
const News = require('../models/News');

// @desc    Get all news articles
// @route   GET /api/news
// @access  Public
exports.getNews = async (req, res, next) => {
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
    
    // Handle tags array
    if (req.query.tag) {
      query = { ...query, tags: { $in: [req.query.tag] } };
    }
    
    // Finding resource
    query = News.find(JSON.parse(queryStr));
    
    // Handle search
    if (req.query.search) {
      query = query.find({
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { content: { $regex: req.query.search, $options: 'i' } },
          { tags: { $in: [new RegExp(req.query.search, 'i')] } }
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
      query = query.sort('-publishDate');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await News.countDocuments(JSON.parse(queryStr));
    
    query = query.skip(startIndex).limit(limit);
    
    // Execute query
    const news = await query;
    
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
      count: news.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single news article
// @route   GET /api/news/:id
// @access  Public
exports.getNewsArticle = async (req, res, next) => {
  try {
    const article = await News.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    // Get related articles based on tags
    const relatedArticles = await News.find({
      _id: { $ne: article._id },
      tags: { $in: article.tags }
    })
    .sort('-publishDate')
    .limit(3);
    
    res.status(200).json({
      success: true,
      data: article,
      related: relatedArticles
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create news article (Admin only in a real app)
// @route   POST /api/news
// @access  Public (would be Private/Admin)
exports.createNewsArticle = async (req, res, next) => {
  try {
    const article = await News.create(req.body);
    
    res.status(201).json({
      success: true,
      data: article
    });
  } catch (error) {
    next(error);
  }
};