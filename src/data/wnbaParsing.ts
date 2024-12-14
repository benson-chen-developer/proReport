import { fillStats, Game2 } from "../functions/players";
import wnbaData from './wnba.json';


/*
    Basically we check the past 2 weeks for games 
    (Not sure if this is a good way since what if they are injured? Need to find a way to find
    all games players played)
*/
export const wnbaParsing = async (
    games: Game2[], startDate: Date, endDate: Date, paramName: string
): Promise<Game2[]> => {
    let newGames: Game2[] = [];
    const wnbaDataSliced = wnbaData.slice(wnbaData.findIndex(day => new Date(day.gameDate) >= startDate));

    // Create an array to store all fetch promises
    let fetchPromises: Promise<void>[] = [];

    for (let i = 0; i < wnbaDataSliced.length; i++) {
        const day = wnbaDataSliced[i];
        const currDate = new Date(day.gameDate);
    
        // This date has passed so we can parse (unless it is the same day)
        if (currDate < endDate) {
            for (const game of day.games) {
                /* 
                    Look through our games array and if a game with that id is already here then
                    don't reparse it
                */
                if(!games.find(parsedGame => parsedGame.id === game.gameId))
                fetchPromises.push(
                    fetch(`https://content-api-prod.nba.com/public/1/leagues/wnba/game/${game.gameId}`)
                        .then(res => res.json())
                        .then(async (gamesRes) => {
                            const players = [...gamesRes.results.depthCharts[0].players, ...gamesRes.results.depthCharts[1].players];
                            
                            for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
                                // Basically takes the name Cait Clark to C. Clark
                                let parsedName = `${players[playerIndex].firstName[0]}. ${players[playerIndex].lastName}`;
                
                                if (paramName.toLocaleLowerCase() === parsedName.toLocaleLowerCase()) {
                                    const gameDataRes = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/parseGame`, { //Load Game data
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'url': 'https://cdn.wnba.com/static/json/liveData/playbyplay/playbyplay_urlMe.json',
                                            'gameid': game.gameId
                                        }
                                    })

                                    if(gameDataRes.status === 500){ 
                                        //This game hasn't happened yet. Should never get to this point
                                        //as we never pass in an end date above the current day so something
                                        // went wrong
                                    } else {
                                        const gameData = await gameDataRes.json();
                                        newGames.push({
                                            ...gameData,
                                            stats: fillStats(parsedName, "Whole Game", gameData.actions),
                                            id: game.gameId
                                        });
                                    }
                                    break;
                                }
                            }
                        })
                        .catch(err => {
                            console.log('betterLoadGames err', err);
                        })
                );
            }
        } else {
            break;
        }
    }

    // Wait for all fetch promises to complete
    await Promise.all(fetchPromises);

    return newGames;
};

/*
    We check what team the player is on and look at the schedule for games with that team

    Can be used in loadmore since it only loads new stuff and not on top of oldGames

    playerName should be in Caitlyn Clark format
    TeamName is just Wings (if for Dallas Wings) 
*/
export const loadGamesByTeam = async (oldGames: Game2[], playerName: string, teamName: string): Promise<Game2[]> => {
    let newGames: Game2[] = [];
    let firstName = playerName.split(' ')[0][0];
    let lastName = playerName.split(' ')[1];

    let fetchPromises: Promise<void>[] = [];

    /*
        We get the schedule and remove and games that we already have in the oldGames
    */
    let schedule = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/wnbaScedule`);
    let parsedWbna = await schedule.json();
    let gameDatesArray = parsedWbna.leagueSchedule.gameDates;

    let loadIndex = 0; let maxLoad = 5; /* We load 5 games at a time */
    for (let i = gameDatesArray.length-1; (i > 0 && loadIndex < maxLoad); i--) {
            const currData = gameDatesArray[i];

            /*
                At this step all the items look like this
                gameDate: "05/03/2024 00:00:00"
                games : [{…}, {…}]
            */
            for (const game of currData.games) {
                if(loadIndex >= maxLoad) break; /* Only load 5 games at a time */

                /*
                    We take only the games that are finsihed, has our team, and isn't already in the old teams array
                */
                if(
                    game.gameStatusText === "Final" && 
                    (game.homeTeam.teamName === teamName || game.awayTeam.teamName === teamName) &&
                    !oldGames.find(oldGame => oldGame.id === game.gameId)
                ){
                    loadIndex++;
                    fetchPromises.push(
                        fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/wnba/gameStatsBigPicture/${game.gameId}`)
                            .then(res => res.json())
                            .then(async (gamesRes) => {
                                const players = [...gamesRes.results.depthCharts[0].players, ...gamesRes.results.depthCharts[1].players];
                                
                                const foundPlayer = players.find(player => `${player.firstName} ${player.lastName}`.toLowerCase() === playerName.toLowerCase());

                                /* Player name is found so we add it */
                                if (foundPlayer) {
                                    const gameDataRes = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/parseGame`, { //Load Game data
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'url': 'https://cdn.wnba.com/static/json/liveData/playbyplay/playbyplay_urlMe.json',
                                            'gameid': game.gameId
                                        }
                                    })

                                    if(gameDataRes.status === 500){ 
                                        //This game hasn't happened yet. Should never get to this point
                                        //as we never pass in an end date above the current day so something
                                        // went wrong
                                    } else {
                                        const gameData = await gameDataRes.json();
                                        newGames.push({
                                            ...gameData,
                                            stats: fillStats(`${firstName}. ${lastName}`, "Whole Game", gameData.actions),
                                            id: game.gameId
                                        });
                                    }
                                }
                            })
                            .catch(err => {
                                console.log('betterLoadGames err', err);
                            })
                    );
                }
            }
    }

    await Promise.all(fetchPromises);

    return [...oldGames, ...newGames];
}
