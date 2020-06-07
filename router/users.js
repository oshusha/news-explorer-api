const express = require('express');

const router = express.Router();

const users = require('../controllers/users');

// Get user's info
router.get('/me', users.get);

module.exports = router;
