const express = require("express");
const router = express.Router();
const TrendingPlayer = require("../models/trending/PlayerSchema");

router.get("/players", async (req, res) => {
    try {
        const players = await TrendingPlayer.find({}); 
        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
})

module.exports = router;