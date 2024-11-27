const express = require('express');
const { searchMovies } = require('../controllers/moviesController');
const router = express.Router();

router.get('/search', searchMovies);

module.exports = router;
