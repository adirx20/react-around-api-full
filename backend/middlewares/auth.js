const jwt = require('jsonwebtoken');

// =====>
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(`Bearer `)) {
    return res
      .status(401)
      .send({ message: 'Authorization required!' });
  } else {
    const token = authorization.replace(`Bearer `, '');
    let payload;

    try {
      payload = jwt.verify(token, 'not-very-secret-key');
    } catch (err) {
      return res
        .status(401)
        .send({ message: 'Authorization required' });
    }

    req.user = payload;

    next();
  }
};

module.exports = {
  auth,
};