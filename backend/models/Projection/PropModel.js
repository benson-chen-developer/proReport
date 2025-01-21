const mongoose = require("mongoose");

const PropsModel = new mongoose.Schema({
    sportsbook: { type: String, required: true },
    name: { type: String, required: true },
    playerName: { type: String, required: true },
    values: { type: [Number], required: true },
    updated_ats: {type: [String], required: true},
    start_time: {type: String, required: true},
    odds: {type: Number, required: true},
    overUnder: {type: Number, required: true} /* 1 over 2 under 3 both */
});

const Props = mongoose.model("props", PropsModel);

module.exports = {
    Props
};

