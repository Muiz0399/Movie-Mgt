import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('authToken') || null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const login = (token) => {
    setUser(token);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('authToken');
    localStorage.removeItem('favorites');
  };

  const toggleFavorite = async (movie) => {
    if (!user) {
      alert('Please login to add/remove favorites!');
      return;
    }
  
    // Check if the movie is already in favorites
    const isAlreadyFavorite = favorites.some((fav) => fav.movieId === movie.trackId);
  
    try {
      if (isAlreadyFavorite) {
        // DELETE request to remove the movie from favorites
        await API.delete(`/favorites/${movie.trackId}`, {
          headers: { Authorization: `Bearer ${user}` },
        });
  
        // Remove the movie from local favorites
        const updatedFavorites = favorites.filter((fav) => fav.movieId !== movie.trackId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        console.log(`Movie ${movie.trackId} deleted from favorites.`);
      } else {
        // POST request to add the movie to favorites
        const response = await API.post('/favorites', {
          movieId: movie.trackId,
          movieTitle: movie.trackName,
          moviePoster: movie.artworkUrl100,
        }, {
          headers: { Authorization: `Bearer ${user}` },
        });
  
        // Add the movie to local favorites
        const updatedFavorites = [...favorites, response.data];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        console.log(`Movie ${movie.trackId} added to favorites.`);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
  
  useEffect(() => {
 
    if (user) {
      
      if (favorites.length === 0) {
        API.get('/favorites')
          .then((response) => {
            setFavorites(response.data);
            localStorage.setItem('favorites', JSON.stringify(response.data));
          })
          .catch((error) => console.error('Error fetching favorites:', error));
      }
    }
  }, [user, favorites.length]);

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, setFavorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

















