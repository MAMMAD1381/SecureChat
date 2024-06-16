// src/routes/socketRoutes.js
const {handlePrivateMessage, handleDisconnect, handleGroupMessage} = require('../controllers/socketController')
const socketAuth = require('../middlewares/socketAuth')

const socketRouter = function(socket, io) {

  io.use(socketAuth(io))
  
  socket.on('privateMessage', async (data, ack) => {
    handlePrivateMessage(socket, io, data, ack);
  });

  socket.on('groupMessage', async (data, ack) => {
    handleGroupMessage(socket, io, data, ack);
  });

  socket.on('disconnect', async () => {
    handleDisconnect(socket, io);
  });


};
module.exports = socketRouter
