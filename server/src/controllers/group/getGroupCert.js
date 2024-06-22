const CustomError = require('../../utils/CustomError')
const Group = require('../../models/Group')
const Cert = require('../../models/Cert')

const getGroupCert = async (req, res, next) => {
  try {
    let {cert} = req.params

    cert = await Cert.findById(cert)

    res.status(200).json({ message: 'success fetching groups cert', cert })
  } catch (error) {
    next(new CustomError('fetching groups cert failed', 500, error.message))
  }
}

module.exports = getGroupCert
