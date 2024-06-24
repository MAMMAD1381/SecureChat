const User = require('../models/User')
const CustomError = require('./CustomError')
const jwt = require('jsonwebtoken')

async function jwtDecoder(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.user._id).select('-password')

    if (!user) {
      return new CustomError('User not found, wrong token', 404)
    }

    return user
  } catch (error) {
    return new CustomError('decoding jwt token failed', 500, error.message)
  }
}

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' })
}

module.exports = {jwtDecoder, generateToken}