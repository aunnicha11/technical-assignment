const express = require('express');
const User = require('../models/users');
const Movie = require('../models/movies');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

router.post('/favorites', auth, async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.user.userId);
    if (user.favorites.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }
    user.favorites.push(movieId);
    await user.save();
    res.status(201).json({ message: 'Movie added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie to favorites' });
  }
});

router.delete('/favorites/:movieId', auth, async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = await User.findById(req.user.userId);
    user.favorites = user.favorites.filter(id => id.toString() !== movieId);
    await user.save();
    res.json({ message: 'Movie removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing movie from favorites' });
  }
});

module.exports = router;