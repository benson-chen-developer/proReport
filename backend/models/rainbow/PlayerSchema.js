const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    picId: { type: String, required: false },
    team: { type: String, required: true },
    teams: { type: [String], required: true },
    playerId: { type: String, required: false },
});

const RainbowPlayer = mongoose.model("rainbowplayers", PlayerSchema);

module.exports = RainbowPlayer;