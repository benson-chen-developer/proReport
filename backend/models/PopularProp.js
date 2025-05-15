const mongoose = require("mongoose");

const PopularPropsModel = new mongoose.Schema({
    propRef: { type: mongoose.Schema.Types.ObjectId, ref: "props", required: true },
    start_time: { type: Date, required: true },
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
        }, required: true
    },
    popularHits: {type: [String], required: true}, /* hit, miss, tie */
});

/* Make the Prop expire at start_time */
PopularPropsModel.index({ start_time: 1 }, { expireAfterSeconds: 0 });

const PopularProp = mongoose.model("popularprops", PopularPropsModel);

module.exports = {PopularProp};