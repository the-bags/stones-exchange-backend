const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var StoneSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Stone", StoneSchema);