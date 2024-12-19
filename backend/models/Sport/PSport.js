const mongoose = require("mongoose");
const {NBAStatsSchema, WNBAStatsSchema} = require('./Stats.js');

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
                        /* Checks if the stats are of a correct league stat schema */
                        return (
                            mongoose.isValidObjectId(value) || 
                                NBAStatsSchema.validate(value).error === null ||
                                WNBAStatsSchema.validate(value).error === null
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
    periodsPlayed: { type: Number, required: true },
    players: { type: [PlayerSchema], required: true }
});

const NBAMatch = mongoose.model("nbamatches", MatchSchema);

module.exports = {
    NBAMatch
};

