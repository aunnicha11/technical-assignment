import React from 'react';

const Pagination = ({ moviesPerPage, totalMovies, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-8" aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 border border-gray-300 text-sm font-medium
                ${number === currentPage
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }
                ${number === 1 ? 'rounded-l-md' : ''}
                ${number === pageNumbers.length ? 'rounded-r-md' : ''}
                focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-300 ease-in-out`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;