const express = require("express");
const router = express.Router();
const ValorantPlayer = require("../models/valorant/PlayerSchema");
const ValorantMatch = require("../models/valorant/MatchModel");

router.get("/players", async (req, res) => {
    try {
        const players = await ValorantPlayer.find({}); 
        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
})

router.get("/dummy/players", async (req, res) => {
    try {
        const players = [
            {
                firstName: "Tenz",
                lastName: "",
                picId: "",
                team: "Sentineals",
                playerId: "",
                sport: "valorant",
                gameUrls: []
            }
        ]
        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
})

router.post("/dummy/games", async (req, res) => {
    const urls = req.body.urls;
    const games = [
        {
            url: "111",
            team1: "Sen",
            team2: "other team",
            date: "8/14",
            maps: [
                {
                    map: "Lotus",
                    players: [
                        {
                            name: "Tenz",
                            kills: 22,
                            deaths: 22,
                            assists: 4,
                            firstKills: 11,
                            firstDeaths: 11
                        }
                    ],
                    didPlay: true
                },
                {
                    map: "Bind",
                    players: [
                        {
                            name: "Tenz",
                            kills: 11,
                            deaths: 2,
                            assists: 3,
                            firstKills: 1,
                            firstDeaths: 2
                        }
                    ],
                    didPlay: true
                },
                {
                    map: "Cru",
                    players: [
                        {
                            name: "Tenz",
                            kills: 22,
                            deaths: 12,
                            assists: 33,
                            firstKills: 11,
                            firstDeaths: 22
                        }
                    ],
                    didPlay: false
                }
            ]
        },
    ]
    const foundGames = games.filter(game => urls.includes(game.url));

    res.status(200).json(foundGames);
})
router.post("/games", async (req, res) => {
    const team = req.body.team;
    const games = await ValorantMatch.find({
        $or: [
            { team1: team },
            { team2: team }
        ]
    });

    res.status(200).json(games);
})
router.get('/games/:playerName', async (req, res) => {
    const { playerName } = req.params; 

    try {
        const games = await ValorantMatch.find({
            'maps.players.name': playerName,  // Match based on player name
        });

        res.status(200).json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ message: 'Error fetching games', error });
    }
});

module.exports = router;