const express = require("express");
const { NBAMatch } = require("../models/Sport/PSport");
const { NBAPlayer } = require("../models/Sport/PPlayerModel");
const router = express.Router();

router.get("/players/nba", async (req, res) => {
    try {
        const players = await NBAPlayer.find({});

        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
});
router.get("/matches/nba", async (req, res) => {
    try {
        const matches = await NBAMatch.find({});

        res.status(200).json(matches);
    } catch (err) {
        console.error("Error fetching matches", err);
        res.status(500).send({ message: "Error fetching matches" });
    }
});

router.get("/players/short/nba", async (req, res) => {
    try {
        const players = await NBAMatch.aggregate([
            { $unwind: "$players" },
            {
                $project: {
                    _id: 0, // Exclude the MongoDB document ID
                    name: "$players.name",
                    team: "$players.team",
                    playerId: "$players.playerId",
                    position: "$players.position",
                    periods: "$players.periods"
                }
            }
        ]);

        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).json({ message: "Error fetching players" });
    }
});

router.get("/matchUps/:league", async (req, res) => {
    const league = req.params.league;

    try {
        const response = await fetch('https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json')
        const data = await response.json();
        const schedule = data.leagueSchedule.gameDates
            .flatMap(gameDate => gameDate.games)
            .filter(game => game.gameLabel !== 'Preseason')

        res.status(200).json(schedule);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).json({ message: "Error fetching players" });
    }
});

router.get("/matches/nba/:playerName", async (req, res) => {
    //Looks like Cade_CunningHam (req.params) but is Cade Cunningham in player obj in db
    const playerName = `${req.params.playerName.split('_')[0]} ${req.params.playerName.split('_')[1]}`; 
    
    try {
        const playerMatches = await NBAMatch.aggregate([
            {
                $match: { "players.name": playerName } 
            },
            {
                $project: {
                    url: 1,
                    team1: 1,
                    team2: 1,
                    score: 1,
                    date: 1,
                    players: 1
                }
            }
        ]);

        res.status(200).json(playerMatches);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
});


module.exports = router;