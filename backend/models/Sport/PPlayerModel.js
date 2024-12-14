const mongoose = require("mongoose");
const PlayerSchema = require("../player/PlayerSchema");

const Schema = new mongoose.Schema({
    ...PlayerSchema.obj,
    city: { type: String, required: false},
    position: { type: String, required: false},
});

const NBAPlayer = mongoose.model("nbaplayers", Schema);

module.exports = {NBAPlayer};