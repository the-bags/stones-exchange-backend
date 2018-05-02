const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = require('../env').SALT_WORK_FACTOR;

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
  },
});

UsersSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  console.log(password);
  return await bcrypt.hash(password, salt, null);
};

UsersSchema.methods.verifyPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword)
};


module.exports = mongoose.model("User", UsersSchema);