const mongoose = require('mongoose');

async function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err))
}

module.exports = connectDB
