const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const serverless = require('serverless-http');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/favorites', favoritesRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Vercel Serverless Export
module.exports.handler = serverless(app);
