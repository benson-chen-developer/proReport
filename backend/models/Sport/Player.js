const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    picId: { type: String, required: false },
    playerId: { type: String, required: false },
    sport: { type: String, required: true },
});

const PPlayerSchema = new mongoose.Schema({
    ...PlayerSchema.obj,
    city: { type: String, required: false},
    position: { type: String, required: false},
});

const Player = mongoose.model("players", PPlayerSchema);

module.exports = {Player};