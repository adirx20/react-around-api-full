const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, createCard);
router.delete('/:card_id', auth, deleteCard);
router.put('/:card_id/likes', auth, likeCard);
router.delete('/:card_id/likes', auth, dislikeCard);

module.exports = router;