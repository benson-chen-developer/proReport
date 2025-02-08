const express = require("express");
const router = express.Router();
const { Props } = require("../models/Projection/PropModel");

router.get('/', async (req, res) => {
    try {
        const projections = await Props.find({});
        res.status(200).json(projections); // Use 200 for a successful GET response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;