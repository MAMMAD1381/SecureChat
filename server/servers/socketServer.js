const http = require('http');
const socketIo = require('socket.io');
const socketRoutes = require('../src/routes/socketRoutes')


function initializeSocketServer(expressApp, allowedOrigins) {
  const server = http.createServer(expressApp);

  // add cors policies
  const io = socketIo(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Type', 'Authorization']
    }
  });

  io.on('connection', (socket) => {
    socketRoutes(socket, io)
  });

  return server;
}

module.exports = initializeSocketServer;
