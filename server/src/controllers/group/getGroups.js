const User = require('../../models/User');
const CustomError = require('../../utils/CustomError');
const Group = require('../../models/Group')

const getGroups = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.user.username }).select('groupsJoined');

        // Fetch user groups and populate members
        const userGroups = await Promise.all(user.groupsJoined.map(async (groupInfo) => {
            return await Group.findOne({ name: groupInfo.groupName }).populate('members', 'username email');
        }));

        res.status(200).json({message: 'success', groups: userGroups});
    } catch (error) {
        next(new CustomError('fetching groups failed', 500, error.message));
    }
};

module.exports = getGroups;
