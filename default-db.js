const Inventory = require("./models/Inventory");
const Stone = require("./models/Stone");
const User = require("./models/User");

const mongoose = require('mongoose');
const _ = require('underscore');

require('dotenv').config();

const stones = [
    {name: 'Basalt', color: 'rgb(0,0,10)'},
    {name: 'Granite', color: 'rgb(100,30,30)'},
    {name: 'Limestone', color: 'rgb(60,100,150)'},
    {name: 'Quartzite', color: 'rgb(200,100,100)'},
    {name: 'Slate', color: 'rgb(0,0,10)'},
    {name: 'Marble', color: 'rgb(255,254,230)'},
    {name: 'Sandstone', color: 'rgb(200,50,60)'},
    {name: 'Ruby', color: 'rgb(240,50,50)'},
    {name: 'Anyolite', color: 'rgb(0,100,10)'},
];

async function run(){
    try {
        await mongoose.connect(process.env.DB_URL);
        await mongoose.connection.db.dropCollection('stones', (err) => err ? console.log(err) : console.log('drop stones'));
        
        for (let i=0; i<stones.length; i++) {
            const stone = new Stone(stones[i]);
            await stone.save();
        };
        console.log('put stones');
        // create Users
        let user = await User.findOne({ name: 'Admin' });
        if (user) {
            console.log('remove admin');
            await user.remove();
        }
        user = new User();
        user.name = 'Admin',
        user.email = 'admin@test.com';
        user.password = await user.encryptPassword('password');
        await user.save();
        console.log('create admin');

        // Create Inventory
        await mongoose.connection.db.dropCollection('inventories', (err) => err ? console.log(err) : console.log('drop inventories'));
        const inventory = new Inventory();
        inventory.userId = user._id;
        inventory.stones = await initStones();
        await inventory.save();
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