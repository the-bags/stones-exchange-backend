const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const Inventory = require("../models/Inventory");

require('../models/Stone'); // <-- for populate

router.get("/", async (req, res) => {
    try {
        const email = jwt.decode(req.headers.authorization.split(' ').pop()).email;
        const user = await User.findOne({ email });
        const inventory = await Inventory.findOne({ userId: user._id }).populate('stones');

        user
            ? res.json(inventory.stones)
            : res.sendStatus(403);

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
