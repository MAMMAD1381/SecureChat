// utils
const CustomError = require('../../utils/CustomError')
const logger = require('../../utils/logger')

// models
const Cert = require('../../models/Cert')

const createGroup = async (req, res, next) => {
  try {
    const user = req.user
    const {certId} = req.params

    const cert = await Cert.findById(certId)

    res.status(200).json({ message: 'fetching cert successfully', cert })

    logger.info(`cert fetched by user: ${user.username}`)

  } catch (error) {
    return next(new CustomError('fetching cert failed', 500, error.message))
  }
}

module.exports = createGroup
