import { MatchUp } from "./Types/Match";
import { Team } from "./Types/PlayerTypes";

/*
    1) Check at 8am EST each day
        - If the lastDateChecked is past 8am est today then don't check for todays games
*/
// export const getMatchUps = async (
//     league: string, teams: Team[]
//   ): Promise<MatchUp[]> => {
//     if (league === "nba") {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matchUps/nba`)
//         const data = await res.json();

//         /* If its like midnight and we have live games from yesterday */
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         yesterday.setHours(0, 0, 0, 0);  
//         /* Games Today */
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         /* Filter the Games (Based on to date params) */
//         const games: any[] = data.filter((game: any) => {
//             const gameDate = new Date(game.gameDateTimeEst)
//             gameDate.setHours(0, 0, 0, 0);

//             return (
//                 gameDate.getTime() === today.getTime() ||
//                 (gameDate.getTime() === yesterday.getTime() && !game.gameStatusText.includes("Final"))
//             );
//         });

//         const matchUps: MatchUp[] = games.map((game) => {
//             const homeTeam = teams.find(t => t.name === game.homeTeam.teamCity);
//             const awayTeam = teams.find(t => t.name === game.awayTeam.teamCity);

//             if(!homeTeam || !awayTeam) return null;

//             return {
//                 league: league,
//                 teams: [homeTeam, awayTeam],
//                 time: game.gameDateTimeUTC, 
//             }
//         })
//         .filter((matchUp): matchUp is MatchUp => matchUp !== null);

//         return matchUps;
//     }

//     return [];
// };

export const getCurrentMatchups = async (league: string, teams: Team[]) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matchUps/nba`);
    const data = await res.json();

    let searchDate = new Date();
    searchDate.setHours(0, 0, 0, 0);

    let filteredGames: any[] = [];

    while (filteredGames.length === 0) {
        filteredGames = data.filter((game: any) => {
            const gameDate = new Date(game.gameDateTimeEst);
            gameDate.setHours(0, 0, 0, 0);
            return gameDate.getTime() === searchDate.getTime();
        });

        if (filteredGames.length === 0) {
            searchDate.setDate(searchDate.getDate() + 1); // Move to the next day
        }
    }

    const matchUps: MatchUp[] = filteredGames.map((game) => {
        const homeTeam = teams.find(t => t.name === game.homeTeam.teamCity);
        const awayTeam = teams.find(t => t.name === game.awayTeam.teamCity);

        if(!homeTeam || !awayTeam) return null;

        return {
            league: league,
            teams: [homeTeam, awayTeam],
            time: game.gameDateTimeUTC, 
        }
    })
    .filter((matchUp): matchUp is MatchUp => matchUp !== null);

    return matchUps;
};

export const checkIfIsNewDay = (lastDateChecked: Date): boolean => {
    const currentTime = new Date();
    const eightAM = new Date(currentTime);
    eightAM.setHours(8, 0, 0, 0);

    // Log for debugging
    // console.log('Current Time:', currentTime);
    // console.log('Eight AM:', eightAM);
    // console.log('Last Date Checked:', lastDateChecked);

    if (lastDateChecked > eightAM) {
        return false;
    } else {
        return true;
    }
}