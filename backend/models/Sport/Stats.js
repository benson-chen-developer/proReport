// const mongoose = require('mongoose');

// // const NBAStatsSchema = new mongoose.Schema({
// //     PTS: { type: Number, default: 0 },
// //     FGA: { type: Number, default: 0 },
// //     FGM: { type: Number, default: 0 },
// //     "3PA": { type: Number, default: 0 },
// //     "3PM": { type: Number, default: 0 },
// //     FTA: { type: Number, default: 0 },
// //     FTM: { type: Number, default: 0 },
// //     REB: { type: Number, default: 0 },
// //     DRB: { type: Number, default: 0 },
// //     ORB: { type: Number, default: 0 },
// //     AST: { type: Number, default: 0 },
// //     BLK: { type: Number, default: 0 },
// //     STL: { type: Number, default: 0 },
// //     PF: { type: Number, default: 0 },
// //     TOV: { type: Number, default: 0 },
// //     MIN: { type: String, default: '0.00' },
// // });
// const NBAStatsSchema = new mongoose.Schema({
//     PTS: { type: Number, required: false },
//     FGA: { type: Number, required: false },
//     FGM: { type: Number, required: false },
//     "3PA": { type: Number, required: false },
//     "3PM": { type: Number, required: false },
//     FTA: { type: Number, required: false },
//     FTM: { type: Number, required: false },
//     REB: { type: Number, required: false },
//     DRB: { type: Number, required: false },
//     ORB: { type: Number, required: false },
//     AST: { type: Number, required: false },
//     BLK: { type: Number, required: false },
//     STL: { type: Number, required: false },
//     PF: { type: Number, required: false },
//     TOV: { type: Number, required: false },
//     MIN: { type: String, required: false }
// });


// const WNBAStatsSchema = new mongoose.Schema({
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
//     MIN: { type: Number, default: 0 },
// });

// module.exports = {
//     NBAStatsSchema, WNBAStatsSchema
// };
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
    MIN: { type: Number, default: 0 },
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

const MLBStatsSchema = new mongoose.Schema({
    // Hitter
    HR: { type: Number, required: false }, //HomeRuns
    H: { type: Number, required: false }, //Hits
    TB: { type: Number, required: false }, //Total Bases
    AB: { type: Number, required: false }, //At Bats
    R: { type: Number, required: false }, // Runs
    RBI: { type: Number, required: false }, //Runs Batted In (How many runs for team as well)
    BB: { type: Number, required: false }, //Walk 
    SO: { type: Number, required: false }, //Strikeout
    SB: { type: Number, required: false }, //Stolen Base
    '2B': { type: Number, required: false }, //Double (2 bases on hit)
    '3B': { type: Number, required: false }, //Triple (3 bases on hit)
    // IBB: { type: Number, required: false }, //Intential Walk
    // CS: { type: Number, required: false }, //Caught stealing so tagged while stealing

    //Pitchers
    K: { type: Number, required: false }, //Strikouts
    RA: { type: Number, required: false }, //Runs Allowed
    ER: { type: Number, required: false }, //Eared Runs
    // GS: { type: Number, required: false }, //Games started
    HA: { type: Number, required: false }, //Hits allowed
    // BB: { type: Number, required: false }, //Walks Allowed
    // IP: { type: Number, required: false }, //Innings Pitched
});

module.exports = {
    NBAStatsSchema, WNBAStatsSchema, 
    MLBStatsSchema
};