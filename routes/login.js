const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

router.get('/', (req, res, next) => {
  res.sendStatus('Try sending some data with POST');
  res.end();
});

router.post('/', (req,res, next) => {
  console.log(req.body);

  // TODO check if user can login
  res.sendStatus(200);
  res.end();
});

module.exports = router;