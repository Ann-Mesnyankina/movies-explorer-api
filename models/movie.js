const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" нужно заполнить'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" нужно заполнить'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" нужно заполнить'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" нужно заполнить'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" нужно заполнить'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" нужно заполнить'],
    validate: {
      validator: (v) => isURL(v),
      message: 'Неверный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" нужно заполнить'],
    validate: {
      validator: (v) => isURL(v),
      message: 'Неверный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" нужно заполнить'],
    validate: {
      validator: (v) => isURL(v),
      message: 'Неверный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "owner" нужно заполнить'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" нужно заполнить'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" нужно заполнить'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" нужно заполнить'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
