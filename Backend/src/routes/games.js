// src/routes/games.js
const express = require('express');
const { 
  getGames, 
  getGame, 
  createGame, 
  getFeaturedGames 
} = require('../controllers/gameController');

const { protect } = require('../middleware/auth');

// Include review router
const reviewRouter = require('./reviews');

const router = express.Router();

// Re-route into review router
router.use('/:gameId/reviews', reviewRouter);

router.route('/featured').get(getFeaturedGames);
router.route('/')
  .get(getGames)
  .post(createGame); // In a real app, this would be protected by admin middleware

router.route('/:id').get(getGame);

module.exports = router;