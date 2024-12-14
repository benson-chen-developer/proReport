import { CSGame, EGame, PlayerType, RainbowGame, RainbowPlayer } from "../../../Context/PlayerTypes";

export class Rainbow {
    static allPickedBtns = ["All Maps", "Map 1", "Map 2", "Map 3", "Map 1+2"];
    static statsHeader = [
        {name: "K", underName: "Kills"},
        {name: "D", underName: "Deaths"},
    ];

    static compareFunction = (pickedBtn: string, newAllGames: RainbowGame[], name: string): number[][] => {
        const addUpMaps = (pickedNumbers: number[], game: RainbowGame) => {
            let statsArr: number[] = Array(this.statsHeader.length).fill(0);
            let didNotPlayAtAll = true;

            for(let number of pickedNumbers){
                let map = game.maps[number];
                
                if(map && map.didPlay){
                    let playerStats = map.players.find(p => p.name === name)
                    statsArr[0] += Number(playerStats!.kills)
                    statsArr[1] += Number(playerStats!.deaths)
                    didNotPlayAtAll = false;
                } else {
                    if(didNotPlayAtAll) return [-1];
                }
            }

            return statsArr;
        }

        let displayStats: number[][] = [];
        if(pickedBtn === 'All Maps') {
            displayStats = newAllGames.map((game) => addUpMaps([0,1,2], game))
        } 
        else if(pickedBtn === 'Map 1'){
            displayStats = newAllGames.map((game) => addUpMaps([0], game))
        }
        else if(pickedBtn === 'Map 2'){
            displayStats = newAllGames.map((game) => addUpMaps([1], game))
        }
        else if(pickedBtn === 'Map 3'){
            displayStats = newAllGames.map((game) => addUpMaps([2], game))
        }
        else if (pickedBtn === 'Map 1+2') {
            displayStats = newAllGames.map((game) => addUpMaps([0,1], game));
        }

        return displayStats;
    }

    static fetchMatches = async (foundPlayer: PlayerType): Promise<EGame[]> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/rainbow/matches`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({team: foundPlayer?.team}) 
        });
        const allGames = await res.json();
        const sortedGames = allGames.sort((a: { date: string }, b: { date: string }) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return sortedGames;
    }  
}