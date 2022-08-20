const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { centralErrorHandler } = require('./middlewares/centralErrorHandler');
const { AppError } = require('./errors/AppError');

require('dotenv').config();

const { PORT = 3001 } = process.env;

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestLogger);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/', (req, res) => {
  throw new AppError(404, 'Requested resource was not found');
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  centralErrorHandler(err, res);
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
