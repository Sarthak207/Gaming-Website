// src/routes/news.js
const express = require('express');
const { 
  getNews, 
  getNewsArticle, 
  createNewsArticle 
} = require('../controllers/newsController');

const router = express.Router();

router.route('/')
  .get(getNews)
  .post(createNewsArticle); // In a real app, this would be protected by admin middleware

router.route('/:id').get(getNewsArticle);

module.exports = router;