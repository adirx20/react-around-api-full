const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;

  try {
    const owner = req.user._id;

    const newCard = await Card.create({ name, link, owner });
    res.status(201).send(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid input' });
    } else {
      res.status(500).send({ message: 'Something is not working...' });
    }
  }
};

const deleteCard = async (req, res) => {
  const cardId = req.params.card_id;

  try {
    const card = await Card.findOneAndRemove({ _id: cardId });

    if (!card) {
      res.status(404).send({ message: 'Card not found' });
    } else {
      res.status(200).send({ message: `${cardId} - This card has been deleted successfully` });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid input' });
    } else {
      res.status(500).send({ message: 'Something is not working...' });
    }
  }
};

const likeCard = async (req, res) => {
  const cardId = req.params.card_id;

  try {
    const card = await Card.findOneAndUpdate(
      { _id: cardId },
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (card === null) {
      res.status(404).send({ message: 'Card ID not found' });
    } else {
      res.status(200).send({ message: 'Card is liked' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid input' });
    } else {
      res.status(500).send({ message: 'Something is not working...' });
    }
  }
};

const dislikeCard = async (req, res) => {
  const cardId = req.params.card_id;

  try {
    const card = await Card.findOneAndUpdate(
      { _id: cardId },
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      res.status(404).send({ message: 'Card ID not found' });
    } else {
      res.status(200).send({ message: 'Card is not liked' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid input' });
    } else {
      res.status(500).send({ message: 'Something is not working...' });
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};