// src/routes/socketRoutes.js
const {handlePrivateMessage, handleDisconnect} = require('../controllers/socketController')
const socketAuth = require('../middlewares/socketAuth')

const socketRouter = function(socket, io) {

  io.use(socketAuth(io))
  
  socket.on('privateMessage', async (data, ack) => {
    console.log('ack', ack)
    handlePrivateMessage(socket, io, data, ack);
  });

  socket.on('disconnect', async () => {
    handleDisconnect(socket, io);
  });


};
module.exports = socketRouter
