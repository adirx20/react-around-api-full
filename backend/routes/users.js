const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth');

const {
    getUsers,
    getUserById,
    createUser,
    updateProfile,
    updateProfileAvatar,
    login,
    getCurrentUser,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.get('/', getUsers);
router.post('/', createUser);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateProfile);
router.patch('/me/avatar', auth, updateProfileAvatar);
router.get('/:user_id', getUserById);

module.exports = router;
