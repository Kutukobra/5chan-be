const creatorRepository = require('../repositories/creator.repository');
const baseResponse = require('../utils/baseResponse.util');

const password = require('../utils/password.util');

exports.registerCreator = async (req, res) => {
    if (!req.query.name || !req.query.password) {
        return baseResponse(
            res,
            false,
            400,
            "No username of password given."
        )
    }

    try {
        req.query.password = await password.hashPassword(req.query.password);

        const creator = await creatorRepository.registerCreator(req.query);
        
        baseResponse(
            res,
            true,
            200,
            "Creator created.",
            creator
        );
    } catch (error) {
        if (error.constraint === 'creators_name_key') {
            return baseResponse(
                res,
                false,
                400,
                "Username taken"
            );
        }
        
        baseResponse(
            res,
            false,
            500,
            error.message || "Failed to create creator"
        )
    }
};