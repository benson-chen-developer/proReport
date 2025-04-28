const express = require("express");
const { NBAPlayer, MLBPlayer, Player } = require("../models/Sport/PPlayerModel");
const { NBATeam, MLBTeam } = require("../models/Sport/Team");
const { MLBMatch, NBAMatch } = require("../models/Sport/Match");
const { MatchUp } = require("../models/Sport/MatchUp");
const router = express.Router();

router.get("/players/:league", async (req, res) => {
    const { league } = req.params;

    try {
        const players = await Player.find({sport: league});
        res.status(200).json(players);
    } catch (err) {
        console.error(`Error fetching ${league} players`, err);
        res.status(500).send({ message: `Error fetching ${league} players` });
    }
});

router.get("/teams/:league", async (req, res) => {
    const { league } = req.params;

    const modelMap = {
        nba: NBATeam,
        mlb: MLBTeam,
    };
    const Model = modelMap[league.toLowerCase()];
    if (!Model) {
        return res.status(400).json({ message: "Invalid league provided" });
    }

    try {
        const teams = await Model.find({});
        res.status(200).json(teams);
    } catch (err) {
        console.error(`Error fetching ${league} teams`, err);
        res.status(500).send({ message: `Error fetching ${league} teams` });
    }
});

router.get("/matchUps/:league", async (req, res) => {
    const league = req.params.league;

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const allMatchesButTheTeamsAreJustTheNames = await MatchUp.find({
            league: league,
            time: { $gte: today }
        });

        res.status(200).json(allMatchesButTheTeamsAreJustTheNames);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).json({ message: "Error fetching players" });
    }
});

/*
    We only populate the stats field for searched player
*/
router.get("/matches/:league/:playerName?", async (req, res) => { 
    let {league, playerName} = req.params;
    playerName = playerName.replace('_', ' '); 

    try {
        
        /* Map the Model */
        const modelMap = {
            nba: NBAMatch,
            mlb: MLBMatch,
        };
        const Model = modelMap[league.toLowerCase()];
        if (!Model) {
            return res.status(400).json({ message: "Invalid league provided" });
        }
        
        /* Call the Mongo API (Not Case Sensitive)*/
        const matches = await Model.aggregate([
            ...(playerName
                ? [
                    {
                        $match: {
                            $expr: {
                                $in: [
                                    playerName.toLowerCase(),
                                    {
                                        $map: {
                                            input: "$players",
                                            as: "p",
                                            in: { $toLower: "$$p.name" }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
                : []
            ),
            {
                $addFields: {
                    players: {
                        $map: {
                            input: "$players",
                            as: "player",
                            in: {
                                name: "$$player.name",
                                team: "$$player.team",
                                playerId: "$$player.playerId",
                                position: "$$player.position",
                                periods: {
                                    $cond: {
                                        if: {
                                            $eq: [
                                                { $toLower: "$$player.name" },
                                                playerName?.toLowerCase()
                                            ]
                                        },
                                        then: "$$player.periods",
                                        else: {}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            { $project: { _id: 0 } }
        ]);
        
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