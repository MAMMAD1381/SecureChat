const CustomError = require('../utils/CustomError')

const errorHandler = (err, req, res, next) => {
  if(err instanceof CustomError){
    res.status(err.statusCode);
    res.json({
        message: err.message,
        details: err.details || undefined,
    });
  }
  else{
    res.status(500);
    res.json({
        message: 'server error',
        details: err.details || undefined,
    });
  }

};

module.exports = errorHandler;
