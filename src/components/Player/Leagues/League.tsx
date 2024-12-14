import { EGame, LolGame, PlayerType } from "../../../Context/PlayerTypes";

export class League {
    static allPickedBtns = ["All Maps", "Map 1", "Map 2", "Map 3", "Map 1+2", "Map 1+2+3", "Map 4", "Map 5"];
    static statsHeader = [
        {name: "K", underName: "Kills"},
        {name: "D", underName: "Deaths"},
        {name: "A", underName: "Assists"},
    ];

    static compareFunction = (pickedBtn: string, allTheGames: LolGame[]): number[][] => {
        /* This takes the strings '3/3/3' and adds up the columns */
        const addUpMaps = (...maps: (string | undefined | null)[]): number[] => {
            // Check if any map is null, undefined, or out of range
            if (maps.some(map => !map || map === '-1/-1/-1')) {
                return [-1];
            }
            const sums = [0, 0, 0];
            
            maps.forEach(map => {
                const parts = map!.split('/').map(Number);
                for (let i = 0; i < parts.length; i++) {
                    sums[i] += parts[i];
                }
            });
        
            return sums;
        };

        if(pickedBtn === "All Maps"){
            return (allTheGames.map((game) => addUpMaps(...game.scores.slice().reverse())))
        }
        else if(pickedBtn === "Map 1"){
            return(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[0])))
        }
        else if(pickedBtn === "Map 2"){
            return(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[1])))
        }
        else if(pickedBtn === "Map 3"){
            return(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[2])))
        }
        else if(pickedBtn === "Map 1+2"){
            return(allTheGames.map((game) => addUpMaps(...game.scores.slice().reverse().slice(0, 2))))
        }
        else if(pickedBtn === "Map 1+2+3"){
            return(allTheGames.map((game) => addUpMaps(...game.scores.slice().reverse().slice(0, 3))))
        }
        else if(pickedBtn === "Map 4"){
            return(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[3])))
        }
        else if(pickedBtn === "Map 5"){
            return(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[4])))
        }

        return [];
    }

    static GetTeamName = (games: LolGame[]): string => {
        let firstGame = games[0]; let secondGame = games[1];
        let names: string[] = [];

        if(firstGame && secondGame){
            names = [
                firstGame.game.split('vs')[0], firstGame.game.split('vs')[1], 
                secondGame.game.split('vs')[0], secondGame.game.split('vs')[1]
            ]
        }
        for (let i = 0; i < names.length; i++) {
            for (let j = i + 1; j < names.length; j++) {
                if (names[i].toLocaleLowerCase() === names[j].toLocaleLowerCase()) {
                    return names[i].trim();
                }
            }
        }
        
        return ''; 
    };

    static fetchMatches = async (foundPlayer: PlayerType): Promise<LolGame[]> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/lol/player/${foundPlayer.playerId}`)
        const allGames = await res.json();
        return allGames;
    }  

    static convertToEGames = (lolGames: LolGame[]): EGame[] => {
        const eGames: EGame[] = [];

        lolGames.forEach(lolGame => {
            eGames.push({
                team1: lolGame.game.split(' ')[0],
                team2: lolGame.game.split(' ')[2],
                url: lolGame.url,
                date: lolGame.date,
                maps: [{
                    map: '',
                    didPlay: true,
                    players: [
                        ...lolGame.scores.map(data => ({
                            name: '', 
                            team: '',
                            stats: [
                                { name: 'kills', count: parseInt(data.split(' ')[0], 10) },
                                { name: 'deaths', count: parseInt(data.split(' ')[1], 10) },
                                { name: 'assists', count: parseInt(data.split(' ')[2], 10) }
                            ]
                        }))
                    ]
                }]
            });
        });

        return eGames;
    }
}