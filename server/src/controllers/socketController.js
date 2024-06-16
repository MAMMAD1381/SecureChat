const CustomError = require('../utils/CustomError')
const {jwtDecoder} = require('../utils/jwt')

async function handlePrivateMessage(socket, io, data, ack) {
  console.log(`new Message from ${data.user.username}. to ${data.target.username}`)

  io.users[data.target.username].emit('privateMessage', data)
}

async function handleGroupMessage(socket, io, data, ack) {

  const { user, group, message } = data
  group.members.map(member => member === user.username ? null : io.users[member].emit('groupMessage', data))
  console.log(`message from ${user} to ${group.name}`)
}


async function handleDisconnect(socket, io) {
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
  handleGroupMessage
}
