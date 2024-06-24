// utils
const dotenv = require('dotenv')
const connectDB = require('./src/utils/connectDB')
const logger = require('./src/utils/logger')

// servers
const initializeExpressServer = require('./servers/expressServer')
const initializeSocketServer = require('./servers/socketServer')

dotenv.config()
connectDB()

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []

const expressApp = initializeExpressServer(allowedOrigins)
const socketServer = initializeSocketServer(expressApp, allowedOrigins)

const SOCKET_PORT = process.env.SOCKET_PORT || 4000
socketServer.listen(SOCKET_PORT, () => {
  logger.info(`Socket server is running on port ${SOCKET_PORT}`)
})

const EXPRESS_PORT = process.env.EXPRESS_PORT || 5000
expressApp.listen(EXPRESS_PORT, () => {
  logger.info(`Express server running on port ${EXPRESS_PORT}`)
})
