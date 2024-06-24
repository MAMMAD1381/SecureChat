// utils
const CustomError = require('../utils/CustomError')
const {jwtDecoder} = require('../utils/jwt')
const logger = require('../utils/logger')

const authenticate = (method) => {
  return async (req, res, next) => {
    try {
      let token

      if (!method) {
        return next(new CustomError('server error, authentication method not specified', 500))
      }

      if (method === 'cookie' && req.cookies && req.cookies.token) {
        token = req.cookies.token
      } else if (
        method === 'Bearer' &&
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1]
      }

      if (!token) {
        return next(new CustomError('Not authorized, no token', 401))
      }

      req.user = await jwtDecoder(token)

      logger.info(`user: ${req.user.username} authenticated`)
      
      next()
    } catch (error) {
      return next(new CustomError('authentication failed', 500, error.message))
    }
  }
}

module.exports = authenticate
