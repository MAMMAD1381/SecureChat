const CustomError = require('../../utils/CustomError')
const Group = require('../../models/Group')
const User = require('../../models/User')
const generateKeys = require('../../utils/generateKeys')
const Crypto = require('../../utils/Crypto')
const Cert = require('../../models/Cert')

const createGroup = async (req, res, next) => {
  try {
    const user = req.user
    const { groupName, description } = req.body

    const existsGroup = await Group.findOne({ name: groupName })
    if (existsGroup) return next(new CustomError('group with this name already exists', 400))

    const { publicKey, privateKey } = await generateKeys()
    const crypto = new Crypto(privateKey, publicKey)
    const signature = crypto.signData(groupName)
    let cert = new Cert({
      name: groupName,
      publicKey,
      signature,
      certType: 'group',
      certOwner: user.username,
    })

    cert = await cert.save()

    const newGroup = new Group({
      name: groupName,
      description,
      owner: user.username,
      cert: cert._id,
    })

    const savedGroup = await newGroup.save()

    const updatedUser = await User.findOne({ username: user.username })

    updatedUser.groupsOwned.push({
      groupId: savedGroup._id,
      groupName: groupName,
    })

    updatedUser.groupsJoined.push({
      groupId: savedGroup._id,
      groupName: groupName,
    })

    await updatedUser.save()

    res.status(201).json({ message: 'Group created successfully', group: savedGroup })
  } catch (error) {
    return next(new CustomError('Creating group failed', 500, error.message))
  }
}

module.exports = createGroup
