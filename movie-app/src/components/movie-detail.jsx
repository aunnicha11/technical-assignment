import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useContext(AuthContext);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movies/${id}`);
        setMovie(response.data.movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovie();
  }, [id]);

  const isFavorite = movie ? favorites.some(fav => fav.id === movie.id) : false;

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (!movie) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/home')}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        ← Back to Home
      </button>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={movie.poster_path} alt={movie.title} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{movie.genre}</div>
            <h1 className="mt-1 text-4xl font-bold text-white">{movie.title}</h1>
            <p className="mt-2 text-gray-400">Release Year: {new Date(movie.release_date).getFullYear()}</p>
            <p className="mt-4 text-gray-300">{movie.overview}</p>
            <div className="mt-4 flex items-center">
              <span className="text-gray-400 mr-2">Rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <svg
                      key={index}
                      className={`w-5 h-5 fill-current ${
                        ratingValue <= movie.rating ? 'text-yellow-500' : 'text-gray-600'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  );
                })}
              </div>
            </div>
            <button
              onClick={toggleFavorite}
              className={`mt-4 px-4 py-2 rounded-full ${
                isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition duration-300 ease-in-out`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;