
const mongoose = require("mongoose");

const PromoModel = new mongoose.Schema({
    sportsbook: { type: String, required: true },
    code: { type: String, required: true }, 
    link: { type: String, required: true }, 
    liveStates: { type: [String], required: true }, 
    signUp: { type: String, required: true }, 
    signUpValue: { type: Number, required: true }, 
    description: { type: String, required: true }, 
});

const Promo = mongoose.model("promos", PromoModel);

module.exports = {
    Promo
};

