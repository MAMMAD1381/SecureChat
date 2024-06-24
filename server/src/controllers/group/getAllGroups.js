// utils
const logger = require('../../utils/logger')
const CustomError = require('../../utils/CustomError')

// models
const Group = require('../../models/Group')

const getAllGroups = async (req, res, next) => {
  try {
    const user = req.user

    const groups = await Group.find()

    res.status(200).json({ message: 'fetching groups successful', groups })

    logger.info(`super admin ${user.username} request all groups`)

  } catch (error) {
    next(new CustomError('fetching groups failed', 500, error.message))
  }
}

module.exports = getAllGroups
