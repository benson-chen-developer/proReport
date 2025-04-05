import { PGame } from "../../../Types/PlayerTypes";

export const fetchMatches = async (playerName: string, league: string): Promise<PGame[]> => {
    if(nbaMatches.length > 0){
        return nbaMatches;
    } else {
        try {
            const url = `${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matches/${league}/${playerName}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch NBA players');
            const data = await response.json();

            let retData = data;

            if(playerName){
                const gamesPlayed = data.filter((game: PGame) => {
                    const foundPlayer = game.players.find(p => p.name.toLowerCase() === playerName.toLowerCase());
                    return foundPlayer?.periods.some(period => period['MIN'] > 0);
                });
                const sortedGames = gamesPlayed.sort((a: { date: string }, b: { date: string }) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

                retData = sortedGames;
            } 

            return retData;
        } catch (error) {
            console.error('Error fetching Lol players:', error);
            return [];
        }
    }
};