const mongoose = require("mongoose");

// Define the sub-schema for player stats
const PlayerStatsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    kills: { type: String, required: true },
    deaths: { type: String, required: true },
    assists: { type: String, required: true },
    team: { type: String, required: true },
    headshots: { type: String, required: true },
});

const MapSchema = new mongoose.Schema({
    map: { type: String, required: false },
    players: {type: [PlayerStatsSchema], required: true},
    didPlay: {type: Boolean, required: true}
});

/*
    The maps one will just be
*/
const CSMatchSchema = new mongoose.Schema({
    url: { type: String, required: true },
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    date: { type: String, required: true },
    maps: {
        type: [MapSchema], required: true
    }
});

// const CSMatch = mongoose.model("csmatches", CSMatchSchema);

// module.exports = CSMatch;