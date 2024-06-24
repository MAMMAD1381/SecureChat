// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const Group = require('../../models/Group')
const GroupInvitation = require('../../models/GroupInvitation')

const rejectMember = async (req, res, next) => {
  try {
    const user = req.user
    const { groupName } = req.body

    const groupExits = await Group.findOne({ name: groupName })

    if (!groupExits) return next(new CustomError('group not found', 404))

    const invitation = await GroupInvitation.findOne({groupName, user: user.username})
    invitation.status = 'rejected'

    await invitation.save()

    res.status(200).json({ message: 'invitation rejected successfully', invitation })

    logger.info(`user: ${user.username} rejected invitation to group: ${groupName}`)

  } catch (error) {
    next(new CustomError('rejecting invitation failed', 500, error.message))
  }
}

module.exports = rejectMember
