const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(403).end();
        return;
    }
    const token = auth.split(' ').pop();
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        res.status(403).end();
    }
};
