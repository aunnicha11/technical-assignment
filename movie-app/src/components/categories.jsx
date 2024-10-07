import React, { useState, useEffect } from 'react';

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", 
  "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", 
  "Science", "Science Fiction", "TV Movie", "Thriller", "War", "Western"
];

const Categories = ({ onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [allDates, setAllDates] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handle genre button click
  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // Handle the date range change for both start and end dates
  const handleDateChange = (type, date) => {
    if (type === 'start') setStartDate(date);
    else setEndDate(date);
    setAllDates(false);
  };

  // Handle "All release dates" checkbox toggle
  const handleAllDatesChange = (e) => {
    setAllDates(e.target.checked);
    if (e.target.checked) {
      setStartDate('');
      setEndDate('');
    }
  };

  useEffect(() => {
    onFilterChange({ genres: selectedGenres, allDates, startDate, endDate });
  }, [selectedGenres, allDates, startDate, endDate, onFilterChange]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
      
      {/* Genres Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-white">Genres</h3>
        <div className="flex flex-wrap gap-3">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`${
                selectedGenres.includes(genre)
                  ? 'bg-indigo-600'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              } text-white text-sm/[14px] px-3 py-2 rounded-full transition duration-300 whitespace-nowrap`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      
      {/* Release Date Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">Release Date</h3>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="allDates"
            checked={allDates}
            onChange={handleAllDatesChange}
            className="mr-2"
          />
          <label htmlFor="allDates" className="text-white">All release dates</label>
        </div>
        {/* {!allDates && ( */}
          <div className="flex flex-col gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>
            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                min={startDate || undefined}  // Make sure end date is not before start date
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Categories;
