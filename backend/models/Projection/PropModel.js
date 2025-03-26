const mongoose = require("mongoose");

const PropsModel = new mongoose.Schema({
    sportsbook: { type: String, required: true },
    name: { type: String, required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: "nbaplayers", required: true },
    values: { type: [Number], required: true },
    updated_ats: {type: [String], required: true},
    start_time: {type: Date, required: true},
    odds: {type: Number, required: true},
    period: {type: String, required: true},
    overUnder: {type: Number, required: true}, /* 1 over 2 under 3 both */
    // popularGameFilters: {type: [String], required: true},
    popularGameFilter: {
        type: {  
            stat: String,
            over: Boolean,
            isHome: Boolean,
            isAway: Boolean,
            period: String,
            lastGame: String, 
            withOutPlayers: [String],
            daysRested: Number,
            minutes: [Number, Number],
            supportingStat: String
        }, required: false
    },
    popularHits: {type: [String], required: true},
    discount: {type: Number, required: false}, /* Tacos and Sleepr Discounts */
});

/* Make the Prop expire at start_time */
PropsModel.index({ start_time: 1 }, { expireAfterSeconds: 0 });

const Props = mongoose.model("props", PropsModel);
const TestProps = mongoose.model("testProps", PropsModel);

module.exports = {
    Props, TestProps
};

