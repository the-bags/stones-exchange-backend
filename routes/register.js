const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Try sending some data with POST');
  res.end();
});

router.post('/', (req,res, next) => {
  console.log(req.body);

  // TODO send userdata to DB
  res.sendStatus(200);
  res.end();
});

module.exports = router;