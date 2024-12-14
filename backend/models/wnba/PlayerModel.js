const mongoose = require("mongoose");
const PlayerSchema = require("../player/PlayerSchema");

const Schema = new mongoose.Schema({
    ...PlayerSchema.obj,
    teams: { type: [String], required: false},
    city: { type: String, required: false},
    abbr: { type: String, required: false},
    position: { type: String, required: false},
    number: { type: String, required: false},
});

const WNBAPlayer = mongoose.model("wnbaplayers", Schema);

module.exports = WNBAPlayer;