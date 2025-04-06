import { PGame } from "../../../Types/PlayerTypes";

export const fetchMatches = async (league: string, playerName: string): Promise<PGame[]> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matches/${league}/${playerName}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${league} matches`);
        const data = await response.json();

        let retData = data;

        if(playerName){
            const sortedGames = data.sort((a: { date: string }, b: { date: string }) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            retData = sortedGames;
        } 

        return retData;
    } catch (error) {
        console.error(`Failed to fetch ${league} mongo call for matches`, error);
        return [];
    }
};

/* Fix this if u want to use it */
export const fetchMatchesViaTeams = async (cities:string[]) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matches/nba/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cities }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch matches");
        }

        const data = await response.json();
        console.log("Fetched matches:", data);
        return data;
    } catch (error) {
        console.error("Error fetching NBA matches:", error);
    }
};