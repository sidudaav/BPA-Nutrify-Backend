require('dotenv').config();
const express = require('express');

const app = express();

// Set up Morgan logger
const logger = require('morgan');
app.use(logger('dev'));

// Set up CORS
const cors = require('cors');

// Allow server to parse data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initalize MongoDB
const initializeDB = require('./config/db.config');
const db = initializeDB();

// Set API routes
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const mealsRouter = require('./routes/meals.routes');
const foodsRouter = require('./routes/foods.routes');

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/meals', mealsRouter);
app.use('/api/foods', foodsRouter);

// Run server on port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
