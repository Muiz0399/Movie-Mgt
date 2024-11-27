import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './MovieDetails.css';

const MovieDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const movie = state?.movie; // Get movie details from location.state
  const movieTitle = movie?.trackName || 'No Title Available';
  const movieDescription = movie?.longDescription || 'No description available.';
  const videoUrl = movie?.previewUrl; // Assuming previewUrl contains the video URL
  const director = movie?.collectionCensoredName || 'No Director Available';
  const cast = movie?.artistName || 'No Cast Available';
  const price = movie?.collectionPrice ? `$${movie.collectionPrice}` : 'No Price Available';
  const genre = movie?.primaryGenreName || 'No Genre Available';
  const releaseDate = movie?.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : 'No Release Date Available';

  return (
    movie ? (
      <div className="movie-details-container">
        {/* Movie Video Section */}
        <div className="movie-video-container">
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              height="400px"
              className="movie-video"
            />
          ) : (
            <p>Video not available.</p>
          )}
        </div>

        {/* Movie Header Section */}
        <div className="movie-header">
          <div className="movie-header-a">
            <h1 className="movie-title">{movieTitle}</h1>
            <p className="movie-description">{movieDescription}</p>
            <div className="movie-details-info">
          <h3>Additional Information</h3>
          <ul>
            <li><strong>Director:</strong> {director}</li>
            <li><strong>Cast:</strong> {cast}</li>
            <li><strong>Genre:</strong> {genre}</li>
            <li><strong>Release Date:</strong> {releaseDate}</li>
            <li><strong>Price:</strong> {price}</li>
          </ul>
        </div>
          </div>
          <div className="movie-header-b">

            <img
              className="movie-poster"
              src={movie.artworkUrl100 || '/placeholder-poster.png'}
              alt={movieTitle}
            />
          </div>
        </div>


        
      </div>
    ) : (
      <p>Movie not found. Please try again.</p>
    )
  );
};

export default MovieDetails;
