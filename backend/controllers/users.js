const e = require('express');
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

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(201).send(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid input' });
    } else {
      res.status(500).send({ message: 'Something is not working...' });
    }
  }
};

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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
};