const express = require('express');

const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../middlewares/validateURL');
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
  getCurrentUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex(),
    }),
  }),
  getUserById,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateProfileAvatar,
);

module.exports = router;