const CustomError = require('../../utils/CustomError')
const Group = require('../../models/Group')

const getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find()

    res.status(200).json({ message: 'fetching groups successful', groups })
  } catch (error) {
    next(new CustomError('fetching groups failed', 500, error.message))
  }
}

module.exports = getAllGroups
