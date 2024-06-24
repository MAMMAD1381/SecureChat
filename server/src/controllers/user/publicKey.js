// utils
const logger = require('../../utils/logger')
const CustomError = require('../../utils/CustomError')

// models
const User = require('../../models/User');

const getUserPublicKey = async (req, res, next) => {
    try {
        const user = req.user
        
        const username = req.params.username;
        const requestedUser = await User.findOne({username}).select('username publicKey');

        if (!requestedUser)
            return next(new CustomError(`user not found`, 404))
        
        res.status(200).json({message:'success', requestedUser})

        logger.info(`user: ${user.username} requested public key of user: ${username}`)

    } catch (error) {
        return next(new CustomError('getting public key failed', 500, error.message))
    }
};

module.exports = getUserPublicKey;
