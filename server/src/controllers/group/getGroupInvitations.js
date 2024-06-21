const CustomError = require('../../utils/CustomError')
const GroupInvitation = require('../../models/GroupInvitation')

const getGroupInvitations = async (req, res, next) => {
  try {
    const user = req.user

    const invitations = await GroupInvitation.find({user: user.username, status: 'pending'})

    console.log(invitations)

    res.status(200).json({ message: 'success fetching group invitations', invitations })
  } catch (error) {
    next(new CustomError('fetching user invitations failed', 500, error.message))
  }
}

module.exports = getGroupInvitations
