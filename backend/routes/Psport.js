const express = require("express");
const { NBAMatch } = require("../models/Sport/PSport");
const { NBAPlayer } = require("../models/Sport/PPlayerModel");
const { NBATeam } = require("../models/Sport/Team");
const router = express.Router();

router.get("/players/nba/", async (req, res) => {
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
        // console.log(matches)

        res.status(200).json(matches);
    } catch (err) {
        console.error("Error fetching matches", err);
        res.status(500).send({ message: "Error fetching matches" });
    }
});

router.get("/teams/nba", async (req, res) => {
    try {
        const teams = await NBATeam.find({});

        res.status(200).json(teams);
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

router.get("/matches/nba/:playerName?", async (req, res) => { 
    const playerName = req.params.playerName;

    try {
        const query = playerName ? { "players.name": playerName } : {};
        const matches = await NBAMatch.find(query).select("-_id"); 

        res.status(200).json(matches);
    } catch (err) {
        console.error("Error fetching matches", err);
        res.status(500).send({ message: "Error fetching matches" });
    }
});

router.post("/matches/nba/teams", async (req, res) => { 
    const { cities } = req.body; 
    
    if (cities.length === 0) {
        return res.status(200).json([]);
    }

    try {
        // Find games where either team1 or team2 is in the cities array
        const matches = await NBAMatch.find({
            $or: [{ team1: { $in: cities } }, { team2: { $in: cities } }]
        })

        // Convert matches array to a Set to remove duplicates based on a unique game identifier (e.g., gameId)
        const uniqueMatches = Array.from(new Map(matches.map(match => [match.url, match])).values());

        res.status(200).json(uniqueMatches);
    } catch (err) {
        console.error("Error fetching matches", err);
        res.status(500).send({ message: "Error fetching matches" });
    }
});

module.exports = router;