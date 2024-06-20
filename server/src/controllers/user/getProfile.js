const User = require('../../models/User');
const CustomError = require('../../utils/CustomError')


const getProfile = async (req, res, next) => {

    let user = req.user
    try {
        const userExists = await User.findOne({ username:user.username });

        if (!userExists) 
            return next(new CustomError(`user not found`, 404))

        user = userExists.toObject()
        delete user.password

        res.status(200).json({message: 'profile request successful', profile: user});
    } catch (error) {
        return next(new CustomError('fetching user profile failed', 500, error.message))
    }
};

module.exports = getProfile;
