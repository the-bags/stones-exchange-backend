const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
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
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR));
    return await bcrypt.hash(password, salt, null);
};

UsersSchema.methods.verifyPassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
};

UsersSchema.methods.getToken = () => {
    return jwt.sign(
        JSON.stringify({ name: this.name, email: this.email }),
        'nothingToLookAt',
        { algorithm: 'HS256' }
    );
};

module.exports = mongoose.model("User", UsersSchema);