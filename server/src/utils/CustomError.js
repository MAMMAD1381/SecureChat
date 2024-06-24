const logger = require('./logger')
class CustomError extends Error{
  constructor(message, statusCode, developmentLog=undefined){
    super(message || 'server error')
    this.statusCode = statusCode || 500
    this.developmentLog = developmentLog
    
    logger.error(`Error: ${this.message} & ${this.developmentLog} statusCode: ${this.statusCode}`)
    logger.error(this.stack)
  }
}

module.exports = CustomError