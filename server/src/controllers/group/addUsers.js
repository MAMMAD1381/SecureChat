const CustomError = require('../../utils/CustomError');
const Group = require('../../models/Group');
const User = require('../../models/User');
const generateKeys = require('../../utils/generateKeys')
const Crypto = require('../../utils/Crypto');
const Cert = require('../../models/Cert');

const addUsers = async (req, res, next) => {
  try {
    const user = req.user;
    const { groupName, users } = req.body;

    console.log(user, groupName, users)

    

    res.status(200).json({ message: 'user(s) added successfully', group: savedGroup });
  } catch (error) {
    return next(new CustomError('adding users failed', 500, error.message));
  }
};

module.exports = addUsers;
