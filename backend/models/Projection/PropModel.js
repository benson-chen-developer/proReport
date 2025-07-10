const mongoose = require("mongoose");

const PropModel = new mongoose.Schema({
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

/* Make the Prop expire at start_time */
PropModel.index({ start_time: 1 }, { expireAfterSeconds: 0 });

const Props = mongoose.model("props", PropModel);
const TestProps = mongoose.model("testProps", PropModel);

module.exports = {
    Props, TestProps
};

