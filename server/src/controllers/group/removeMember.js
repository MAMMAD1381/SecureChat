// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const User = require('../../models/User')
const Group = require('../../models/Group')

const removeMember = async (req, res, next) => {
  try {
    const user = req.user
    const { groupName, member } = req.body

    const groupExits = await Group.findOne({ name: groupName })

    if (!groupExits) return next(new CustomError('group not found', 404))

    if(!user.groupsOwned.some(group => group.groupName === groupName)) return next(new CustomError('this action is restricted to owner only'))

    const updatedUser = await User.findOne({ username: member })
    updatedUser.groupsJoined = updatedUser.groupsJoined.filter((group) => group.groupName !== groupName)
    await updatedUser.save()

    const group = await Group.findOne({ name: groupName })
    group.members = group.members.filter((m) => m !== member)
    await group.save()

    res.status(200).json({ message: 'user removed from group successfully' })

    logger.info(`user: ${user.username} removed user: ${member} from group: ${groupName}`)

  } catch (error) {
    next(new CustomError('removing user from group failed', 500, error.message))
  }
}

module.exports = removeMember
