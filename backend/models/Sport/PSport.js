const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    playerId: { type: String, required: true },
    position: { type: String, required: false },
    periods: { type: [[{name:String, value: Number}]], required: true },
});

const MatchSchema = new mongoose.Schema({
    url: { type: String, required: true },
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    score: { type: String, required: true },
    date: { type: String, required: true },
    players: { type: [PlayerSchema], required: true }
});

const NBAMatch = mongoose.model("nbamatches", MatchSchema);
module.exports = {
    NBAMatch
};