class CustomError extends Error{
  constructor(message, statusCode, developmentLog=undefined){
    super(message || 'server error')
    this.statusCode = statusCode || 500
    this.developmentLog = developmentLog
    console.error(`Error: ${this.message} & ${this.developmentLog} statusCode: ${this.statusCode}`)
    console.error(this.stack)
  }
}

module.exports = CustomError