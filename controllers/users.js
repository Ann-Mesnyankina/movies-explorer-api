const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'mesto-secret-key' } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-err');
const ConflictStatus = require('../errors/conflict-err');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(error);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictStatus('Этот email уже зарегестрирован'));
      } else if (error instanceof mongoose.Error.ValidationError) {
        next(new CastError('Переданы неверные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, email: req.body.email }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new CastError('Передан неверный ID'));
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch((error) => next(error));
};
