const express = require("express");
const router = express.Router();
const CSPlayer = require("../models/cs/PlayerSchema");
const CSMatch = require("../models/cs/MatchSchema");

router.get("/players", async (req, res) => {
    try {
        const players = await CSPlayer.find({}); 
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
                _id : "66b3c63d9d4af699dd7a217f",
                playerId: "11893",
                firstName: "ZywOo",
                lastName: "",
                picId: "",
                team: 'Vitality',
                teams: ["Vitality"],
                matches: [],
                kills: "",
                assists: "",
                deaths: "",
                headshots: ''
            }
        ]
        res.status(200).json(players);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
})

router.post("/dummy/matches", async (req, res) => {
    try {
        let games = [];
        const {firstName, teams} = req.body;
        const testGames = [
            {
                url: "/matches/2373792/vitality-vs-astralis-blast-premier-fall-groups-2024",
                team1: "Vitality",
                team2: "Astralis",      
                date :"08/03/2024",
                maps: [
                    {
                        players: [
                            {
                                name: "cptkurtka023",
                                kills: "28",
                                headshots: "13",
                                assists: "11",
                                deaths: "23",
                                team: "B8",
                            },
                            {
                                name: "ZywOo",
                                kills: "28",
                                headshots: "13",
                                assists: "11",
                                deaths: "23",
                                team: "B8",
                            },
                        ]
                    }
                ],
            }
        ];

        /* 
            We look though the teams and find each match 
            with that team then check the player to ensure that 
            player is there 
        */
        testGames.forEach((game, index) => {
            let teamFound = teams.find(team => team === game.team1 || team === game.team2);
            let playerFound = game.maps[0].players.find(player => player.name === firstName);

            if(teamFound && playerFound){
                games.push(game);
            }
        })
        games.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('/'));
            const dateB = new Date(b.date.split('/').reverse().join('/'));
            return dateB - dateA;
        });

        res.status(200).json(games);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
})
router.post("/matches", async (req, res) => {
    try {
        const { team } = req.body;

        const matches = await CSMatch.find({
            $or: [{ team1: team }, { team2: team }]
        });

        res.status(200).json(matches);
    } catch (err) {
        console.error("Error fetching matches", err);
        res.status(500).send({ message: "Error fetching matches" });
    }
});

module.exports = router;