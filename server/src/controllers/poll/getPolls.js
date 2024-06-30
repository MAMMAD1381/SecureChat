// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const Group = require('../../models/Group')
const Poll = require('../../models/Poll')

const createGroup = async (req, res, next) => {
  try {
    const user = req.user
    // const { groupName, question, options } = req.body
    const {groupName} = req.params

    const group = await Group.findOne({ name: groupName })
    if (!group) return next(new CustomError("group with this name doesn't exists", 404))

    if(!group.members.includes(user.username)) return next(new CustomError("you are not a member of this group", 403))

    const polls = Promise.all(group.polls.map(async(poll) => {
      return await Poll.findById(poll)
    }))

    console.log(polls)

    res.status(200).json({ message: 'fetching polls successfully', polls })

    logger.info(`polls of group: ${groupName} fetched by user: ${user.username}`)

  } catch (error) {
    return next(new CustomError('fetching polls failed', 500, error.message))
  }
}

module.exports = createGroup
