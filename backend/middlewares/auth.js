const jwt = require('jsonwebtoken');

// =====>
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(req.headers);
    console.log(authorization);

    if (!authorization || !authorization.startsWith(`Bearer `)) {
        console.log('here', authorization);
        return res.status(401).send({ message: 'Authorization required!' });
    } else {
        const token = authorization.replace(`Bearer `, '');
        let payload;

        try {
            payload = jwt.verify(token, 'not-very-secret-key');
        } catch (err) {
            console.log(err);
            return res.status(401).send({ message: 'Authorization required' });
        }

        req.user = payload;

        next();
        return req.user;
    }
};

module.exports = {
    auth,
};
