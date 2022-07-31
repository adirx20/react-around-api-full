const e = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AppError } = require('../errors/AppError');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);

  } catch (error) {
    next(error);
    // res.status(500).send({ message: 'Something is not working...' });
  }
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

// const createUser = (req, res) => {
//   const { email, password, name, about, avatar } = req.body;

//   bcrypt.hash(password, 10)
//   .then((hash) => {
//     User.create({
//       email: email,
//       password: hash,
//     })
//   })
//   .then((user) => {
//     res.send(user);
//   })
//   .catch((err) => {
//     res.status(400).send(err);
//   });
// };

// NEW CREATE USER FUNCTION
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
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
  console.log('something');

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'not-so-secret-string'
      );

      console.log('Im alive');
      res.send({ token });
      res.status(200).send(user, { message: 'successful' }); // need to edit the message
    })
    .catch((err) => {console.log(err); next(err);});
};
// catch previous handler ^
// res.status(401).send({ message: err.message });



// ORIGINAL CREATE USER FUNCTION
// const createUser = async (req, res) => {
//   const { email, password, name, about, avatar } = req.body;

//   try {
//     const newUser = await User.create({ name, about, avatar });
//     res.status(201).send(newUser);
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       res.status(400).send({ message: 'Invalid input' });
//     } else {
//       res.status(500).send({ message: 'Something is not working...' });
//     }
//   }
// };

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
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
};