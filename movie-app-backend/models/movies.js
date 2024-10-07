const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  posterPath: String,
  backdropPath: String,
  genres: [String],
  overview: String,
  releaseDate: Date,
});

module.exports = mongoose.model('Movie', movieSchema);