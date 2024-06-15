// src/middleware/authMiddleware.js
const {jwtDecoder} = require('../utils/jwt')
const User = require('../models/User');
const CustomError = require('../utils/CustomError');

const socketAuth = (io) => async (socket, next) => {
  const token = socket.handshake.auth.token
  // console.log('token', token)
  if (!token) return next(new CustomError('socket auth failed, token not found', 400))

  const decodedUser = await jwtDecoder(token)

  if (!io.users) io.users = {}
  io.users[decodedUser.username] = socket
  socket.user = decodedUser
  console.log(`${decodedUser.username}, ${socket.id} user authenticated`)
  
  next()
};

module.exports = socketAuth;
