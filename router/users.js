const express = require('express');

const router = express.Router();

const users = require('../controllers/users');
const { get } = require('../middleware/validate/user');

// Get user's info
router.get('/me', get, users.get);

module.exports = router;
