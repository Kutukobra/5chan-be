const creatorController = require('../controllers/creator.controller');
const express = require('express');
const router = express.Router();

router.post('/register', creatorController.registerUser);

module.exports = router;