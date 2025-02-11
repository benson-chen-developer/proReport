import { Dispatch, SetStateAction } from "react";
import { MatchUp } from "../components/Outlier/Matches";

/*
    1) Check at 8am EST each day
        - If the lastDateChecked is past 8am est today then don't check for todays games
*/
export const getMatchUps = async (
    league: string, 
    matchUps: Record<string, MatchUp[]>, 
  ): Promise<MatchUp[]> => {
    if (league === "nba") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matchUps/nba`)
        const data = await res.json();

        /* If its like midnight and we have live games from yesterday */
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);  
        /* Games Today */
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        /* Filter the Games (Based on to date params) */
        const games: any[] = data.filter((game: any) => {
            const gameDate = new Date(game.gameDateTimeEst)
            gameDate.setHours(0, 0, 0, 0);

            return (
                gameDate.getTime() === today.getTime() ||
                (gameDate.getTime() === yesterday.getTime() && !game.gameStatusText.includes("Final"))
            );
        });

        // if(lastDay){
        //     for(const game of games){
        //         let currGameDay = new Date(game.gameDateEst);
        //         currGameDay.setHours(0, 0, 0, 0);
    
        //         if(currGameDay > lastDay && todaysGames.length > 0){
        //             /* 
        //                 Stop adding games once this game is on the 
        //                 next day and we have at least one game to return 
        //             */
        //             break;
        //         }
        //         else if(currGameDay > lastDay && todaysGames.length === 0) {
        //             /* If there are no games today basically */
        //             lastDay = currGameDay
        //             todaysGames.push(game);
        //         }
        //         else if(currGameDay <= lastDay){
        //             /* These games happened today and we are adding them */
        //             todaysGames.push(game);
        //         }
        //     }
        // }
        const matchUps = games.map((game) => ({
            league: league,
            teams: [game.homeTeam.teamCity, game.awayTeam.teamCity],
            time: game.gameDateTimeUTC, 
        }))

        return matchUps;
    }

    return [];
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