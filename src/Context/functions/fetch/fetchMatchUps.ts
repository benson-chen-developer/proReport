import { MatchUp } from "../../Types/Match";
import { Team } from "../../Types/PlayerTypes";
import { Projection } from "../../Types/ProjectionTypes";
import { cacheMatchups, getCurrentMatchups } from "../cookies/matchUps";
import { fetchTeams } from "./team/fetchTeams";

export const fetchMatchUps = async (league: string, props?: Projection[]): Promise<MatchUp[]> => {
    const cachedMatchUps = localStorage.getItem('matchUps');
    let matchUps: MatchUp[] = cachedMatchUps ? JSON.parse(cachedMatchUps) : [];

    /* All this does is bring up the cached schedule */
    if(matchUps.length > 0){
        console.log('matchup is cached')
    } else {
        try {
            console.log('matchUps is not cached')

            const teams = await fetchTeams(league);
            matchUps = await cacheMatchups(teams);
            localStorage.setItem('matchUps', JSON.stringify(matchUps));
        } 
        catch (error) {
            console.error('Error fetching matchUps', error);
            return [];
        }
    }

    const currentMatchups = getCurrentMatchups(matchUps, props);
    console.log('currentMatchups', currentMatchups)
    return currentMatchups;
}