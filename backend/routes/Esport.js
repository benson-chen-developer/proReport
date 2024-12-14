const express = require("express");
const { CSMatch } = require("../models/ESport/Match");
const router = express.Router();

router.get("/players/cs", async (req, res) => {
    try {
        const players = await CSMatch.aggregate([
            { $unwind: "$maps" },                 
            { $unwind: "$maps.players" },          
            {
                $group: {
                    _id: {                  
                        name: "$maps.players.name",
                        team: "$maps.players.team"
                    },
                    stats: { $first: "$maps.players.stats" }
                }
            },
            {
                $project: {
                    _id: 0,                   
                    name: "$_id.name",
                    team: "$_id.team",
                    stats: 1
                }
            }
        ]);

        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
});

router.get("/matches/cs/:player", async (req, res) => {
    const { player } = req.params; 

    try {
        const matches = await CSMatch.find({
            "maps.players": { 
                $elemMatch: { name: player }
            }
        });

        res.status(200).json(matches);
    } catch (err) {
        console.error("Error fetching matches with player", err);
        res.status(500).send({ message: "Error fetching matches with player" });
    }
});


module.exports = router;