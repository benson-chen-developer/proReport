const mongoose = require("mongoose");

const PropsModel = new mongoose.Schema({
    sportsbook: { type: String, required: true },
    name: { type: String, required: true },
    playerName: { type: String, required: true },
    value: { type: Number, required: true },
    updated_at: {type: String, required: true}
});

const Props = mongoose.model("props", PropsModel);

module.exports = {
    Props
};

