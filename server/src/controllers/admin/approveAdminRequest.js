// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const User = require('../../models/User')
const RequestAdmin = require('../../models/RequestAdmin')

const approveAdminRequest = async (req, res, next) => {
  try {
    const user = req.user

    const { username } = req.body

    const request = await RequestAdmin.findOne({
      status: 'pending',
      username,
    })
    request.status = 'approved'

    const updatedUser = await User.findOne({ username })
    updatedUser.role = 'admin'

    await updatedUser.save()
    await request.save()

    res.status(200).json({
      message: 'admin request granted',
      user: updatedUser,
    })
    
    logger.info(`admin request of ${username} was accepted by ${user.username}`)
  } catch (error) {
    next(new CustomError('approving admin request failed', 500, error.message))
  }
}

module.exports = approveAdminRequest
