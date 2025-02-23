export const fetchNBAMatchesViaTeams = async (cities:string[]) => {
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