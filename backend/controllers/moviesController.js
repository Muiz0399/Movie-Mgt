const axios = require('axios');

const searchMovies = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: 'Query parameter is required' });

        const response = await axios.get(process.env.ITUNES_API_URL, {
            params: {
                term: query,
                media: 'movie',
                limit: 20,
            },
        });

        const movies = response.data.results.map((movie) => ({
            id: movie.trackId,
            title: movie.trackName,
            poster: movie.artworkUrl100,
            description: movie.longDescription || 'No description available.',
            releaseDate: movie.releaseDate,
            genre: movie.primaryGenreName,
            videoUrl: movie.previewUrl || '',
        }));

        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching movies', error: err.message });
    }
};

module.exports = { searchMovies };
