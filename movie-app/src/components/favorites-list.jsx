import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MovieThumbnail from './movie-thumbnail';

function FavoritesList() {
  const { favorites = [], removeFromFavorites, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <button
            onClick={handleBack}
            className="text-indigo-400 hover:text-indigo-300 transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-10 rounded-xl shadow-2xl">
            <h2 className="text-4xl font-bold text-indigo-400 text-center mb-8">Favorites List</h2>
            <p className="text-xl text-gray-300 mb-4 text-center">Please log in to view your favorites movies.</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleRemoveFromFavorites = (movieId) => {
    removeFromFavorites(movieId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <button
          onClick={handleBack}
          className="text-indigo-400 hover:text-indigo-300 transition duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
      </div>
      <div className="flex-grow container mx-auto">
        <h2 className="text-4xl font-bold text-indigo-400 text-center mb-8">Your Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-xl text-gray-300 text-center italic">You haven't added any favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieThumbnail
                key={movie.id}
                movie={movie}
                isFavorite={true}
                toggleFavorite={() => handleRemoveFromFavorites(movie.id)}
                openModal={() => navigate(`/movie/${movie.id}`)}
                isAuthenticated={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesList;