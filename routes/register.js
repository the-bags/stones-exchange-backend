const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

require('dotenv').config();

function stones() {
  let stones = [];
  for (let i=0; i<7; i++) {
    let r = 255 * Math.random() | 0;
    let g = 255 * Math.random() | 0;
    let b = 255 * Math.random() | 0;
    let color = 'rgb(' + r + ',' + g + ',' + b + ')';
    stones.push({
      name: 'Unknown',
      color: color
    })
  }
  return stones;
}

router.post('/', async (req, res) => {
  // TODO add data validation
  console.log(req.body);
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = await user.encryptPassword(req.body.password);
  user.stones = stones();

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('connected to DB');
    const newUser = await user.save();
    console.log('added: ', newUser);
    res.json({
      user: {
        name: newUser.name,
        email: newUser.email,
        stones: newUser.stones
      }
  })
    mongoose.connection.close();
  } catch (err) {
    // res.apiError(err);
    console.log(err);
  }
});

module.exports = router;