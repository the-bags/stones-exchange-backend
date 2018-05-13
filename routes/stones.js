const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
      await mongoose.connect(process.env.DB_URL);
      const user = await User.findOne({ email: req.body.email });
      console.log(user.stones);
      user
        ? res.json(user.stones)
        : res.sendStatus(403);
  
      mongoose.connection.close();
    } catch (err) {
      console.log(err);
    }
  });
  
  module.exports = router;