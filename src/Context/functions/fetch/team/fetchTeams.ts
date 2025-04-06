import { Team } from "../../../Types/PlayerTypes";
import { dailyCheckIn } from "../../cookies/dailyCheckIn";

export const fetchTeams = async (league: string): Promise<Team[]> => {
    const cachedTeams = localStorage.getItem(`${league}Teams`);
    const teams: Team[] = cachedTeams ? JSON.parse(cachedTeams) : [];

    const checkedIn = dailyCheckIn(league);

    if(checkedIn){
        return teams;
    } else {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/teams/${league}`);
            if (!response.ok) throw new Error(`Failed to fetch ${league} teams`);
            const data = await response.json();
    
            localStorage.setItem(`${league}Teams`, JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(`Failed to fetch ${league} teams from Mongo`, error);
            return [];
        }
    }
} 
