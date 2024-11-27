import React from 'react';
import { useAuth } from '../../context/AuthContext';
import MovieCard from '../Movies/MovieCard';
import "./MovieList.css"

const MovieList = ({ movies }) => {
  const { favorites } = useAuth(); 

  return (
    <div className="movie-lists-container">
      {movies.map((movie) => (
        <MovieCard
          key={movie.trackId}
          movie={movie}
          isFavorite={favorites.some((fav) => fav.trackId === movie.trackId)}
        />
      ))}
    </div>
  );
};

export default MovieList;
