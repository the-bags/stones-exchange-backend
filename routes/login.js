const express = require('express');
const User = require('../models/Users')
const router = express.Router();
var bodyParser = require('body-parser');

router.get('/', (req, res, next) => {
  res.sendStatus('Try sending some data with POST');
  res.end();
});

router.post('/', (req,res, next) => {
  console.log(req.body);

  // TODO check if user can login
  return User.findOne({
    name: req.body.name,
    password: req.body.password,
  }, function(err, user) {
    if (err) {
      res.send({
        message: 'Error DB',
        error: err
      });
    }
    if (!user) {
      res.send({
        message: 'Access is denied!',
        data: req.body
      });
    } else {
      res.send({
        message: 'Congratulations. Access is allowed.',
        data: req.body
      });
    }
  });

  //res.sendStatus(200);
  res.end();
});

module.exports = router;