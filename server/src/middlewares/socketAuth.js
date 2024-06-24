// utils
const {jwtDecoder} = require('../utils/jwt')
// const CustomError = require('../utils/CustomError');
const logger = require('../utils/logger')

// models
const User = require('../models/User');

const socketAuth = (io) => async (socket, next) => {
  const token = socket.handshake.auth.token
  if (!token){
    logger.error('socket auth failed, token not found')
    return
  } 

  const decodedUser = await jwtDecoder(token)

  const userExists = await User.findOne({username: decodedUser.username})
  if (!userExists) {
    logger.error('user not found')
    return
  }

  if (!io.users) io.users = {}
  io.users[decodedUser.username] = socket
  socket.user = decodedUser

  logger.info(`user: ${socket.user.username} authenticated over socket connection`)
  
  next()
};

module.exports = socketAuth;
