import { CSGame, EGame, PlayerType } from "../../../Context/PlayerTypes";

export class CS {
    static allPickedBtns = ["All Maps", "Map 1", "Map 2", "Map 3", "Map 1+2"];
    static statsHeader = [
        {name: "K", underName: "Kills"},
        {name: "HS", underName: "Headshots"},
        {name: "D", underName: "Deaths"},
        {name: "A", underName: "Assists"},
    ];

    static compareFunction = (pickedBtn: string, allTheGames: CSGame[], name: string): number[][] => {
        /* 
            Pass all the map indexes we wanna add up (Example)
                - [1] means get map 1
                - [1, 2] means maps 1+2
        */
        const addUpMaps = (mapIndexes: number[]): number[][] => {
            let ret: number[][] = [];
            
            allTheGames.forEach(game => {
                let intial: number[] = Array(this.statsHeader.length).fill(0);
                let skipThisGame = false;

                for(let i=0; i<mapIndexes.length; i++){
                    const mapIndex = mapIndexes[i];

                    /* This means this map was never played */
                    if(mapIndex > game.maps.length - 1 || game.maps[mapIndex] === undefined) {
                        intial = Array(this.statsHeader.length).fill(-1);
                    } else {
                        const players = game.maps[mapIndex].players;
                        const didPlay = game.maps[mapIndex].didPlay;

                        if(players){
                            const boxScore = players.find(p => p.name.toLowerCase() === name.toLowerCase());
                            
                            if(boxScore){
                                if(didPlay){
                                    intial[0] += parseFloat(boxScore!.kills);
                                    intial[1] += parseFloat(boxScore!.headshots);
                                    intial[2] += parseFloat(boxScore!.deaths);
                                    intial[3] += parseFloat(boxScore!.assists);
                                }
                            } else {
                                /* This game needs to be removed (player prob was subbed) */
                                skipThisGame = true;
                            }
                        }
                    }
                }

                if(!skipThisGame) ret.push(intial);
            })

            return ret;
        };

        let displayedRows: number[][] = [];
        if(pickedBtn === "All Maps") displayedRows = addUpMaps([0,1,2])
        else if(pickedBtn === "Map 1") displayedRows = addUpMaps([0])
        else if(pickedBtn === "Map 2") displayedRows = addUpMaps([1])
        else if(pickedBtn === "Map 3") displayedRows = addUpMaps([2])
        else if(pickedBtn === "Map 1+2") displayedRows = addUpMaps([0,1])

        return displayedRows;
    }

    static fetchMatches = async (foundPlayer: PlayerType): Promise<EGame[]> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/cs/matches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({team: foundPlayer.team})
        });
        const allGames = await res.json();
        const sortedGames = allGames.sort((a: { date: string }, b: { date: string }) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return sortedGames;
    }  
}