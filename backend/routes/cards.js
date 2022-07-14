const express = require('express');

const router = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:card_id', deleteCard);
router.put('/:card_id/likes', likeCard);
router.delete('/:card_id/likes', dislikeCard);

module.exports = router;