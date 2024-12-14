const mongoose = require("mongoose");

const PlayerStatsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    stats: { type: Map, of: Number, required: true }
});

const MapSchema = new mongoose.Schema({
    players: {type: [PlayerStatsSchema], required: true},
    score: {type: String, required:false},
    didPlay: {type: Boolean, required: true},
    map: {type: String, required:false},
});

const MatchSchema = new mongoose.Schema({
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    date: { type: String, required: true },
    url: {type: String, required: true},
    league: { type: String, required: true },
    maps: {
        type: [MapSchema], required: true
    },
});

// const RainbowMatch = mongoose.model("rainbowmatches", MatchSchema);
// const ValorantMatch = mongoose.model("valorantmatches", MatchSchema);
const CSMatch = mongoose.model("csmatches", MatchSchema);

module.exports = {
   CSMatch
};