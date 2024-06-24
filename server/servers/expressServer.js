const express = require('express')
const cors = require('cors')

// routes
const userRoutes = require('../src/routes/userRoutes')
const groupRoutes = require('../src/routes/groupRoutes')
const adminRoutes = require('../src/routes/adminRoutes')

// server middlewares
const errorHandler = require('../src/utils/errorHandler')
const bodyParser = require('body-parser')

function initializeExpressServer(allowedOrigins) {
  const app = express()

  // add Cors policy
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  // add middlewares
  app.use(bodyParser.json())
  app.use(express.json())

  // add routes
  app.use('/api/user', userRoutes)
  app.use('/api/group', groupRoutes)
  app.use('/api/admin', adminRoutes)

  // add error handler
  app.use(errorHandler)

  return app
}

module.exports = initializeExpressServer
