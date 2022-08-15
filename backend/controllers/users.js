/* eslint-disable indent */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AppError } = require('../errors/AppError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
    // res.status(500).send({ message: 'Something is not working...' });
  }
};

const getCurrentUser = (req, res) => {
  // ? How do I know who the current user is?
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: 'No user found with that id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid ID' });
      } else {
        res.status(500).send({ message: 'Server Error' });
      }
    });
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });

    if (!user) {
      throw new AppError(404, 'User ID not found');
      // res.status(404).send({ message: 'User ID not found' });
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
    // if (error.name === 'CastError') {
    //   res.status(400).send({ message: 'Invalid input' });
    // } else {
    //   res.status(500).send({ message: 'Something is not working...' });
    // }
  }
};

// NEW CREATE USER FUNCTION
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => next(err));
};
// catch previous handler ^
// res.status(401).send({ message: 'Something is not working...' })
// next(err);

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-string',
        { expiresIn: '7d' },
      );

      res.status(200).send({ user, token, message: 'successful' }); // need to edit the message
    })
    .catch((err) => {
      console.log('login error: ', err);
      next(err);
    });
};
// catch previous handler ^
// res.status(401).send({ message: err.message });

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new AppError(404, 'User ID not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    next(error);
    // if (error.name === 'ValidationError') {
    //   res.status(400).send({ message: 'Invalid input' });
    // } else {
    //   res.status(500).send({ message: 'Something is not working...' });
    // }
  }
};

const updateProfileAvatar = async (req, res, next) => {
  const { avatar } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new AppError(404, 'User ID not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    next(error);
    // if (error.name === 'ValidationError') {
    //   res.status(400).send({ message: 'Invalid input' });
    // } else {
    //   res.status(500).send({ message: 'Something is not working...' });
    // }
  }
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
};
