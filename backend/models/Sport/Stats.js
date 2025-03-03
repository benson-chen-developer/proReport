const mongoose = require('mongoose');

// const NBAStatsSchema = new mongoose.Schema({
//     PTS: { type: Number, default: 0 },
//     FGA: { type: Number, default: 0 },
//     FGM: { type: Number, default: 0 },
//     "3PA": { type: Number, default: 0 },
//     "3PM": { type: Number, default: 0 },
//     FTA: { type: Number, default: 0 },
//     FTM: { type: Number, default: 0 },
//     REB: { type: Number, default: 0 },
//     DRB: { type: Number, default: 0 },
//     ORB: { type: Number, default: 0 },
//     AST: { type: Number, default: 0 },
//     BLK: { type: Number, default: 0 },
//     STL: { type: Number, default: 0 },
//     PF: { type: Number, default: 0 },
//     TOV: { type: Number, default: 0 },
//     MIN: { type: String, default: '0.00' },
// });
const NBAStatsSchema = new mongoose.Schema({
    PTS: { type: Number, required: false },
    FGA: { type: Number, required: false },
    FGM: { type: Number, required: false },
    "3PA": { type: Number, required: false },
    "3PM": { type: Number, required: false },
    FTA: { type: Number, required: false },
    FTM: { type: Number, required: false },
    REB: { type: Number, required: false },
    DRB: { type: Number, required: false },
    ORB: { type: Number, required: false },
    AST: { type: Number, required: false },
    BLK: { type: Number, required: false },
    STL: { type: Number, required: false },
    PF: { type: Number, required: false },
    TOV: { type: Number, required: false },
    MIN: { type: String, required: false }
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
    MIN: { type: Number, default: 0 },
});

module.exports = {
    NBAStatsSchema, WNBAStatsSchema
};