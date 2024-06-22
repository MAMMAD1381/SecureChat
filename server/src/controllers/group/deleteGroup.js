const User = require('../../models/User')
const CustomError = require('../../utils/CustomError')
const Group = require('../../models/Group')
const Cert = require('../../models/Cert')


const deleteGroup = async (req, res, next) => {
  try {
    const user = req.user
    const { groupName } = req.body

    const group = await Group.findOne({name: groupName})

    const members = group.members
    await Promise.all(members.map(async (member) => {
      const currentMember = await User.findOne({username: member})
      currentMember.groupsJoined = currentMember.groupsJoined.filter(group => group.groupName !== groupName)
      await currentMember.save()
    }))

    const owner = await User.findOne({username: group.owner})
    owner.groupsOwned = owner.groupsOwned.filter(group => group.groupName !== groupName )
    await owner.save()

    await Cert.findOneAndDelete({name: groupName})

    await group.deleteOne()

    res.status(200).json({message: 'success deleting group'})
    
  } catch (error) {
    next(new CustomError('removing group failed', 500, error.message))
  }
}

module.exports = deleteGroup
