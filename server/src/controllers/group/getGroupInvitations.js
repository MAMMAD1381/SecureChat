// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const GroupInvitation = require('../../models/GroupInvitation')

const getGroupInvitations = async (req, res, next) => {
  try {
    const user = req.user

    const invitations = await GroupInvitation.find({user: user.username, status: 'pending'})

    res.status(200).json({ message: 'success fetching group invitations', invitations })

    logger.info(`user ${user.username} requested it's group invitations`)

  } catch (error) {
    next(new CustomError('fetching user invitations failed', 500, error.message))
  }
}

module.exports = getGroupInvitations
