const express = require("express");
const User = require("../models/User");
const Inventory = require("../models/Inventory");
require('../models/Stone'); // <-- for populate

const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

router.post("/", async (req, res) => {
    console.log('req.body: ', req.body);
    try {
        await mongoose.connect(process.env.DB_URL);
        const user = await User.findOne({ email: req.body.email });
        console.log('get user');
        const inventory = await Inventory.findOne({ userId: user._id }).populate('stones');
        console.log('get inventory');
        user
            ? res.json(inventory.stones)
            : res.sendStatus(403);

        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
