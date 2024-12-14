const mongoose = require("mongoose");

const ValorantPlayerSchema = new mongoose.Schema({
    playerId: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    picId: { type: String, required: false },
    teams: { type: [String], required: false },
    matches: { type: [String], required: false }
});

const ValorantPlayer = mongoose.model("valorantplayers", ValorantPlayerSchema);

module.exports = ValorantPlayer;