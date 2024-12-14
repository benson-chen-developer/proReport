import { EGame, Game, PGame, PGamePlayer, PlayerType } from "../../../Context/PlayerTypes";

export class WNBA {
    static allPickedBtns = ["Whole Game", "1st Half", "2nd Half", "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];
    static statsHeader = [
        {name: "PTS", underName: "Points"},
        {name: "REB", underName: "Rebounds"},
        {name: "AST", underName: "Assists"},
        {name: "STL", underName: "Steals"},
        {name: "BLK", underName: "Blocks"},
        {name: "TO", underName: "Turn Overs"},
        {name: "PF", underName: "Fouls"},
        {name: "FGM", underName: "Field Goals Made"},
        {name: "FGA", underName: "Field Goals Attempted"},
        {name: "3PM", underName: "3 Pointers Made"},
        {name: "3PA", underName: "3 Pointers Attempted"},
        {name: "FTM", underName: "Free Throws Made"},
        {name: "FTA", underName: "Free Throws Attempted"},
        {name: "FAN", underName: "Fantasy Score"},
        {name: "PR", underName: "Points + Rebounds"},
        {name: "PA", underName: "Points + Assists"},
        {name: "PRA", underName: "Points + Rebounds + Assists"},
        {name: "RA", underName: "Rebounds + Assists"},
    ];

    static FantasyScoring = (stat: string, amount: number): number => {
        if(stat === "PTS") return 1*amount;
        else if(stat === "REB") return 1.2*amount;
        else if(stat === "AST") return 1.5*amount;
        else if(stat === "STL") return 3*amount;
        else if(stat === "BLK") return 3*amount;
        else if(stat === "TO") return -1*amount;
        else return 0;
    }

    static compareFunction = (pickedBtn: string, pGames: PGame[],  firstName:string, lastName: string): number[][] => {
        /*
            - condition can be Q1, Q2, Q3, Q4, H1, H2, W
            - playerName should be in C. Clark format
            - if playerName is "" then just get all stats
        */
        const fillStats = (playerName: string, condition: string, players: PGamePlayer[]): number[] => {
            let foundPlayer = players.find(player => player.name === playerName);
            let stats: any = {};

            if (foundPlayer) {
                if (condition === "1st Quarter") stats = foundPlayer.stats[0];
                else if (condition === "2nd Quarter") stats = foundPlayer.stats[1];
                else if (condition === "3rd Quarter") stats = foundPlayer.stats[2];
                else if (condition === "4th Quarter") stats = foundPlayer.stats[3];
                else if (condition === "1st Half") {
                    stats = { ...foundPlayer.stats[0] };
                    let secondHalfStats: any = foundPlayer.stats[1];
                    for (let key in secondHalfStats) {
                        stats[key] = (stats[key] || 0) + (secondHalfStats[key] || 0);
                    }
                }
                else if (condition === "2nd Half") {
                    stats = { ...foundPlayer.stats[2] };
                    let secondHalfStats: any = foundPlayer.stats[3];
                    for (let key in secondHalfStats) {
                        stats[key] = (stats[key] || 0) + (secondHalfStats[key] || 0);
                    }
                }
                else if (condition === "Whole Game") {
                    stats = { ...foundPlayer.stats[0] };
                    let secondQ: any = foundPlayer.stats[1];
                    let thirdQ: any = foundPlayer.stats[2];
                    let fourthQ: any = foundPlayer.stats[3];
                    for (let key in secondQ) {
                        stats[key] = (stats[key] || 0) + (secondQ[key] || 0);
                    }
                    for (let key in thirdQ) {
                        stats[key] = (stats[key] || 0) + (thirdQ[key] || 0);
                    }
                    for (let key in fourthQ) {
                        stats[key] = (stats[key] || 0) + (fourthQ[key] || 0);
                    }
                }
            }
            delete stats["_id"];

            /* Fantasy + PR + PA + PRA + RA*/
            let fanAmount = -1;
            for (let key in stats) {
                if(fanAmount === -1) fanAmount = 0;
                let value = stats[key];
                fanAmount += this.FantasyScoring(key, value);
            }
            stats.FAN = parseFloat(fanAmount.toFixed(1))
            stats.PR = stats.PTS + stats.REB;
            stats.PA = stats.PTS + stats.AST;
            stats.PRA = stats.PTS + stats.REB + stats.AST;
            stats.RA = stats.REB + stats.AST;

            return [...Object.values(stats) as number[]];
        }

        const allTheDisplayedStats: number[][] = [];
        pGames.forEach((game) => {
            allTheDisplayedStats.push(fillStats(`${firstName[0]}. ${lastName}`, pickedBtn, game.players))
        })
        
        // console.log(allTheDisplayedStats)
        return allTheDisplayedStats;
    }

    static fetchMatches = async (foundPlayer: PlayerType): Promise<PGame[]> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/wnba/player/${foundPlayer.team}`);
        const allGames = await res.json();
        allGames.sort((a: Game, b: Game) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });

        return allGames;
    }
}