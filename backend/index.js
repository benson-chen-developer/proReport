const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
require('dotenv').config();

const ValorantRoute = require('./routes/Valorant');
const CSRoute = require('./routes/CS');
const RainbowRoute = require('./routes/Rainbow');
const TrendingRoute = require('./routes/Trending');
const EsportRoute = require('./routes/Esport');
const PsportRoute = require('./routes/Psport');
const ProjectionRoute = require('./routes/Projection');
const AuthRoute = require('./routes/Auth');

const NBARoute = require('./routes/NBA');
const MLBRoute = require('./routes/MLB');

const { Promo } = require("./models/Promos/PromoModel");

const app = express();
app.use(cors({
    origin: process.env.LOCAL_ROUTE_FRONT,
    credentials: true
}));
app.use(express.json());

/* TEST : See what the incoming req look like */
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

app.use("/trending", TrendingRoute);
app.use("/cs", CSRoute);
app.use("/valorant", ValorantRoute);
app.use('/rainbow', RainbowRoute);
app.use('/esport', EsportRoute);
app.use('/psport', PsportRoute);
app.use('/projections', ProjectionRoute);
app.use('/auth', AuthRoute);

app.use('/nba', NBARoute);
app.use('/mlb', MLBRoute);

app.get("/promo", async (req, res) => {
    try {
        const promos = await Promo.find({});

        res.status(200).json(promos);
    } catch (err) {
        console.error("Error fetching players", err);
        res.status(500).send({ message: "Error fetching players" });
    }
});

/*
    Gets the list of all league players on the homepage
*/
app.get("/lol/allPlayers", async (req, res) => {
    const response = await axios.get("https://gol.gg/players/list/season-S14/split-Summer/tournament-ALL/");
    const html = response.data;

    const $ = cheerio.load(html);
    const players = [];

    $('table.table_list.playerslist.tablesaw.trhover tr').slice(1).each((index, element) => {
        let player = {
            firstName : $(element).find('td a').first().text().trim(),
            lastName: '',
            picId: '',
            playerId: $(element).find('td a').first().attr('href').match(/\/player-stats\/(\d+)\//)[1],
            kills : $(element).find('td').eq(5).text().trim(),
            deaths : $(element).find('td').eq(6).text().trim(),
            assists : $(element).find('td').eq(7).text().trim(),
            team: ''
        }
        players.push(player)
    });

    res.json(players);
})

app.get("/lol/player/:id", async (req, res) => {
    const response = await axios.get(`https://gol.gg/players/player-matchlist/${req.params.id}/season-S14/split-Summer/tournament-ALL/`);
    const html = response.data;

    const $ = cheerio.load(html);
    const games = [];

    $('table.table_list.footable.toggle-square-filled tbody tr').each((index, element) => {
        const championElement = $(element).find('td a').first();
        const championName = championElement.text().trim();
        const championHref = championElement.attr('href');
        const championNumber = championHref ? championHref.match(/\/champion-stats\/(\d+)\//)[1] : null;

        // const result = $(element).find('td').eq(1).text().trim();
        const score = $(element).find('td').eq(2).text().trim();
        // const build = $(element).find('td').eq(3).html(); 
        // const duration = $(element).find('td').eq(4).text().trim();
        const date = $(element).find('td').eq(5).text().trim();
        const game = $(element).find('td').eq(6).text().trim();
        const tournament = $(element).find('td').eq(7).text().trim();

        let foundGame = games.find(g => g.date === date && g.game === game);

        if(foundGame){
            foundGame.scores.push(score);
        } else {
            games.push({
                champion: {
                    name: championName,
                    number: championNumber
                },
                scores: [score],
                date: date,
                game: game,
                tournament: tournament
            });
        }

    });
    
    res.json(games);
})

/*
    CFL
*/
app.get("/cfl/allPlayers", async (req, res) => {
    const response = await axios.get("https://gol.gg/players/list/season-S14/split-Summer/tournament-ALL/");
    const html = response.data;

    const $ = cheerio.load(html);
    const players = [];

    // $('table.table_list.playerslist.tablesaw.trhover tr').slice(1).each((index, element) => {
    //     let player = {
    //         firstName : $(element).find('td a').first().text().trim(),
    //         lastName: '',
    //         picId: '',
    //         id: $(element).find('td a').first().attr('href').match(/\/player-stats\/(\d+)\//)[1],
    //         kills : $(element).find('td').eq(5).text().trim(),
    //         deaths : $(element).find('td').eq(6).text().trim(),
    //         assists : $(element).find('td').eq(7).text().trim(),
    //         team: ''
    //     }
    //     players.push(player)
    // });

    res.json(players);
})


mongoose.connect(process.env.NEXT_MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3001, () => {
            console.log("Server is Running on port 3001");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });
// app.listen(3001, () => {
//     console.log("Server is Running on port 3001");
// });