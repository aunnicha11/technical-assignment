import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MovieThumbnail = ({ movie, openModal, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-thumbnail bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full">
      <div className="relative pb-[150%] overflow-hidden">
        <img 
          src={movie.poster_path} 
          alt={movie.title} 
          className="absolute inset-0 w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={handleClick}
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{movie.title}</h3>
          {/* <p className="text-sm text-gray-400 mb-1 line-clamp-1">{movie.genres.join(', ')}</p> */}
          <p className="text-sm text-gray-500">{new Date(movie.release_date).getFullYear()}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-300"
            onClick={() => openModal(movie)}
          >
            Read More
          </button>
          {isAuthenticated() && (
            <button
              className={`${
                isFavorite
                  ? 'text-red-500 hover:text-red-400'
                  : 'text-gray-400 hover:text-gray-300'
              } transition duration-300`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieThumbnail;