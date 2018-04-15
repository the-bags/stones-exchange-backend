const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

const dbUrl = 'mongodb://backend:stonespassword01@ds115579.mlab.com:15579/stones-exchange';

router.get('/', (req, res) => {
  res.send('Try sending some data with POST');
  res.end();
});

router.post('/', async (req, res) => {
  // TODO add data validation
  console.log(req.body);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  user.password = await user.encryptPassword(req.body.password);
  try {
    await mongoose.connect(dbUrl);
    console.log('connected to DB');
    const newUser = await user.save();
    console.log('added: ', newUser);
    res.send({
      message: 'Congratulations, you added new user!',
      data: newUser
    });
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;