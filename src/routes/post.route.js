const postController = require('../controllers/post.controller');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sbd',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({storage});

// router.post('/create', upload.single('file'), postController.createPost);

router.get('/', postController.getPosts);

router.get('/:id', postController.getReplies);

router.delete('/', postController.getPosts);

module.exports = router;