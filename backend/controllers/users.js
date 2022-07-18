const e = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Something is not working...' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });

    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    } else {
      res.send(user);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid input' });
    } else {
      res.status(500).send({ message: 'Something is not working...' });
    }
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
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

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

const updateProfile = async (req, res) => {
  const { name, about } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid input' });
    } else {
      res.status(500).send({ message: 'Something is not working...' });
    }
  }
};

const updateProfileAvatar = async (req, res) => {
  const { avatar } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid input' });
    } else {
      res.status(500).send({ message: 'Something is not working...' });
    }
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('login error')) // need to edit the message
      } else {
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error('password error')) // need to edit the message
            } else {
              res.status(200).send({ message: 'successful' }); // need to edit the message
            }
          })
          .catch((err) => {
            res.status(401).send({ message: err.message });
          });
      }
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
};