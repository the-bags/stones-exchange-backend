const Inventory = require("./models/Inventory");
const Stone = require("./models/Stone");
const User = require("./models/User");

const mongoose = require('mongoose');
const _ = require('underscore');

require('dotenv').config();

async function run(){
    try {
        await mongoose.connect(process.env.DB_URL);
        await mongoose.connection.db.dropCollection('inventories', (err) => err ? console.log(err) : console.log('drop inventories'));

        let users = await User.find();

        for (user of users) {
            const inventory = new Inventory();
            inventory.userId = user._id;
            inventory.stones = await initStonesForInventory();
            await inventory.save();
        };

        console.log('put invetories');
        mongoose.connection.close();

        console.log('Write to db is successfully!');
    } catch (err) {
        console.log(err);
    }
}

async function initStonesForInventory(){
    // sample - produce a random sample from the list. 
    // pluck - get only _id
    return  _.sample(_.pluck(await Stone.find({},'_id'), '_id'), 7);
}
run();
