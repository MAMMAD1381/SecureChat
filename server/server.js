const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/utils/connectDB');
const errorHandler = require('./src/utils/errorHandler')
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
// Alternatively, configure CORS options
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
  credentials: true, // Allow cookies to be sent
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow the headers you need
  exposedHeaders: ['Content-Type', 'Authorization'] // Expose the headers you need
}));

app.use(bodyParser.json())

app.use(express.json());

connectDB()

app.use('/api/users', userRoutes);

// add error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
