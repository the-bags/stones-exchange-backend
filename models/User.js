const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
require('dotenv').config();

const UsersSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

UsersSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt, null);
};

UsersSchema.methods.verifyPassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
};

module.exports = mongoose.model("User", UsersSchema);
