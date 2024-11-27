import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MovieList from '../components/Movies/MovieList';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('action');
  const [page, setPage] = useState(1);
  const { favorites, toggleFavorite, user } = useAuth();

  const MOVIES_PER_PAGE = 10;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${searchTerm}&media=movie&limit=${MOVIES_PER_PAGE}&offset=${(page - 1) * MOVIES_PER_PAGE}`
        );
        const data = await response.json();
        console.log('Fetched Movies:', data);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies from iTunes API:', error);
      }
    };
    fetchMovies();
  }, [searchTerm, page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Movies Hub</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />
      </div>

      {/* Movies List */}
      <div className="movie-list-container">
        {movies.length > 0 ? (
          <MovieList
            movies={movies}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            isLoggedIn={!!user}
          />
        ) : (
          <p>No movies found. Try another search term.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-number">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={movies.length < MOVIES_PER_PAGE}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
