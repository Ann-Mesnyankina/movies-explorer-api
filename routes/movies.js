const router = require('express').Router();
const {
  getAllMovies, deleteMovieById, createMovie,
} = require('../controllers/movies');
const { deleteMovieValidation, createMovieValidation } = require('../middlewares/validation');

router.get('/', getAllMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:movieId', deleteMovieValidation, deleteMovieById);

module.exports = router;
