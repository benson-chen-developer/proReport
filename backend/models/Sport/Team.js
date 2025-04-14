const mongoose = require("mongoose");
const { NBAStatsSchema, MLBStatsSchema } = require("./Stats.js");

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: false },
    gp: { type: Number, default: 0 },
    league: {type: String, required: true },
  },
  { discriminatorKey: "sport", timestamps: true }
);

const NBATeamSchema = new mongoose.Schema({
    ...TeamSchema.obj,
    given: Object.keys(NBAStatsSchema.obj).reduce((acc, stat) => {
        acc[stat] = { type: [Number], default: [0, 0, 0, 0] }; //G, F, C, All
        return acc;
    }, {})
});
const MLBTeamSchema = new mongoose.Schema({
    ...TeamSchema.obj, 
    given: Object.keys(MLBStatsSchema.obj).reduce((acc, stat) => {
        acc[stat] = { type: [Number], default: [0] }; //Hitter and Pitcher have seperate stats
        return acc;
    }, {})
});

const NBATeam = mongoose.model("nbateams", NBATeamSchema);
const MLBTeam = mongoose.model("mlbteams", MLBTeamSchema);

module.exports = {
  NBATeam,
  MLBTeam,
};
