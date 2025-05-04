const postRepository = require('../repositories/post.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.createPost = async (req, res) => {
    try {
        const post = await postRepository.createPost({...req.body, ...req.file});
        baseResponse (
            res,
            true,
            200,
            "Post created.",
            post
        );
    } catch (error) {
        baseResponse (
            res,
            true,
            500,
            error.meassage || "Failed to create post.",
            post
        );
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await 
    }
}