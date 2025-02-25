import { MatchUp } from "../../Types/Match";
import { Team } from "../../Types/PlayerTypes";
import { Projection } from "../../Types/ProjectionTypes";
import { cacheMatchups, getCurrentMatchups } from "../cookies/matchUps";

export const fetchMatchUps = async (props?: Projection[]): Promise<MatchUp[]> => {
    const cachedMatchUps = localStorage.getItem('matchUps');
    let matchUps: MatchUp[] = cachedMatchUps ? JSON.parse(cachedMatchUps) : [];

    /* All this does is bring up the cached schedule */
    if(matchUps.length > 0){
        console.log('matchup is cached')
    } else {
        try {
            console.log('matchUps is not cached')

            const teams = await fetchNbaTeams();
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

const fetchNbaTeams = async (): Promise<Team[]> => {
    const cachedNbaTeams = localStorage.getItem('nbaTeams');
    const nbaTeams: Team[] = cachedNbaTeams ? JSON.parse(cachedNbaTeams) : [];

    if(nbaTeams.length > 0){
      console.log('nbaTeams is cached')
      return nbaTeams;
    } else {
      try {
        console.log('nbaTeams is not cached')
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/teams/nba`);
        if (!response.ok) throw new Error('Failed to fetch nba teams');
        const data = await response.json();

        localStorage.setItem('nbaTeams', JSON.stringify(data));
        return data;
      } catch (error) {
        console.error('Error fetching matchUps', error);
        return [];
      }
    }
}