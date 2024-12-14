const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    period: { type: Number, required: true },
    clock: { type: String, required: true },
    teamTricode: { type: String, required: true },
    actionType: { type: String, required: true },
    picId: { type: Number, required: true },
    amount: { type: Number, required: true },
});

const MatchSchema = new mongoose.Schema({
    url: { type: String, required: true },
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    date: { type: String, required: true },
    actions: { type: [ActionSchema], required: true}
});

const WNBAMatch = mongoose.model("wnbamatches", MatchSchema);

module.exports = WNBAMatch;
