const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addFavorite);
router.delete('/:movieId', authMiddleware, removeFavorite); 
router.get('/', authMiddleware, getFavorites);

module.exports = router;
