const mongoose = require("mongoose");

const TestPropModel = new mongoose.Schema({
    sportsbook: { type: String, required: true },
    name: { type: String, required: true },

    player: { type: mongoose.Schema.Types.ObjectId, required: true,  refPath: 'playerModel' },
    playerModel: { type: String, required: true }, // "nbaplayers" or "mlbplayers", etc
    league: { type: String, required: true },

    values: { type: [Number], required: true },
    updated_ats: {type: [String], required: true},
    start_time: {type: Date, required: true},
    odds: {type: Number, required: true},
    period: {type: String, required: true},
    overUnder: {type: Number, required: true}, /* 1 over 2 under 3 both */
    discount: {type: Number, required: false}, /* Tacos and Sleepr Discounts */
    active: {type: Boolean, required: false, default: true}
});

const TestProp = mongoose.model("testprops", TestPropModel);

module.exports = {TestProp};