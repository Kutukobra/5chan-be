const postController = require('../controllers/post.controller');
const express = require('express');
const router = express.Router();

router.post('/create', postController.createPost);

module.exports = router;