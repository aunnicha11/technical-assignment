import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieThumbnail from '../components/movie-thumbnail';
import SearchBar from '../components/searchbar';
import Pagination from '../components/pagination';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('/api/movies', {
        params: { searchTerm, page: currentPage }
      });
      setMovies(response.data.movies);
    };
    fetchMovies();
  }, [searchTerm, currentPage]);

  return (
    <div>
      <h2>Home</h2>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieThumbnail key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default HomePage;