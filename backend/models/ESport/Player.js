const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    playerId: { type: String, required: false },
    // team: { type: String, required: true },
    // matches: {type: [String], required: true},
});

// const RainbowPlayer = mongoose.model("rainbowplayers", PlayerSchema);
const ValorantPlayer = mongoose.model("valorantplayers", PlayerSchema);
// const CSPlayer = mongoose.model("csplayers", PlayerSchema);

module.exports = {
    ValorantPlayer
};