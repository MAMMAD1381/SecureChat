// utils
const CustomError = require('../../utils/CustomError');
const logger = require('../../utils/logger')

// models
const User = require('../../models/User');

const getUsers = async (req, res, next) => {
    try {
        const user = req.user

        const users = await User.find().select('username publicKey');

        res.status(200).json({message: 'success', users});

        logger.info(`user: ${user.username} requested all users`)

    } catch (error) {
        next(new CustomError('fetching users failed', 500, error.message));
    }
};

module.exports = getUsers;
