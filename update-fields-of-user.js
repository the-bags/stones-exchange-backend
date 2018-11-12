const Inventory = require("./models/Inventory");
const Stone = require("./models/Stone");
const User = require("./models/User");

const mongoose = require('mongoose');
const _ = require('underscore');

require('dotenv').config();

async function run() {
    try {
        await mongoose.connect(process.env.DB_URL);
        let users = await User.find();

        for (let user of users) {
            let name, email, password;

            name = user.name;
            email = user.email;
            password = user.password;

            await user.remove();

            user = new User({
                name: name,
                email: email,
                password: password
            });

            await user.save();
        }
        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}

run();


