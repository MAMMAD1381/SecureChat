const CustomError = require('../utils/CustomError')
const {jwtDecoder} = require('../utils/jwt')
const Group = require('../models/Group')

async function handlePrivateMessage(socket, io, data, ack) {
  console.log(`new Message from ${data.user.username}. to ${data.target.username}`)

  io.users[data.target.username].emit('privateMessage', data)
}

async function handleGroupMessage(socket, io, data, ack) {

  const { user, group, message } = data
  try{
    group.members.map(member => member === user.username ? null : io.users[member].emit('groupMessage', data))

  }
  catch(err){

  }
  console.log(`message from ${user} to ${group.name}`)
}


async function handleDisconnect(socket, io) {
  try{
    delete io.users[socket.user.username]
    for(const [groupName, members] in io.groupsMember){
      console.log(groupName, members)
      if(members.has(socket.user.username))
        members.delete(socket.user.username)
    }
    console.log(`${socket.user.username} disconnected`)
  }
  catch(err){
    return new CustomError('user disconnection failed', 500, err.message)
  }
}

async function handleJoinGroup(socket, io, data, ack) {
  const {user, group, message} = data
  const existGroup = await Group.findOne({name: group.name})
  // console.log(existGroup)
  // sfsfs
  if(! existGroup.members.includes(user.username))
    return

  if (!io.groupsMember) io.groupsMember = {}

  if (!io.groupsMember[existGroup.name]) io.groupsMember[existGroup.name] = new Set()

  io.groupsMember[existGroup.name].add(user.username)
  // try{
  //   delete io.users[socket.user.username]
  //   console.log(`${socket.user.username} disconnected`)
  // }
  // catch(err){
  //   return new CustomError('user disconnection failed', 500, err.message)
  // }
}

async function handleLeaveGroup(socket, io) {
  try{
    delete io.users[socket.user.username]
    console.log(`${socket.user.username} disconnected`)
  }
  catch(err){
    return new CustomError('user disconnection failed', 500, err.message)
  }
}

module.exports = {
  handleDisconnect,
  handlePrivateMessage,
  handleGroupMessage,
  handleJoinGroup,
  handleLeaveGroup
}
