import { MatchUp } from "../../Types/Match";
import { Team } from "../../Types/PlayerTypes";
import { Projection } from "../../Types/ProjectionTypes";

export const cacheMatchups = async (teams: Team[]): Promise<MatchUp[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matchUps/nba`);
    const data = await res.json();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day

    const filteredGames = data.filter((game: any) => {
        const gameDate = new Date(game.gameDateTimeUTC);
        return gameDate >= today; // Keep only today's and future games
    });

    const matchUps: MatchUp[] = filteredGames
        .map((game: any) => {
            const homeTeam = teams.find(t => t.name === game.homeTeam.teamCity);
            const awayTeam = teams.find(t => t.name === game.awayTeam.teamCity);

            if (!homeTeam || !awayTeam) return null;

            return {
                league: "nba", 
                teams: [homeTeam, awayTeam],
                time: game.gameDateTimeUTC,
            };
        })
        .filter((matchUp: MatchUp | null): matchUp is MatchUp => matchUp !== null);

    console.log("Cached these matchups", matchUps);
    localStorage.setItem('matchUps', JSON.stringify(matchUps));

    return matchUps;
};


/*
   Only scenrios of cached matchups

   - []
   - [thisWeek]
   - [lastWeek]
   - [currentWeek]
*/

const checkRequirements = (param: 'Drop' | 'Fetch', matchups: MatchUp[]): boolean[] => {
    const now = new Date();

    let lastWeek = false;
    let currentWeek = false;
    let nextWeek = false;
    
    const removedMatchups = removeOldMatchups(matchups);


    return [lastWeek, currentWeek, nextWeek]
}

/*
    Remove old games from the matchUp cache
        - Delete all games from last week
        - Don't delete yesterdays game so we get one day buffer
*/
const removeOldMatchups = (matchups: MatchUp[]): MatchUp[] => {
    const newMatchups: MatchUp[] = [];

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Get yesterday's date

    matchups.forEach((matchup) => {
        const matchDate = new Date(matchup.time); 
        const lastWeekStart = new Date();
        lastWeekStart.setDate(lastWeekStart.getDate() - 7); // Start of last week

        // Remove games older than yesterday (1-day buffer)
        if (matchDate >= yesterday) {
            newMatchups.push(matchup);
        }
    });

    return newMatchups;
}

/*
    Add games to matchups
        - Check to see if all games this week are here and add them
        - Check to see if all games next week are here and add them
*/
// const addMatchups = (matchups: MatchUp[]): MatchUp[] => {
//     if()

//     else {
//         const newMatchUps = await getMatchUps('nba', teams);
//     }
// }

/*
    Looks at the projections and grabs each unique match
        - Look into cached matchUps and any game not there is added
*/

// export const fetchMatchUps = (props: Projection[]) => {
//     const cachedMatchUps = localStorage.getItem('matchUps');
//     const matchUps: MatchUp[] = cachedMatchUps ? JSON.parse(cachedMatchUps) : [];

//     const now = new Date();
//     matchUps.forEach((matchUp) => {
        
//     })
// }

/*
    Returns all the games today
        - Also if you pass in props then it will return any matches that match that prop's game
            (This is for if 2 days of props are available at once)
*/
export const getCurrentMatchups = (matchUps: MatchUp[]): MatchUp[] => {
    let searchDate = new Date();
    searchDate.setHours(0, 0, 0, 0);

    let filteredGames: MatchUp[] = [];

    while (filteredGames.length === 0) {
        filteredGames = matchUps.filter((matchUp) => {
            const gameDate = new Date(matchUp.time);
            gameDate.setHours(0, 0, 0, 0);
            return gameDate.getTime() === searchDate.getTime();
        });

        if (filteredGames.length === 0) {
            searchDate.setDate(searchDate.getDate() + 1); 
        }
    }

    return filteredGames;
};

// export const getCurrentMatchups = (matchUps: MatchUp[]): MatchUp[] => {
//     let searchDate = new Date();
//     searchDate.setHours(0, 0, 0, 0); // Normalize to start of the day

//     let filteredGames: MatchUp[] = [];

//     // Find the next available games
//     while (filteredGames.length === 0) {
//         filteredGames = matchUps.filter((game) => {
//             const gameDate = new Date(game.gameDateTimeEst);
//             gameDate.setHours(0, 0, 0, 0);
//             return gameDate.getTime() === searchDate.getTime();
//         });

//         // If no games are found and we still have future games, move forward
//         if (filteredGames.length === 0) {
//             if (matchUps.every(game => new Date(game.gameDateTimeEst) < searchDate)) {
//                 return []; // No future games exist, return empty array
//             }
//             searchDate.setDate(searchDate.getDate() + 1);
//         }
//     }

//     return filteredGames;
// };
