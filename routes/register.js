const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Inventory = require("../models/Inventory");
const Stone = require("../models/Stone");
const _ = require('underscore');

router.post('/', async (req, res) => {
    // TODO add data validation
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = await user.encryptPassword(req.body.password);

    try {
        const newUser = await user.save();
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
    } catch (err) {
        console.log(err);
    }
});

async function initStonesForInventory() {
    // sample - produce a random sample from the list.
    // pluck - get only _id
    return _.sample(_.pluck(await Stone.find({}, '_id'), '_id'), 7);
}

module.exports = router;
