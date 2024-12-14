const mongoose = require("mongoose");

const CSPlayerSchema = new mongoose.Schema({
    playerId: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    picId: { type: String, required: false },
    teams: { type: [String], required: false },
});

const CSPlayer = mongoose.model("csplayers", CSPlayerSchema);

module.exports = CSPlayer;