const mongoose = require('mongoose');

const NBAStatsSchema = new mongoose.Schema({
    PTS: { type: Number, default: 0 },
    FGA: { type: Number, default: 0 },
    FGM: { type: Number, default: 0 },
    "3PA": { type: Number, default: 0 },
    "3PM": { type: Number, default: 0 },
    FTA: { type: Number, default: 0 },
    FTM: { type: Number, default: 0 },
    REB: { type: Number, default: 0 },
    DRB: { type: Number, default: 0 },
    ORB: { type: Number, default: 0 },
    AST: { type: Number, default: 0 },
    BLK: { type: Number, default: 0 },
    STL: { type: Number, default: 0 },
    PF: { type: Number, default: 0 },
    TOV: { type: Number, default: 0 },
    MIN: { type: String, default: '0.00' },
});

const WNBAStatsSchema = new mongoose.Schema({
    PTS: { type: Number, default: 0 },
    FGA: { type: Number, default: 0 },
    FGM: { type: Number, default: 0 },
    "3PA": { type: Number, default: 0 },
    "3PM": { type: Number, default: 0 },
    FTA: { type: Number, default: 0 },
    FTM: { type: Number, default: 0 },
    REB: { type: Number, default: 0 },
    DRB: { type: Number, default: 0 },
    ORB: { type: Number, default: 0 },
    AST: { type: Number, default: 0 },
    BLK: { type: Number, default: 0 },
    STL: { type: Number, default: 0 },
    PF: { type: Number, default: 0 },
    TOV: { type: Number, default: 0 },
    MIN: { type: String, default: '0.00' },
});

module.exports = {
    NBAStatsSchema, WNBAStatsSchema
};