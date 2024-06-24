// utils
const logger = require('../../utils/logger')
const CustomError = require('../../utils/CustomError')

// models
const Cert = require('../../models/Cert')

const getGroupCert = async (req, res, next) => {
  try {
    const user = req.user

    let {cert} = req.params

    cert = await Cert.findById(cert)

    res.status(200).json({ message: 'success fetching groups cert', cert })

    logger.info(`group certificate with id: ${cert} requested by ${user.username}`)

  } catch (error) {
    next(new CustomError('fetching groups cert failed', 500, error.message))
  }
}

module.exports = getGroupCert
