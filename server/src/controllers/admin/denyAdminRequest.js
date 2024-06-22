const User = require('../../models/User')
const RequestAdmin = require('../../models/RequestAdmin')
const CustomError = require('../../utils/CustomError')

const denyAdminRequest = async (req, res, next) => {
  try {
    const user = req.user

    const {username} = req.body
    const request = await RequestAdmin.findOne({
      status: 'pending',
      username,
    })

    request.status = 'rejected'

    await request.save()

    res.status(200).json({
      message: 'admin request rejected successfully',
    })
  } catch (error) {
    next(new CustomError('rejecting admin request failed', 500, error.message))
  }
}

module.exports = denyAdminRequest
