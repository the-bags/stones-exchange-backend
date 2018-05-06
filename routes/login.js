const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config()


router.post("/", async (req, res) => {
  console.log('LogIn:',req.body);
  // { email: 'admin@test.com', password: 'password' }
  try {
    await mongoose.connect(process.env.DB_URL);
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