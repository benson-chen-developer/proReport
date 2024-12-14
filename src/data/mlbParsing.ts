import { fillStats, Game2 } from "../functions/players";

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// export const mlbParsing = async (
//     startDate: Date, endDate: Date, paramName: string
// ): Promise<Game2[]> => {
//     let newGames: Game2[] = [];
    
//     //parseGameMLB
//     fetch('/mlbSchedule', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             startDate: formatDate(startDate),
//             endDate: formatDate(endDate)
//         }
//     })
//     .then(res => res.json())
//     .then(gameRes => {
//         console.log('gameRes', gameRes)
//     })

//     // Create an array to store all fetch promises
//     // let fetchPromises: Promise<void>[] = [];

//     // for (let i = 0; i < wnbaDataSliced.length; i++) {
//     //     const day = wnbaDataSliced[i];
//     //     const currDate = new Date(day.gameDate);
    
//     //     // This date has passed so we can parse (unless it is the same day)
//     //     if (currDate < endDate) {
//     //         for (const game of day.games) {
//     //             // Push each fetch promise into the fetchPromises array
//     //             fetchPromises.push(
//     //                 fetch(`https://content-api-prod.nba.com/public/1/leagues/wnba/game/${game.gameId}`)
//     //                     .then(res => res.json())
//     //                     .then(async (gamesRes) => {
//     //                         const players = [...gamesRes.results.depthCharts[0].players, ...gamesRes.results.depthCharts[1].players];
                            
//     //                         for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
//     //                             // Basically takes the name Cait Clark to C. Clark
//     //                             let parsedName = `${players[playerIndex].firstName[0]}. ${players[playerIndex].lastName}`;
                
//     //                             if (paramName.toLocaleLowerCase() === parsedName.toLocaleLowerCase()) {
//     //                                 const gameDataRes = await fetch(`http://localhost:3001/parseGame`, { //Load Game data
//     //                                     method: 'GET',
//     //                                     headers: {
//     //                                         'Content-Type': 'application/json',
//     //                                         'url': 'https://cdn.wnba.com/static/json/liveData/playbyplay/playbyplay_urlMe.json',
//     //                                         'gameid': game.gameId
//     //                                     }
//     //                                 })

//     //                                 if(gameDataRes.status === 500){ 
//     //                                     //This game hasn't happened yet. Should never get to this point
//     //                                     //as we never pass in an end date above the current day so something
//     //                                     // went wrong
//     //                                 } else {
//     //                                     const gameData = await gameDataRes.json();
//     //                                     newGames.push({
//     //                                         ...gameData,
//     //                                         stats: fillStats(parsedName, "Whole Game", gameData.actions)
//     //                                     });
//     //                                 }
//     //                                 break;
//     //                             }
//     //                         }
//     //                     })
//     //                     .catch(err => {
//     //                         console.log('betterLoadGames err', err);
//     //                     })
//     //             );
//     //         }
//     //     } else {
//     //         break;
//     //     }
//     // }

//     // // Wait for all fetch promises to complete
//     // await Promise.all(fetchPromises);

//     return newGames;
// };

export const mlbParsing = async (
    startDate: Date, endDate: Date, paramName: string
): Promise<Game2[]> => {
    let newGames: Game2[] = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/mlbSchedule/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                startDate: formatDate(startDate),
                endDate: formatDate(endDate)
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch MLB schedule: ${res.statusText}`);
        }
        const parsedRes = await res.json();
        console.log('gameRes',parsedRes.dates[0]);

        // Process gameRes to extract and structure newGames as needed
        // Example (you need to adjust this according to the actual structure of gameRes):
        // newGames = gameRes.map(game => ({
        //     date: game.date,
        //     teams: game.teams,
        //     stats: game.stats,
        //     actions: game.actions
        // }));

    } catch (error) {
        console.error('Error loading MLB schedule:', error);
    }

    return newGames;
};
