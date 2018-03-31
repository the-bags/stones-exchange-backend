const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

  // TODO get userlist from DB
  const userList = [{name: 'user', email: 'user@test.com'}, {name: 'admin', email: 'admin@test.com'}];
  res.send(userList);
  res.end();
});

router.get('/:id', (req, res, next) => {

  // TODO get user from DB
  const user = {name: 'user', email: 'user@test.com'};
  res.send(user);
  res.end();
});

module.exports = router;