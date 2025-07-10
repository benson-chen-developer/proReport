import { Team } from "../Types/PlayerTypes";

export type Ranking = {
    name: string, 
    value: string, 
    rank: number, 
    teamName: string, 
    position: string
}

/*
    1) Loop through each position as so we get rankings via each position (G, F, All, etc)
    2) Rankings is determined by teams all returned in order of most and least given of stats
    3) We find the index of our team in this "orderedTeams" array
        - That is the rank
*/
export const getRank = (
    teams: Team[], stat: string, oppTeam: string, position:string
): Ranking[] => {
    const positions = position === "All" ? [...position.split('-')] : ["All", ...position.split('-')];
    const rankings = positions.map((pos) => {
        const orderedTeams = orderTeamsByStatAmount(stat, teams, pos);
        const teamIndex = orderedTeams.findIndex(team => team.name === oppTeam);

        if(teamIndex === -1) return {
            name: stat,
            rank: -1,
            value: "0",
            teamName: oppTeam,
            position: pos
        }

        return {
            name: stat,
            rank: teamIndex+1,
            value: (0 / teams[teamIndex].gp).toFixed(1),
            teamName: oppTeam,
            position: pos
        }
    })

    return rankings;
}

const getMapping = (league: string) => {
    if(league === "nba") return {"G": 0, "F": 1, "C": 2, "All": 3};

    else return {"All": 0}
}

/*
    What ever stat we want to sort by
        - The teams get returned back in order of most given at 1 and least at last
*/
const orderTeamsByStatAmount = (stat: string, teams: Team[], position: string): Team[] => {
    const stats = stat.split('+');
    let teamsOrderedByTotalStat: Team[] = [];

    const mapping = getMapping(teams[0].league);
    let positionIndex = mapping[position as keyof typeof mapping];

    // Guard clause: if positionIndex is undefined, return the original list
    if (positionIndex === undefined) return teams;

    if(stats[0] === "FAN"){
        // teamsOrderedByTotalStat = teams.slice().sort((a, b) => {
        //     const statsA: Record<string, number> = {};
        //     const statsB: Record<string, number> = {};
        
        //     Object.keys(statWeights).forEach(stat => {
        //         statsA[stat] = a.given[stat]?.[positionIndex] ?? 0;
        //         statsB[stat] = b.given[stat]?.[positionIndex] ?? 0;
        //     });
        
        //     const avgA:number = calcFantasyScore(statsA) / a.gp;
        //     const avgB:number = calcFantasyScore(statsB) / b.gp;
        
        //     return avgB - avgA;
        // });
    } else {
        /* 
            We put in try catch to basically make it so if this "stat"
            doesn't exist in our logic then it won't crash
         */
        try{
            teamsOrderedByTotalStat = teams.slice().sort((a, b) => {
                const avgA = stats.reduce((sum, stat) => sum + (a.given[stat][positionIndex!] / a.gp), 0);
                const avgB = stats.reduce((sum, stat) => sum + (b.given[stat][positionIndex!] / b.gp), 0);

                return avgB - avgA;
            });
        } catch {
            return [];
        }
    }

    return teamsOrderedByTotalStat;
}

export const getRankColor = (ranking: Ranking, teams: Team[]): string => {
    const percent = (ranking.rank / teams.length);
                
    if(percent <= .33) return '#18ED9D';
    else if (percent <= .60) return '#ede515';
    else return '#FF3556';
}

/* Adds "st" to 1, "nd" to 22, etc */
export const addOrdinalSuffix = (n: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}