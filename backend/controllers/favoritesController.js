const Favorite = require('../models/favoriteModel');

const addFavorite = async (req, res) => {
  const { movieId, movieTitle, moviePoster } = req.body;
  const userId = req.user.id;

  try {
    const favorite = new Favorite({
      user: userId,
      movieId,
      movieTitle,
      moviePoster,
    });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Error adding favorite' });
  }
};

const removeFavorite = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id;

  try {
    const favorite = await Favorite.findOne({ user: userId, movieId });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    // If found, delete it
    await Favorite.findOneAndDelete({ user: userId, movieId });

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Error removing favorite' });
  }
};




const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await Favorite.find({ user: userId });
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
