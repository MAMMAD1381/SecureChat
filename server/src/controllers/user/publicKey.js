const User = require('../../models/User');
const CustomError = require('../../utils/CustomError')

const getUserPublicKey = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({username}).select('username publicKey');

        if (!user)
            return next(new CustomError(`user not found`, 404))
        
        res.status(200).json({message:'success', user})

    } catch (error) {
        return next(new CustomError('getting public key failed', 500, error.message))
    }
};

module.exports = getUserPublicKey;
