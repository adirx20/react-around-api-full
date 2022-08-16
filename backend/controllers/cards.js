const Card = require('../models/card');
const { AppError } = require('../errors/AppError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.status(200).send(cards);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  console.log('this is data of create card: ', name, link);

  try {
    const owner = req.user._id;

    const newCard = await Card.create({ name, link, owner });
    res.status(201).send(newCard);
  } catch (error) {
    console.log('this is error: ', error);
    res.send({ message: `this is the error that I send: ${error}` });
    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  const cardId = req.params.card_id;

  try {
    const card = await Card.findOneAndRemove({ _id: cardId });

    if (!card) {
      throw new AppError(404, 'Card ID not found');
    } else {
      res.status(200).send({ message: `${cardId} - This card has been deleted successfully` });
    }
  } catch (error) {
    next(error);
  }
};

const likeCard = async (req, res, next) => {
  const cardId = req.params.card_id;
  console.log('this is card id', cardId)

  try {
    const card = await Card.findOneAndUpdate(
      { _id: cardId },
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (card === null) {
      throw new AppError(404, 'Card ID not found');
    } else {
      res.status(200).send({ message: 'Card is liked' });
    }
  } catch (error) {
    next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  const cardId = req.params.card_id;

  try {
    const card = await Card.findOneAndUpdate(
      { _id: cardId },
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      throw new AppError(404, 'Card ID not found');
    } else {
      res.status(200).send({ message: 'Card is not liked' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};