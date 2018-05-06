const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

require('dotenv').config();

router.post('/', async (req, res) => {
  // TODO add data validation
  console.log(req.body);
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = await user.encryptPassword(req.body.password);
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('connected to DB');
    const newUser = await user.save();
    console.log('added: ', newUser);
    res.end();
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;