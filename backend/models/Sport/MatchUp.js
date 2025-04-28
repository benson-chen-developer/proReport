const mongoose = require("mongoose");

const MatchUpSchema = new mongoose.Schema({
    league: { type: String, required: true },
    teams: { type: [String], required: true },
    time: { type: Date, required: true }, 
});

const MatchUp = mongoose.model("matchups", MatchUpSchema);

module.exports = { MatchUp };

