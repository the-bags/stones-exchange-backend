const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
 res.send('This is stones-exchange api-server. I\'m up and running!');
 res.end();
});

module.exports = router;