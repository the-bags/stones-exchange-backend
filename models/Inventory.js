const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// it is not correct VVVV
// const ObjectId = mongoose.Types.ObjectId;


var InventorySchema = new Schema({
  userId: {
    type: ObjectId,
    unique: true,
    required: true
  },
  stones: {
    type: [ObjectId],
    required: true
  }
});

module.exports = mongoose.model("Inventory", InventorySchema);