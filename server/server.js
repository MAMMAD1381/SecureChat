const dotenv = require('dotenv')
const connectDB = require('./src/utils/connectDB')
const initializeExpressServer = require('./servers/expressServer')
const initializeSocketServer = require('./servers/socketServer')

dotenv.config()
connectDB()

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []

const expressApp = initializeExpressServer(allowedOrigins)
const socketServer = initializeSocketServer(expressApp, allowedOrigins)

const SOCKET_PORT = process.env.SOCKET_PORT || 4000
socketServer.listen(SOCKET_PORT, () => {
  console.log(`Socket server is running on port ${SOCKET_PORT}`)
})

const EXPRESS_PORT = process.env.EXPRESS_PORT || 5000
expressApp.listen(EXPRESS_PORT, () => {
  console.log(`Express server running on port ${EXPRESS_PORT}`)
})
