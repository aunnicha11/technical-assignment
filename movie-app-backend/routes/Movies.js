const express = require('express');
const axios = require('axios');
const Movie = require('../models/movies');
const auth = require('../middleware/auth');
const router = express.Router();

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

router.get('/popular', auth, async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_API_BASE_URL}/movie/popular`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular movies' });
  }
});

router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${TMDB_API_BASE_URL}/search/movie`, {
      params: { api_key: process.env.TMDB_API_KEY, query },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error searching movies' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${TMDB_API_BASE_URL}/movie/${id}`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie details' });
  }
});

module.exports = router;