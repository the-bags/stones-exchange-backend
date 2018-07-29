const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommonStoneSchema = new Schema({
    stone: {
        type: ObjectId,
        ref: "Stone", // for populate
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("CommonStone", CommonStoneSchema);