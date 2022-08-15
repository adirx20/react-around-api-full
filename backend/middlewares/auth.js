const jwt = require('jsonwebtoken');
const { AppError } = require('../errors/AppError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// =====>
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  console.log(authorization);

  if (!authorization || !authorization.startsWith(`Bearer `)) {
    console.log('here', authorization);
    throw new AppError(401, 'Authorization required!');
    // return res.status(401).send({ message: 'Authorization required!' });
  } else {
    const token = authorization.replace(`Bearer `, '');
    let payload;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-string',
      );

      if (!payload) {
        throw new AppError(401, 'Authorization requireda!');
      }
    } catch (err) {
      next(err);
    }
    req.user = payload;

    next();
    return req.user;
  }
};
// <=====

module.exports = {
  auth,
};
