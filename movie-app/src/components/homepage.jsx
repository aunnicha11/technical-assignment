import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAllMovies, searchMovies, getGenres } from '../api';
import MovieList from '../components/movie-list';
import SearchBar from '../components/searchbar';
import Categories from '../components/categories';
import Footer from '../components/footer';
import Modal from '../components/modal';

const HomePage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ genres: [], dateRange: null });
    const [genres, setGenres] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            const fetchedGenres = await getGenres();
            setGenres(fetchedGenres);
        };

        fetchGenres();
    }, []);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        let fetchedData;
        
        try {
            if (searchTerm) {
                fetchedData = await searchMovies(searchTerm, page);
            } else {
                fetchedData = await getAllMovies(page);
            }
            
            // Apply filters
            const filteredMovies = fetchedData.results.filter(movie => {
                const genreMatch = filters.genres.length === 0 || 
                    movie.genres.some(genre => filters.genres.includes(genre));
                const dateMatch = !filters.dateRange || 
                    (movie.release_date >= filters.dateRange[0] && 
                     movie.release_date <= filters.dateRange[1]);
                return genreMatch && dateMatch;
            });

            setMovies(filteredMovies);
            setTotalPages(fetchedData.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setError('Failed to fetch movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm, filters]);

    useEffect(() => {
        if (genres.length > 0) {
            fetchMovies();
        }
    }, [fetchMovies, genres]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleSearch = async (term) => {
        setSearchTerm(term);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
        setPage(1);
    }, []);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <header className="bg-gray-800 text-white shadow-lg">
                <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition duration-300">Movie Mingle</Link>
                    <ul className="flex space-x-6 items-center">
                        <li><Link to="/" className="text-lg hover:text-indigo-400 transition duration-300">Home</Link></li>
                        <li><Link to="/favorites-list" className="text-lg hover:text-indigo-400 transition duration-300">Favorites</Link></li>
                        {user ? (
                            <>
                                <li><span className="text-gray-300">Welcome, {user.email}</span></li>
                                <li><button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition duration-300">Login</Link></li>
                                <li><Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300">Register</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>

            <main className="flex-grow container mx-auto px-4 py-12">
                <h1 className="text-5xl font-bold text-center mb-12 text-white">Welcome to Movie Mingle</h1>
                <div className="max-w-2xl mx-auto mb-12">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4 py-24">
                        <Categories 
                            onFilterChange={handleFilterChange} 
                            genres={genres} // Pass genres to Categories if needed
                        />
                    </div>
                    <div className="md:w-3/4">
                    {loading ? (
                        <p className="text-center text-white">Loading movies...</p>
                    ) : (
                        <MovieList 
                            movies={movies} 
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            openModal={openModal}
                        />
                        )}
                    </div>
                </div>
            </main>

            <Footer />

            {selectedMovie && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col">
                    {/* Poster */}
                    <div className="w-full mb-6">
                    <div className="relative pb-[150%] overflow-hidden rounded-lg shadow-lg">
                        <img 
                        src={selectedMovie.poster_path} 
                        alt={selectedMovie.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    </div>

                    {/* Movie Details */}
                    <div className="w-full">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedMovie.title}</h2>
                    
                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedMovie.genres.map((genre, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                            {genre}
                        </span>
                        ))}
                    </div>

                    {/* Release Date */}
                    <p className="text-sm mb-4 text-gray-600">
                        <span className="font-semibold">Release Date:</span> {new Date(selectedMovie.release_date).toLocaleDateString()}
                    </p>

                    {/* Overview */}
                    <p className="text-gray-700 mb-6 leading-relaxed">{selectedMovie.overview}</p>

                    {/* Action Buttons */}
                    {/* <div className="flex flex-wrap gap-4">
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                        Watch Trailer
                        </button>
                        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300">
                        Add to Watchlist
                        </button>
                    </div> */}
                    </div>
                </div>
                </Modal>
            )}

        </div>
    );
};

export default HomePage;