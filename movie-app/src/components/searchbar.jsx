import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // update the search results as the user types
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto my-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for movies..."
          className="w-full py-3 px-4 pr-12 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

//////////////////////////////////////
// import React, { useState } from 'react';

// const SearchBar = ({ setSearchTerm }) => {
//   const [input, setInput] = useState('');

//   const handleSearch = () => {
//     setSearchTerm(input);
//   };

//   return (
//     <div className="flex justify-center items-center my-4 py-10">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Search movies..."
//         className="w-4/5 py-2 px-6 border-2 rounded-md focus:outline-none focus:border-[#92DCE5] focus:ring-0 active:border-[#2B303A]"
//       />
//       <button
//         onClick={handleSearch}
//         className="ml-2 py-2 px-6 bg-[#92DCE5] text-white rounded-md hover:bg-[#2B303A] focus:outline-none"
//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
