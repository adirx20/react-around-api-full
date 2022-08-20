const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AppError } = require('../errors/AppError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
});

// Find user by credentials function, bcrypt compre =====>
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AppError(401, 'Wrong email / password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AppError(401, 'Wrong email / password'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);