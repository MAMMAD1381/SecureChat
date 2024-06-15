const User = require('../../models/User');
const CustomError = require('../../utils/CustomError');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('username publicKey');

        res.status(200).json({message: 'success', users});
    } catch (error) {
        next(new CustomError('fetching users failed', 500, error.message));
    }
};

module.exports = getUsers;
