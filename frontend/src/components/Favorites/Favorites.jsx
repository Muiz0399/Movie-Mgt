// import { useAuth } from '../../context/AuthContext';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';
// import './Favorites.css';

// const Favorites = () => {
//   const { favorites, setFavorites, user } = useAuth();
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (user) {
//         console.log('User token:', user);
//         try {
//           const response = await axios.get('/favorites', {
//             headers: { Authorization: `Bearer ${user}` },
//           });
//           console.log('API Response:', response);
//           setFavorites(Array.isArray(response.data) ? response.data : []); 
//           console.log('Fetched data:', response.data);
//         } catch (err) {
//           console.error('Error fetching favorites:', err);
//           setFavorites([]); 
//         }
//       }
//     };

//     if (user) {
//       fetchFavorites();
//     }
//   }, [user, setFavorites]);

 
//   const handleMovieClick = (movie) => {
//     navigate(`/movie/${movie.movieId}`, { state: { movie } }); 
//   };

//   return (
//     <div className="favorites-container">
//       <h2>My Favorite Movies</h2>
//       {Array.isArray(favorites) && favorites.length > 0 ? (
//         <div className="movie-list">
//           {favorites.map((movie) => (
//             <div
//               key={movie.movieId}
//               className="movie-card"
//               onClick={() => handleMovieClick(movie)} 
//             >
//               <img
//                 src={movie.moviePoster || '/placeholder-poster.png'}
//                 alt={movie.movieTitle}
//                 className="movie-image"
//               />
//               <div className="movie-info">
//                 <h3 className="movie-title">{movie.movieTitle}</h3>
//                 <p className="movie-kind">Type: {movie.kind || 'N/A'}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No favorites yet. Add some movies!</p>
//       )}
//     </div>
//   );
// };

// export default Favorites;
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './Favorites.css';

const Favorites = () => {
  const { favorites, setFavorites, user, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await axios.get('/favorites', {
            headers: { Authorization: `Bearer ${user}` },
          });
          setFavorites(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          console.error('Error fetching favorites:', err);
          setFavorites([]);
        }
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user, setFavorites]);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.movieId}`, { state: { movie } });
  };

  const handleDeleteClick = (e, movie) => {
    e.stopPropagation(); 
    toggleFavorite(movie); 
  };

  return (
    <div className="favorites-container">
      <h2>My Favorite Movies</h2>
      {Array.isArray(favorites) && favorites.length > 0 ? (
        <div className="movie-list">
          {favorites.map((movie) => (
            <div
              key={movie.movieId}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={movie.moviePoster || '/placeholder-poster.png'}
                alt={movie.movieTitle}
                className="movie-image"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.movieTitle}</h3>
                <p className="movie-kind">Type: {movie.kind || 'N/A'}</p>
                {/* Delete Icon
                <FaTrash
                  className="delete-icon"
                  onClick={(e) => handleDeleteClick(e, movie)}
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                    fontSize: '20px',
                    marginTop: '10px',
                  }}
                /> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites yet. Add some movies!</p>
      )}
    </div>
  );
};

export default Favorites;
