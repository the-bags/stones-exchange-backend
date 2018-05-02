const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require('mongoose');

const DB_URL = require('../env').DB_URL;

router.post("/", async (req, res) => {
  console.log('LogIn:',req.body);
  // { email: 'admin@test.com', password: 'password' }
  try {
    await mongoose.connect(DB_URL);
    const user = await User.findOne({ email: req.body.email });
    user
      ? await user.verifyPassword(req.body.password, user.password)
      ? res.sendStatus(200)
      : res.sendStatus(403)
      : res.sendStatus(403);

    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;