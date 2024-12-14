const express = require("express");
const router = express.Router();
const RainbowPlayer = require("../models/rainbow/PlayerSchema");
const RainbowMatch = require("../models/rainbow/MatchSchema");

router.get("/players", async (req, res) => {
    try {
        const players = await RainbowPlayer.find({}); 
        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
})

router.post("/matches", async (req, res) => {
    const { team } = req.body; 

    try {
        const matches = await RainbowMatch.find({
            $or: [
                { team1: { $in: team } }, 
                { team2: { $in: team } }
            ]
        });

        res.status(200).json(matches);
    } catch (err) {
        console.error("Error fetching matches", err);
        res.status(500).send({ message: "Error fetching matches" });
    }
});

module.exports = router;