const mongoose = require('mongoose');
const logger = require('./logger')

async function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => logger.info('MongoDB connected'))
    .catch((err) => logger.error(err))
}

module.exports = connectDB
