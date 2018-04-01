const express = require('express');
const Users = require('../models/Users')
const router = express.Router();

router.get('/', (req, res, next) => {

  // TODO get userlist from DB
  return Users.find({})
    .then((userList) => {
      res.send(userList);
      return next();
    })
    .catch((err) => {
      res.send({
        message: 'Error DB',
        error: err
      });
      return next();
  });
  res.end();
});

router.get('/:id', (req, res, next) => {

  // TODO get user from DB
  return Users.findById(req.params.id)
  .then((user) => {
    res.send(user);
    return next();
  })
  .catch((err) => {
    res.send({
      message: 'Error DB',
      error: err
    });
    return next();
  });
  res.end();
});

module.exports = router;