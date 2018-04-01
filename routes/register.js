const express = require('express');
const User = require('../models/Users')
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Try sending some data with POST');
  res.end();
});

router.post('/', (req,res, next) => {
  // TODO send userdata to DB
  var user = new User();
  console.log(req.body);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  return user.save((err)=> {
    if (err)
      res.send({
        message: 'Error DB',
        error: err
      });
    res.send({
      message: 'Congratulations, you added new user!',
      data: user
    });
    return next();
  });
  //res.sendStatus(200);
  res.end();
});

module.exports = router;