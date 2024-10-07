import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MovieThumbnail from './movie-thumbnail';

const MovieList = ({ movies, currentPage, totalPages, onPageChange, openModal }) => {
  const [sortType, setSortType] = useState('title');
  const { favorites = [], addToFavorites, removeFromFavorites } = useContext(AuthContext);

  const isFavorite = (movie) => {
      return favorites.some((fav) => fav.id === movie.id);
  };

  const toggleFavorite = (movie) => {
      if (!isAuthenticated()) {
          alert('Please log in to add movies to your favorites.');
          return;
      }
      if (isFavorite(movie)) {
          removeFromFavorites(movie.id);
      } else {
          addToFavorites(movie);
      }
  };

  const sortedMovies = [...movies].sort((a, b) => {
      if (sortType === 'title') {
          return a.title.localeCompare(b.title);
      } else if (sortType === 'release_date') {
          return new Date(b.release_date) - new Date(a.release_date);
      }
      return 0;
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Movies</h1>
            <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
                <select 
                    id="sort" 
                    value={sortType} 
                    onChange={(e) => setSortType(e.target.value)} 
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="title">Title</option>
                    <option value="release_date">Release Date</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedMovies.map((movie) => (
                <MovieThumbnail
                    key={movie.id}
                    movie={movie}
                    openModal={openModal}
                    isFavorite={isFavorite(movie)}
                    toggleFavorite={() => toggleFavorite(movie)}
                />
            ))}
        </div>

        <div className="mt-8 flex justify-center items-center">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
                Next
            </button>
        </div>

        <div className="mt-4 text-center text-gray-600">
            Page {currentPage} of {totalPages}
        </div>
    </div>
);
};

export default MovieList;