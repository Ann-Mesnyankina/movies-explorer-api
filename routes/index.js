const router = require('express').Router();
const auth = require('../middlewares/auth');

const { login } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { loginValidation, signupValidation } = require('../middlewares/validation');

const NotFoundError = require('../errors/not-found-err');

router.post('/signin', loginValidation, login);
router.post('/signup', signupValidation, createUser);

router.use(auth);
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
