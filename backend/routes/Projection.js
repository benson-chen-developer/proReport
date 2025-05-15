const express = require("express");
const router = express.Router();
const { Props, TestProps } = require("../models/Projection/PropModel");
const { PopularProp } = require("../models/PopularProp");

router.get('/', async (req, res) => {
    try {
        const projections = await TestProps.aggregate([
            {
                $lookup: {
                    from: 'players', // dynamically get collection name
                    localField: 'player',
                    foreignField: '_id',
                    as: 'playerData'
                }
            },
            { $unwind: '$playerData' },
            {
                $addFields: {
                    player: '$playerData' // Replace 'player' field with full object
                }
            },
            {
                $project: { playerData: 0 } // remove the temp field
            }
        ]);

        res.status(200).json(projections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/popular', async (req, res) => {
    try {
        const projections = await PopularProp.find({})
            .populate({
                path: "propRef",
                populate: { path: "player" }
            });
            // .lean(); 

        res.status(200).json(projections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:league/:playerName', async (req, res) => {
    try {
        const { playerName, league } = req.params;

        const projections = await TestProps.aggregate([
        // const projections = await Props.aggregate([
            {
                $lookup: {
                  from: `${league.toLowerCase()}players`,
                  localField: 'player',
                  foreignField: '_id',
                  as: 'player'
                }
            },
            { $unwind: '$player' }, // Unwind the 'player' array into an object
            { $match: { 'player.name': playerName } } // Filter by player's name
        ]);


        res.status(200).json(projections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.get('/players', async (req, res) => {
//     try {
//         const projections = await TestProps.find({}).populate("player");
//         res.status(200).json(projections); // Use 200 for a successful GET response
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


module.exports = router;