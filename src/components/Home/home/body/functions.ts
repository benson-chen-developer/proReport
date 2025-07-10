import { PopularProp, Projection } from "../../../../Context/Types/ProjectionTypes";
import { Filter } from "../../../Outlier/Matches";

/*
    We return a new array of popularprops via looping all the popularprops
        1) Show the popular players up top
        2) Only have 2 player cards of same player show up max
*/
export const prettierPopularProps = (popularProps: PopularProp[]): PopularProp[] => {
    let ret: PopularProp[] = [];
    
    /* 1) Show the popular players up top */
    const popularPlayerProps: PopularProp[] = [];
    const notPopularPlayerProps: PopularProp[] = [];

    popularProps.forEach((popularProp) => {
        if(popularPlayers.includes(popularProp.propRef.player.name)) popularPlayerProps.push(popularProp);
        else notPopularPlayerProps.push(popularProp);
    })

    /* 2) Only have 2 player cards of same player show up max */
    const popularPlayersMap: Record<string, PopularProp[]> = {};  

    popularPlayerProps.forEach(prop => {
        const playerName = prop.propRef.player.name;

        if (popularPlayersMap[playerName]) {
            popularPlayersMap[playerName].push(prop);
        } else {
            popularPlayersMap[playerName] = [prop];
        }
    });
    
    /* Gets a few of the popular players and puts them up top */
    Object.entries(popularPlayersMap).forEach(([playerName, projections]) => {
        ret.push(projections[0]);
        projections.splice(0, 1);

        if(projections.length > 1) {
            ret.push(projections[0]);
            projections.splice(0, 1);
        }
    });

    /* Places the rest of the players below that */
    const restOfPopularPlayers:PopularProp[] = [];
    Object.entries(popularPlayersMap).forEach(([playerName, projections]) => {
        restOfPopularPlayers.push(...projections);
    });
    
    const restOfPlayers = [...restOfPopularPlayers, ...notPopularPlayerProps];
    ret.push(...restOfPlayers);
    
    return ret;
}

/* 1 most 3 least */
const getPriority = (filter: Filter, hitsArr: boolean[]): number => {
    const hitPercent = Math.round(hitsArr.filter(hit => hit).length / hitsArr.length);

    if(hitsArr.length >= 20 && hitPercent >= .9) return 1;

    else return 3;
}

const popularPlayers = [
    "Jayson Tatum",
    "Jaylen Brown",
    "Jalen Brunson",
    "Karl-Anthony Towns",
    "Tyrese Maxey",
    "Joel Embiid",
    "Paul George",
    "Scottie Barnes",
    "Lonzo Ball",
    "Coby White",
    "Josh Giddey",
    "Donovan Mitchell",
    "Jarrett Allen",
    "Darius Garland",
    "Evan Mobley",
    "Cade Cunningham",
    "Jalen Duren",
    "Ausar Thompson",
    "Tyrese Haliburton",
    "Pascal Siakam",
    "Damian Lillard",
    "Giannis Antetokounmpo",
    "Kyle Kuzma",
    "Trae Young",
    "LaMelo Ball",
    "Miles Bridges",
    "Brandon Miller",
    "Tyler Herro",
    "Andrew Wiggins",
    "Nikola Jokic",
    "Russell Westbrook",
    "Anthony Edwards",
    "Rudy Gobert",
    "Shai Gilgeous-Alexander",
    "Chet Holmgren",
    "Jalen Williams",
    "Scoot Henderson",
    "Anfernee Simons",
    "Collin Sexton",
    "Jordan Clarkson",
    "Collin Sexton",
    "Jimmy Butler",
    "Jonathan Kuminga",
    "Stephen Curry",
    "James Harden",
    "Kawhi Leonard",
    "Ivica Zubac",
    "Austin Reaves",
    "LeBron James",
    "Luka Doncic",
    "Devin Booker",
    "Kevin Durant",
    "Bradley Beal",
    "Zach LaVine",
    "DeMar DeRozan",
    "Domantas Sabonis",
    "Kyrie Irving",
    "Klay Thompson",
    "Anthony Davis",
    "Amen Thompson",
    "Jalen Green",
    "Alperen Sengun",
    "Jaren Jackson Jr.",
    "Ja Morant",
    "Desmond Bane",
    "Zach Edey",
    "Zion Williamson",
    "Dejounte Murray",
    "Trey Murphy III",
    "Victor Wembanyama",
    "Chris Paul",
    "Stephon Castle",
    "De'Aaron Fox",
    "Devin Vassell"
]