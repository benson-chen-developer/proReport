const mongoose = require("mongoose");

const TrendingPlayerSchema = new mongoose.Schema({
    playerId: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    picId: { type: String, required: false },
    team: { type: String, required: false },
    matches: { type: [String], required: false },
    oppTeam: { type: String, required: false },
    date: { type: String, required: false },
    tournament: { type: String, required: false }
});

const TrendingPlayer = mongoose.model("trendingplayers", TrendingPlayerSchema);

module.exports = TrendingPlayer;