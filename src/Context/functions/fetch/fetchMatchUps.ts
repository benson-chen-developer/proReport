import { MatchUp } from "../../Types/Match";
import { Team } from "../../Types/PlayerTypes";
import { Projection } from "../../Types/ProjectionTypes";
import { cacheMatchups, getCurrentMatchups } from "../cookies/matchUps";
import { fetchTeams } from "./team/fetchTeams";

export type UnPopulatedMatch = {
    league: string,
    teams: string[], //Just the team name 
    time: string, 
}

export const fetchMatchUps = async (league: string, props?: Projection[]): Promise<MatchUp[]> => {
    const leagueMatchups = `${league}MatchUps`;
    const teams = await fetchTeams(league);

    const cachedMatchUps = localStorage.getItem(leagueMatchups);
    let unPopulatedMatchUps: UnPopulatedMatch[] = cachedMatchUps ? JSON.parse(cachedMatchUps) : [];

    /* All this does is bring up the cached schedule */
    if(unPopulatedMatchUps.length > 0){
        console.log('matchup is cached')
    } else {
        try {
            console.log('matchUps is not cached')
            const leagueSchedule: UnPopulatedMatch[] = await fetchSchedule(league);
            unPopulatedMatchUps = getCurrentAndFutureMatchUpsOnly(leagueSchedule);

            localStorage.setItem(leagueMatchups, JSON.stringify(unPopulatedMatchUps));
        } 
        catch (error) {
            console.error(`Error fetching schedule for ${league}`, error);
            return [];
        }
    }

    /* Populate the teams field */
    const populatedMatchUps: MatchUp[] = [];
    unPopulatedMatchUps.forEach((unPopMatch) => {
        const homeTeam = teams.find(team => 
            team.name === unPopMatch.teams[0] && 
            team.league.toLowerCase() === unPopMatch.league.toLowerCase()
        );
        const awayTeam = teams.find(team => 
            team.name === unPopMatch.teams[1] && 
            team.league.toLowerCase() === unPopMatch.league.toLowerCase()
        );
        
        if(homeTeam && awayTeam){
            populatedMatchUps.push({
                ...unPopMatch,
                teams: [homeTeam, awayTeam]
            })
        }
    })

    const currentMatchups = getCurrentMatchups(populatedMatchUps, props);
    return currentMatchups;
}

const getCurrentAndFutureMatchUpsOnly = (matchUps: UnPopulatedMatch[]): UnPopulatedMatch[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day

    const filteredGames = matchUps.filter((game) => {
        const gameDate = new Date(game.time);
        return gameDate >= today;
    });

    return filteredGames;
}

const fetchSchedule = async (league: string): Promise<UnPopulatedMatch[]> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matchUps/${league}`;
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching MLB schedule:", error);
        return [];
    }
};


//     if (process.env.NODE_ENV === "development") {
//       // console.log('currentMatchups', currentMatchups)
//     }