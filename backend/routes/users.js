const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login
} = require('../controllers/users');


router.post('/signin', login);
router.post('/signup', createUser);

router.get('/', getUsers);
router.get('/:user_id', getUserById);
router.post('/', createUser);
router.patch('/me', auth, updateProfile);
router.patch('/me/avatar', auth, updateProfileAvatar);

module.exports = router;