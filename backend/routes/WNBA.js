const express = require("express");
const router = express.Router();
const WNBAPlayer = require("../models/wnba/PlayerModel");
const WNBAMatch = require("../models/wnba/MatchModel");

/*
    We would call wnba/players first and find the player data from there
*/
router.get("/player/:abbr", async (req, res) => {
    const team = req.params.abbr;
    try {
        const matches = await WNBAMatch.find({$or: [ { team1: team }, { team2: team } ]})
            .sort({ date: -1 })
            .limit(15);

        res.status(200).json(matches);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
})

router.get("/players", async (req, res) => {
    try {
        const players = await WNBAPlayer.find();

        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
})

module.exports = router;