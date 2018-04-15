const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require('mongoose');

const dbUrl = 'mongodb://backend:stonespassword01@ds115579.mlab.com:15579/stones-exchange';

router.post("/", async (req, res) => {
  try {
    await mongoose.connect(dbUrl);
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      user.verifyPassword(req.body.password, (err, isMatch) => {
        if (err) {
          res.status(500).send('password verification failure');
        } else if (isMatch) {
          res.sendStatus(200);
        } else {
          res.sendStatus(403);
        }
      })
    } else {
      // no user
      res.sendStatus(403);
    }
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;