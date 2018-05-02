const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require('mongoose');

const DB_URL = 'mongodb://backend:stonespassword01@ds115579.mlab.com:15579/stones-exchange';

router.post("/", async (req, res) => {
  try {
    await mongoose.connect(DB_URL);
    const user = await User.findOne({ email: req.body.email });

    user
      ? await user.verifyPassword(req.body.password, user.password)
      ? res.json({
          user: {
            name: user.name,
            email: user.email
          }
      })
      : res.sendStatus(403)
      : res.sendStatus(403);

    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;