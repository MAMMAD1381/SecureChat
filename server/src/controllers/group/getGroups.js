// utils
const CustomError = require('../../utils/CustomError');
const logger = require('../../utils/logger')

// models
const User = require('../../models/User');
const Group = require('../../models/Group')

const getGroups = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.user.username }).select('groupsJoined');

        const userGroups = await Promise.all(user.groupsJoined.map(async (groupInfo) => {
            return await Group.findOne({ name: groupInfo.groupName }).populate('members', 'username email');
        }));

        res.status(200).json({message: 'success', groups: userGroups});

        logger.info(`user: ${user.username} requested it's joined groups`)

    } catch (error) {
        next(new CustomError('fetching groups failed', 500, error.message));
    }
};

module.exports = getGroups;
