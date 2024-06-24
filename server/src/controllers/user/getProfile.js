// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const User = require('../../models/User');

const getProfile = async (req, res, next) => {

    try {
        let user = req.user

        const userExists = await User.findOne({ username:user.username });

        if (!userExists) 
            return next(new CustomError(`user not found`, 404))

        user = userExists.toObject()
        delete user.password

        res.status(200).json({message: 'profile request successful', profile: user});

        logger.info(`user: ${user.username} requested it's profile`)

    } catch (error) {
        return next(new CustomError('fetching user profile failed', 500, error.message))
    }
};

module.exports = getProfile;
