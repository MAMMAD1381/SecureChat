const User = require('../../models/User')
const CustomError = require('../../utils/CustomError')
const Group = require('../../models/Group')
const GroupInvitation = require('../../models/GroupInvitation')

const removeMember = async (req, res, next) => {
  try {
    const user = req.user
    const { groupName } = req.body

    const groupExits = await Group.findOne({ name: groupName })

    if (!groupExits) return next(new CustomError('group not found', 404))

    const invitation = await GroupInvitation.findOne({groupName, status:'pending'})
    invitation.status = 'accepted'
    await invitation.save()

    const updatedUser = await User.findOne({ username: user.username })
    updatedUser.groupsJoined.push({groupName: groupExits.name, groupId: groupExits._id})
    await updatedUser.save()

    const group = await Group.findOne({ name: groupName })
    group.members.push(user.username)
    await group.save()

    res.status(200).json({ message: 'success accepting invitation', invitation })
  } catch (error) {
    next(new CustomError('accepting invitation failed', 500, error.message))
  }
}

module.exports = removeMember
