const CustomError = require('../utils/CustomError')
const {jwtDecoder} = require('../utils/jwt')

async function handlePrivateMessage(socket, io, data, ack) {
  // const token = socket.handshake.auth.token
  // console.log('token', token)
  // if (!token) return

  // const decodedUser = await jwtDecoder(token)

  // if (!io.users) io.users = []
  // if(io.users.includes(decodedUser.username)) return

  // io.users.push(decodedUser.username)
  console.log(data)
  console.log(`new Message from ${data.user.username}. to ${data.target.username}`)
  // io.to()
  console.log(io.users[data.target.username].id)
  io.users[data.target.username].emit('privateMessage', data)
  // ack(`ack: ${decodedUser.username} registered`)
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
}
