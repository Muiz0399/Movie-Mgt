const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	movieId: { type: String, required: true }, 
	movieTitle: { type: String, required: true },
	moviePoster: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
