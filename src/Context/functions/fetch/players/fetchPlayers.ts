import { PPlayer } from "../../../Types/PlayerTypes";

/* league should be in "nba" format */
export const fetchPlayers = async (league: string): Promise<PPlayer[]> => {
    const storedPlayers = localStorage.getItem(`${league}players`);
    const players: PPlayer[] = storedPlayers ? JSON.parse(storedPlayers) : [];

    if(players.length > 0){
        // console.log('player is cached')
        return players;
    } else {
        try {
            // console.log('player is not cached')
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/players/${league}`);
            if (!response.ok) throw new Error(`Failed to fetch ${league} players`);
            const data = await response.json();

            localStorage.setItem(`${league}players`, JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(`Error fetching ${league} players:`, error);
            return [];
        }
    }
}