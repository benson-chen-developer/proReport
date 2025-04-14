const express = require("express");
const router = express.Router();
const { Props, TestProps } = require("../models/Projection/PropModel");

router.get('/popular', async (req, res) => {
    try {
        const projections = await Props.find({
            popularHits: { $exists: true, $not: { $size: 0 } } // Only fetch documents where popularHits exists and is not empty
        })
        .populate("player")
        .lean(); 

        res.status(200).json(projections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const projections = await Props.find({}).populate("player");
        res.status(200).json(projections); // Use 200 for a successful GET response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.get('/:playerName', async (req, res) => {
router.get('/:playerName', async (req, res) => {
    try {
        const { playerName } = req.params;

        // const projections = await TestProps.aggregate([
        const projections = await Props.aggregate([
            {
                $lookup: {
                    from: 'nbaplayers', // Collection name of the referenced model
                    localField: 'player',
                    foreignField: '_id',
                    as: 'playerData'
                }
            },
            { $unwind: '$playerData' }, // Convert array to object
            { $match: { 'playerData.name': playerName } } // Filter by player's name
        ]);

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
                    as: 'playerData'
                }
            },
            { $unwind: '$playerData' }, // Convert array to object
            { $match: { 'playerData.name': playerName } } // Filter by player's name
        ]);


        res.status(200).json(projections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;