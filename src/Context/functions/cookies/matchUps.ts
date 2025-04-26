import { MatchUp } from "../../Types/Match";
import { Team } from "../../Types/PlayerTypes";
import { PopularProp, Projection } from "../../Types/ProjectionTypes";

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

const getUTCDayStr = (timeStr: string): string => {
    const time = new Date(timeStr);
    time.setHours(time.getHours() - 5);
    const formattedTime = time.toISOString().split('T')[0];

    return formattedTime;
}

const sameMatchUp = (m1: MatchUp, m2: MatchUp):boolean => {
    const sameLeague = m1.league === m2.league;
    const sameTeams = (m1.teams[0].name === m2.teams[0].name) && 
        (m1.teams[1].name === m2.teams[1].name)
    const sameTime = m1.time === m2.time;

    return (sameLeague && sameTeams && sameTime);
}

/*
    Returns all the games today
        - Also if you pass in props then it will return any matches that match that prop's game
            (This is for if 2 days of props are available at once)
*/
export const getCurrentMatchups = (matchUps: MatchUp[], props?: Projection[]): MatchUp[] => {
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    let filteredGames: MatchUp[] = [];

    /* If there are props get all the games in it */
    if(props){
        props.forEach(prop => {
            let propStartTime = new Date(prop.start_time);
            propStartTime.setHours(0, 0, 0, 0);

            const foundMatchUp = matchUps.find(matchUp => {
                const gameDate = new Date(matchUp.time);
                gameDate.setHours(0, 0, 0, 0);

                return gameDate.getTime() === propStartTime.getTime();
            })

            if(foundMatchUp) filteredGames.push(foundMatchUp);
        })
    }

    /* Return Today's Games */
    matchUps.forEach((matchUp) => {
        const gameDate = new Date(matchUp.time);
        gameDate.setHours(0, 0, 0, 0);
        
        const gameIsToday = gameDate.getTime() === todayDate.getTime();
        const gameIsNotInArr = !filteredGames.find(game => {
            return sameMatchUp(game, matchUp);
        })

        if(gameIsToday && gameIsNotInArr){
            filteredGames.push(matchUp);
        }
    })

    return filteredGames;
};
