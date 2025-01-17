const mongoose = require("mongoose");

const PropsModel = new mongoose.Schema({
    sportsbook: { type: String, required: true },
    name: { type: String, required: true },
    playerName: { type: String, required: true },
    values: { type: [Number], required: true },
    updated_ats: {type: [String], required: true},
    start_time: {type: String, required: true},
    odds: {type: Number, required: true}
});

const Props = mongoose.model("props", PropsModel);

module.exports = {
    Props
};

