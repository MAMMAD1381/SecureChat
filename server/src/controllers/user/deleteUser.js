// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const User = require('../../models/User');

const deleteUser = async (req, res, next) => {

    try {
        const user = req.user
        
        let username = req.body.username
        await User.findOneAndDelete({ username });
        res.status(200).json({message: 'user removed'});

        logger.info(`user: ${username} removed by ${user.username}`)

    } catch (error) {
        return next(new CustomError('fetching user profile failed', 500, error.message))
    }
};

module.exports = deleteUser;
