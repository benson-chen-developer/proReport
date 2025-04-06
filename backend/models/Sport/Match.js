const mongoose = require("mongoose");
const { NBAStatsSchema, MLBStatsSchema } = require('./Stats.js');

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    playerId: { type: String, required: true },
    position: { type: String, required: false },
    periods: {
        type: [
            {
                type: mongoose.Schema.Types.Mixed,
                validate: {
                    validator: function (value) {
                        return (
                            NBAStatsSchema.validate(value).error === null ||
                            MLBStatsSchema.validate(value).error === null
                        );
                    },
                    message: 'Invalid stats structure for periods.',
                },
            },
        ],
        required: true,
    },
});

const MatchSchema = new mongoose.Schema({
    url: { type: String, required: true },
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    score: { type: String, required: true },
    date: { type: String, required: true },
    season: { type: Number, required: true },
    periodsPlayed: { type: Number, required: true },
    players: { type: [PlayerSchema], required: true }
});

const NBAMatch = mongoose.models.nbamatches || mongoose.model("nbamatches", MatchSchema);
const MLBMatch = mongoose.models.mlbmatches || mongoose.model("mlbmatches", MatchSchema);

module.exports = {
    NBAMatch,
    MLBMatch
};
