const express = require('express');

const router = express.Router();
const articles = require('../controllers/articles');

const { getArticle } = require('../middleware/articles');
const { get, post } = require('../middleware/validate/article');

// Get all user's articles
router.get('/', articles.get);

// Create article
router.post('/', post, articles.post);

// Delete article by id
router.delete('/:id', get, getArticle, articles.delete);

module.exports = router;
