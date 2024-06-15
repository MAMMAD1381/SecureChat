const User = require('../../models/User');
const CustomError = require('../../utils/CustomError');

const getGroups = async (req, res, next) => {
    try {
        const groups = await User.find().select('groupsJoined');

        res.status(200).json({message: 'success', groups});
    } catch (error) {
        next(new CustomError('fetching groups failed', 500, error.message));
    }
};

module.exports = getGroups;
