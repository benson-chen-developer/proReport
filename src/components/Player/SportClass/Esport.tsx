import { EGame2 } from "../../../Context/ESport";

export class ESport {
    static getAllPickedBtns = (league?: string): string[] => {
        if(league === "valorant"){
            return ["All Maps", "Map 1+2", "Map 1+2+3"];
        }
        else {
            return ["All Maps", "Map 1+2", "Map 1+2+3"];
        }
    }
    static getStatsHeader = (league: string): {name: string, underName: string}[] => {
        if(league === "valorant"){
            return [
                {name: "K", underName: "Kills"},
                {name: "D", underName: "Deaths"},
                {name: "A", underName: "Assists"},
                {name: "FK", underName: "First Kills"},
                {name: "FD", underName: "First Deaths"},
            ];
        }
        else {
            return [];
        }
    }

    static compareFunction = (pickedBtn:string, newAllGames: EGame2[], name: string, league: string): number[][] => {
        const statsHeader = this.getStatsHeader(league);
        const allPickedBtns = this.getAllPickedBtns(league);

        const addUpMaps = (pickedNumbers: number[], game: EGame2) => {
            let statsArr: number[] = Array(statsHeader.length).fill(0);

            /* Scenrio in which we pick map 3 but there was no played map 3 */
            if(pickedNumbers.length === 1 && pickedNumbers[0] === 2 && !game.maps[2].didPlay){
                return Array(statsHeader.length).fill(-1);
            } 
            
            for (let number of pickedNumbers) {
                let map = game.maps[number];
        
                if (number < game.maps.length && map.didPlay) {
                    let playerStats = map.players.find(p => p.name === name);
                    if (playerStats) {
                        const statKeys = Object.keys(playerStats.stats);
                        statKeys.forEach((key, index) => {
                            if (index < statsArr.length) {
                                statsArr[index] += Number(playerStats!.stats[key]);
                            }
                        });
                    } else {
                        return [-1];
                    }
                }
            }

            return statsArr;
        }

        /* Would look like All Maps, Map 1, Map 1+2 */
        const getMapIndices = (pickedBtn: string): number[] => {
            const parts = pickedBtn.split('+').map(part => part.trim());

            if(pickedBtn === "All Maps") return [0,1,2,3,4]; //Hard coded 5 maps
        
            return parts.map(part => {
                const mapNumber = parseInt(part.replace('Map ', '')); 
                return mapNumber - 1;
            });
        };

        let displayStats: number[][] = newAllGames.map((game) => addUpMaps(getMapIndices(pickedBtn), game));

        return displayStats;
    }


    static fetchMatches = async (playerName: string, league: string): Promise<EGame2[]> => {
        // console.log("this shi", `${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/esport/matches/${league}/${playerName}`)
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/esport/matches/${league}/${playerName}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const allGames = await res.json();
        const sortedGames = allGames.sort((a: { date: string }, b: { date: string }) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return sortedGames;
    }  
}