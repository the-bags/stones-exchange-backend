const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req);
    const auth = req.headers.authorization;
    if (!auth) res.status(403).end();
    const token = auth.split(' ').pop();
    try {
        jwt.verify(token, 'nothingToLookAt');
        next();
    }
    catch (err) {
        res.status(403).end();
    }
};