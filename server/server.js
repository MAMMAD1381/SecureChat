const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/utils/connectDB');
const errorHandler = require('./src/utils/errorHandler')

dotenv.config();

const app = express();
app.use(express.json());

connectDB()

app.use('/api/users', userRoutes);

// add error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
