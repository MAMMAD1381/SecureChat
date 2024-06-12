const errorHandler = (err, req, res, next) => {
  res.status(err?.statusCode || res?.statusCode || 500);
  res.json({
      message: err.message,
      // // Optionally, add stack trace for development purposes
      // ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      // // Add additional details if necessary
      details: err.details || undefined,
  });
};

module.exports = errorHandler;
