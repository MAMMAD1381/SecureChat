// utils
const CustomError = require('../utils/CustomError')
const logger = require('../utils/logger')

// models
const Group = require('../models/Group')

async function handlePrivateMessage(socket, io, data, ack) {  
  try {
    const { sender, target } = data
    logger.info(`new private message from user: ${sender.username} to user: ${target.username}`)
    io.users[data.target.username].emit('privateMessage', data)
  } catch (err) {
    logger.error(`error on handling private message. more details: ${err.message}`)
  }
}

async function handleGroupMessage(socket, io, data, ack) {
  try {
    const { user, group, message } = data
    group.members.map((member) =>
      member === user.username ? null : io.users[member].emit('groupMessage', data)
    )
    logger.info(`new group message from user: ${user.username} to group: ${group.name}`)
  } catch (err) {
    logger.error(`error on handling group message. more details: ${err.message}`)
  }
}

async function handleDisconnect(socket, io) {
  try {
    delete io.users[socket.user.username]
    for (const [groupName, members] in io.groupsMember) {
      if (members.has(socket.user.username)) members.delete(socket.user.username)
    }
    logger.info(`user: ${socket.user.username} disconnected`)
  } catch (err) {
    logger.error(`error on handling user disconnection. more details: ${err.message}`)
  }
}

async function handleJoinGroup(socket, io, data, ack) {
  try{
    const { user, group, message } = data
    const existGroup = await Group.findOne({ name: group.name })

    if (!existGroup.members.includes(user.username)) return
  
    if (!io.groupsMember) io.groupsMember = {}
  
    if (!io.groupsMember[existGroup.name]) io.groupsMember[existGroup.name] = new Set()
  
    io.groupsMember[existGroup.name].add(user.username)

    logger.info(`user: ${user.username} joined group`)
  }
  catch(err){
    logger.error(`error on handling user joining group. more details: ${err.message}`)
  }
}

async function handleLeaveGroup(socket, io) {
  try {
    delete io.users[socket.user.username]
    logger.info(`user: ${socket.user.username} left group`)
  } catch (err) {
    logger.error(`error on handling user leaving group. more details: ${err.message}`)
  }
}

module.exports = {
  handleDisconnect,
  handlePrivateMessage,
  handleGroupMessage,
  handleJoinGroup,
  handleLeaveGroup,
}
