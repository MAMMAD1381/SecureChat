const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('../src/routes/userRoutes')
const errorHandler = require('../src/utils/errorHandler')

function initializeExpressServer(allowedOrigins) {
  const app = express()

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
      credentials: true, // Allow cookies to be sent
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow the headers you need
      exposedHeaders: ['Content-Type', 'Authorization'], // Expose the headers you need
    })
  )

  app.use(bodyParser.json())
  app.use(express.json())

  app.use('/api/users', userRoutes)

  // add error handler
  app.use(errorHandler)

  return app
}

module.exports = initializeExpressServer
