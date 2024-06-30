// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const Group = require('../../models/Group')
const Poll = require('../../models/Poll')
const Cert = require('../../models/Cert')

const createGroup = async (req, res, next) => {
  try {
    const user = req.user
    const { groupName, question, options } = req.body

    const group = await Group.findOne({ name: groupName })
    if (!group) return next(new CustomError("group with this name doesn't exists", 404))

    if(group.owner !== user.username) return next(new CustomError("Poll creation is restricted to the group owner", 403))

    const cert = await Cert.findOne({name: groupName})
    if(!cert) return next(new CustomError("having certificate for group is needed to create polls", 403))

    let poll = new Poll({question, cert:cert._id, options: options.map(option => {return {optionText: option}})})
    poll = await poll.save()

    group.polls.push(poll._id)
    await group.save()

    res.status(201).json({ message: 'poll created successfully', poll })

    logger.info(`user ${user.username} created a poll for group: ${groupName}`)

  } catch (error) {
    return next(new CustomError('Creating poll failed', 500, error.message))
  }
}

module.exports = createGroup
