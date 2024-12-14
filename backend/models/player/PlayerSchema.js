const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    picId: { type: String, required: false },
    playerId: { type: String, required: false },
    sport: { type: String, required: true },
});

module.exports = PlayerSchema;