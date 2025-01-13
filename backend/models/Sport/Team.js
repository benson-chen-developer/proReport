const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: false },
    given: {
        PTS: { type: [Number], default: [0, 0, 0] },
        FGA: { type: [Number], default: [0, 0, 0] },
        FGM: { type: [Number], default: [0, 0, 0] },
        "3PA": { type: [Number], default: [0, 0, 0] },
        "3PM": { type: [Number], default: [0, 0, 0] },
        FTA: { type: [Number], default: [0, 0, 0] },
        FTM: { type: [Number], default: [0, 0, 0] },
        REB: { type: [Number], default: [0, 0, 0] },
        DRB: { type: [Number], default: [0, 0, 0] },
        ORB: { type: [Number], default: [0, 0, 0] },
        AST: { type: [Number], default: [0, 0, 0] },
        BLK: { type: [Number], default: [0, 0, 0] },
        STL: { type: [Number], default: [0, 0, 0] },
        PF: { type: [Number], default: [0, 0, 0] },
        TOV: { type: [Number], default: [0, 0, 0] },
    },
});

const NBATeam = mongoose.model("nbateams", TeamSchema);

module.exports = {
    NBATeam
};