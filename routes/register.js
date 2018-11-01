const express = require('express');
const User = require('../models/User');
const Inventory = require("../models/Inventory");
const Stone = require("../models/Stone");
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('underscore');

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
        const inventory = new Inventory();

        // create inventory
        inventory.userId = user._id;
        inventory.stones = await initStonesForInventory();
        await inventory.save();

        res.json({
            user: {
                name: newUser.name,
                email: newUser.email,
            },
            token: user.getToken()
        });
        mongoose.connection.close();
    } catch (err) {
        // res.apiError(err);
        console.log(err);
    }
});

async function initStonesForInventory() {
    // sample - produce a random sample from the list.
    // pluck - get only _id
    return _.sample(_.pluck(await Stone.find({}, '_id'), '_id'), 7);
}

module.exports = router;
