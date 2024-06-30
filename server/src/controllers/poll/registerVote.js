// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const Group = require('../../models/Group')
const Poll = require('../../models/Poll')
const Vote = require('../../models/Vote')

const registerVote = async (req, res, next) => {
  try {
    const user = req.user
    const { pollId, vote } = req.body
    const { groupName } = req.params

    const group = await Group.findOne({ name: groupName })
    if (!group) return next(new CustomError("group with this name doesn't exists", 404))

    if (!group.members.includes(user.username))
      return next(new CustomError('you are not a member of this group', 403))

    let poll = await Poll.findById(pollId)
    if (groupName !== poll.group)
      return next(new CustomError(`vote doesn't belongs to this group`, 403))

    
    const voteExists = await Vote.findOne({votedBy: user.username, poll: poll._id})
    if(voteExists) return next(new CustomError('voter has already registered once', 400));
    let isVoted = false

    for (let option of poll.options) {
      if (option.optionText === vote) {

        let vote = new Vote({votedBy: user.username, poll: poll._id})
        vote = await vote.save()
        option.votes.push(vote._id);
        option.votesCount += 1;
        isVoted = true;
        break; // Exit the loop since the vote is registered
      }
    }

    poll = poll.save()

    if (!isVoted) return next(new CustomError('vote option not found', 404))

    res.status(200).json({ message: 'voting was successful', poll })

    logger.info(`user: ${user.username} voted:${vote}`)
  } catch (error) {
    return next(new CustomError('failed to vote', 500, error.message))
  }
}

module.exports = registerVote
