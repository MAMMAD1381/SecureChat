class CustomError extends Error{
  constructor(message, statusCode, logging = false){
    super(message || 'server error')
    this.statusCode = statusCode || 500

    if(logging)
      this.log()
  }

  log() {
    console.error(`Error: ${this.message} statusCode: ${this.statusCode}`)
    console.error(this.stack)
  }


}

module.exports = CustomError