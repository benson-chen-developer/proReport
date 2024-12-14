import { PGame } from "../../../Context/PlayerTypes";

export class PSport {
    static getAllPickedBtns = (league?: string): string[] => {
        if(league === "valorant"){
            return ["All Maps", "Map 1+2", "Map 1+2+3"];
        }
        else {
            return ["Game", "1H", "2H", "Q1", "Q2", "Q3", "Q4"];
        }
    }

    /* Returns the indexes for each period we should parse ia the stats */
    static getPeriods = (period: string, league: string): number[] => {
        let periods: number[] = [];

        if(league === 'nba'){
            if(period === 'All') periods = [0,1,2,3];
            else if(period === 'H1') periods = [0,1];
            else if(period === 'H2') periods = [2,3];
            else if(period === 'Q1') periods = [0];
            else if(period === 'Q2') periods = [1];
            else if(period === 'Q3') periods = [2];
            else if(period === 'Q4') periods = [3];
        }

        return periods;
    }

    static getStatsHeader = (league: string): {name: string, underName: string}[] => {
        if(league === "nba"){
            return [
                { name: "PTS", underName: "Points" },
                { name: "FGA", underName: "Field Goals Attempted" },
                { name: "FGM", underName: "Field Goals Made" },
                { name: "3PA", underName: "Three Pointers Attempted" },
                { name: "3PM", underName: "Three Pointers Made" },
                { name: "FTA", underName: "Free Throws Attempted"},
                { name: "FTM", underName: "Free Throws Made" },
                { name: "REB", underName: "Rebounds" },
                { name: "DRB", underName: "Defensive Rebounds" },
                { name: "ORB", underName: "Offensive Rebounds" },
                { name: "AST", underName: "Assists" },
                { name: "BLK", underName: "Blocks" },
                { name: "STL", underName: "Steals" },
                { name: "PF", underName: "Personal Fouls" },
                { name: "TOV", underName: "Turnovers" },
                { name: "MIN", underName: "Minutes Played" }
            ];
        }
        else {
            return [];
        }
    }
    static getAllPickedStats = (league: string): string[][] => {
        if(league === "nba"){
            return [
                ["PTS", "PTS+REB", "PTS+AST", "PTS+REB+AST"],
                ["REB", "ORB", "DRB"],
                ["AST"],
                ["BLK"],
                ["STL"],
                ["PF"],
                ["TOV"],
                ["FGM", "3PM", "FTM"], 
                ["FGA", "3PA", "FTA"], 
            ];
        }
        else {
            return [];
        }
    }

    static getPicUrl = (id: string, league: string): string => {
        if(league === "nba"){
            return `https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`
        }
        else return '';
    }

    static getFantasyStats = (league: string): {name:string, value: number}[] => {
        let stats: {name:string, value: number}[] = [];

        if(league === "nba"){
            stats.push(
                {name: "PTS", value:1}, {name: "REB", value: 1.2}, {name: "AST", value:1.5},
                {name: "BLK", value:3}, {name: "STL", value:3}, {name: "TOV", value:-1}
            )
        }

        return stats;
    }
    static calcFantasyScore = (league: string, stats: {name:string, value: number}[], gamesPlayed: number): number => {
        let score = 0;

        const fantasyScoring = this.getFantasyStats(league);
        stats.forEach((stat) => {
            let foundScoring = fantasyScoring.find((scoring) => scoring.name === stat.name);
            if(foundScoring) score += stat.value * foundScoring.value;
        })
    
        score = score / gamesPlayed;

        if(isNaN(score)) return 0;
        return score;
    } 

    // static compareFunction = (pickedBtn:string, newAllGames: EGame2[], name: string, league: string): number[][] => {
    //     const statsHeader = this.getStatsHeader(league);
    //     const allPickedBtns = this.getAllPickedBtns(league);

    //     const addUpPeriods = (pickedNumbers: number[], game: PGame) => {
    //         let statsArr: number[] = Array(statsHeader.length).fill(0);

    //         /* Scenrio in which we pick map 3 but there was no played map 3 */
    //         if(pickedNumbers.length === 1 && pickedNumbers[0] === 2 && !game.maps[2].didPlay){
    //             return Array(statsHeader.length).fill(-1);
    //         } 
            
    //         for (let number of pickedNumbers) {
    //             let map = game.maps[number];
        
    //             if (number < game.maps.length && map.didPlay) {
    //                 let playerStats = map.players.find(p => p.name === name);
    //                 if (playerStats) {
    //                     const statKeys = Object.keys(playerStats.stats);
    //                     statKeys.forEach((key, index) => {
    //                         if (index < statsArr.length) {
    //                             statsArr[index] += Number(playerStats!.stats[key]);
    //                         }
    //                     });
    //                 } else {
    //                     return [-1];
    //                 }
    //             }
    //         }

    //         return statsArr;
    //     }

    //     /* Would look like All Maps, Map 1, Map 1+2 */
    //     const getMapIndices = (pickedBtn: string): number[] => {
    //         const parts = pickedBtn.split('+').map(part => part.trim());

    //         if(pickedBtn === "All Maps") return [0,1,2,3,4]; //Hard coded 5 maps
        
    //         return parts.map(part => {
    //             const mapNumber = parseInt(part.replace('Map ', '')); 
    //             return mapNumber - 1;
    //         });
    //     };

    //     let displayStats: number[][] = newAllGames.map((game) => addUpMaps(getMapIndices(pickedBtn), game));

    //     return displayStats;
    // }


    static fetchMatches = async (playerName: string, league: string): Promise<PGame[]> => {
        const parsedName = playerName
            .split(' ') 
            .map(section => section.charAt(0).toUpperCase() + section.slice(1).toLowerCase())
            .join('_');

        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matches/${league}/${parsedName}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const allGames = await res.json();
        const gamesPlayed = allGames.filter((game: PGame) => {
            const foundPlayer = game.players.find(p => p.name.toLowerCase() === playerName.toLowerCase());
            return foundPlayer?.periods.some(period =>
                period.some(stat => stat.name === "MIN" && stat.value > 0)
            );
        });
        const sortedGames = gamesPlayed.sort((a: { date: string }, b: { date: string }) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return sortedGames;
    }  

    // static convertTeamStrings = (ogStr:string, param:string): string => {
    //     if(param === "")
    // }
}