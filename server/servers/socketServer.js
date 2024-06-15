const http = require('http');
const socketIo = require('socket.io');
const socketRoutes = require('../src/routes/socketRoutes')


function initializeSocketServer(expressApp, allowedOrigins) {
  const server = http.createServer(expressApp);

  const io = socketIo(server, {
    cors: {
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
      credentials: true, // Allow cookies to be sent
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow the headers you need
      exposedHeaders: ['Content-Type', 'Authorization'] // Expose the headers you need
    }
  });

  io.on('connection', (socket) => {
    socketRoutes(socket, io)
  });

  return server;
}

module.exports = initializeSocketServer;
