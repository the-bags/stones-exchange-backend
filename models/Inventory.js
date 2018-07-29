const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var InventorySchema = new Schema({
    userId: {
        type: ObjectId,
        unique: true,
        required: true,
    },
    stones: [{
        type: ObjectId,
        ref: "Stone", // for populate
        required: true
    }]
});

module.exports = mongoose.model("Inventory", InventorySchema);