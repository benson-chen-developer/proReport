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

router.post('/projections', async (req, res) => {
    const data = json.data; 
    const projections = [];
    const players = json.included.filter(d => d.type === "new_player" && d.attributes.league === "NBA");

    data.slice(0,1000).forEach((d) => {
        if(d.type === "projection"){
            const foundPlayer = players.find(p => p.id === d.relationships.new_player.data.id);

            if(foundPlayer){
                projections.push({
                    value: d.attributes.line_score,
                    name: d.attributes.stat_type,
                    playerName: foundPlayer.attributes.name,
                    updated_at: d.attributes.updated_at,
                    sportsbook: 'prizepicks'
                })
            }
        }
    })

    console.log(projections[2])
    const newProp = new Props(projections[2]);
    await newProp.save()

    res.status(201).json(newProp);
})

module.exports = router;