import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './MovieCard.css';

const MovieCard = ({ movie, isFavorite }) => {
  const navigate = useNavigate();
  const { toggleFavorite, user } = useAuth();

  const handleCardClick = () => {
    navigate(`/movie/${movie.trackId}`, { state: { movie } });a
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    if (!user) {
      alert('Login first to add favorites!');
      console.log('User not logged in');
      return;
    }
    console.log('User is logged in, toggling favorite:', movie);
    toggleFavorite(movie); 
  };

  return (
    <div className="movie-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={movie.artworkUrl100} alt={movie.trackName} className="movie-poster" />
      <h3 className="movie-title-c">{movie.trackName}</h3>
      <p className="movie-description md">{movie.shortDescription || 'No description available'}</p>
      <FaHeart
        className={`favorite-icon ${isFavorite ? 'favorited' : ''}`}
        onClick={handleFavoriteClick}
      />
    </div>
  );
};

export default MovieCard;
