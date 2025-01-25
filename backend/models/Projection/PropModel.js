const mongoose = require("mongoose");

const PropsModel = new mongoose.Schema({
    sportsbook: { type: String, required: true },
    name: { type: String, required: true },
    playerName: { type: String, required: true },
    values: { type: [Number], required: true },
    updated_ats: {type: [String], required: true},
    start_time: {type: Date, required: true},
    odds: {type: Number, required: true},
    overUnder: {type: Number, required: true} /* 1 over 2 under 3 both */
});

/* Make the Prop expire at start_time */
PropsModel.index({ start_time: 1 }, { expireAfterSeconds: 0 });

const Props = mongoose.model("props", PropsModel);

module.exports = {
    Props
};

