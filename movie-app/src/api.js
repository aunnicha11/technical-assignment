import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update this to your backend URL

// Helper function to get the auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper function to set up axios with auth header
const axiosAuth = () => {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getGenres = async () => {
  try {
    const response = await axiosAuth().get('/movies/genres');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const getAllMovies = async (page = 1) => {
  try {
    const response = await axiosAuth().get('/movies/popular', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { results: [], total_pages: 0, total_results: 0 };
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axiosAuth().get('/movies/search', { params: { query, page } });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0, total_results: 0 };
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axiosAuth().get(`/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Add functions for user authentication
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Add functions for managing favorites
export const getFavorites = async () => {
  try {
    const response = await axiosAuth().get('/users/favorites');
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};

export const addToFavorites = async (movieId) => {
  try {
    await axiosAuth().post('/users/favorites', { movieId });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (movieId) => {
  try {
    await axiosAuth().delete(`/users/favorites/${movieId}`);
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};