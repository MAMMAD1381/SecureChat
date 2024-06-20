const User = require('../../models/User');
const CustomError = require('../../utils/CustomError')


const deleteUser = async (req, res, next) => {

    let username = req.body.username
    try {
        await User.findOneAndDelete({ username });
        res.status(200).json({message: 'user removed'});
    } catch (error) {
        return next(new CustomError('fetching user profile failed', 500, error.message))
    }
};

module.exports = deleteUser;
