// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const Group = require('../../models/Group')
const GroupInvitation = require('../../models/GroupInvitation')
const Cert = require('../../models/Cert')

const inviteMember = async (req, res, next) => {
  try {
    const user = req.user
    const { groupName, member } = req.body

    const groupExits = await Group.findOne({name: groupName})

    if(!groupExits) return next(new CustomError('group not found', 404))

    if(!user.groupsOwned.some(item => item.groupName === groupName)) return next(new CustomError('this action is restricted to owner only'))

    const cert = await Cert.findOne({name: groupName})
    
    let invitation = new GroupInvitation({
      user: member,
      groupName,
      owner: user.username,
      cert
    })

    invitation = await invitation.save()

    res.status(200).json({ message: 'success inviting user', invitation })

    logger.info(`user ${user.username} invited user: ${member} to group: ${groupName}`)

  } catch (error) {
    next(new CustomError('inviting user failed failed', 500, error.message))
  }
}

module.exports = inviteMember
