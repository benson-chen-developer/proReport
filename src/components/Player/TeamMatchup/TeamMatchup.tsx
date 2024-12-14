import { EGame2 } from "../../../Context/ESport"

interface Props {
    otherTeam: string
    matches: EGame2[]
    playerName: string
}

export const TeamMatchup: React.FC<Props> = ({otherTeam, matches, playerName}) => {
    const playerStats = matches.flatMap(match => 
        match.maps.flatMap(map => map.players)
    ).filter(player => player.name === playerName);

    const cumulativeStats = playerStats
        .map((playerStats) => playerStats.stats) 
        .reduce((acc, stats) => {
            Object.entries(stats).forEach(([statName, value]) => {
                acc[statName] = (acc[statName] || 0) + Number(value); 
            });
            return acc;
        }, {} as Record<string, number>); 

    const statAverages = Object.entries(cumulativeStats).map(([statName, total]) => {
    const average = total / playerStats.length;
        return { statName, average };
    });

    return (
        <div>
            <h3>Averages against {otherTeam}</h3>
            <ul>
                {statAverages.map(({ statName, average }) => (
                    <li key={statName}>
                        {statName}: {average.toFixed(1)}
                    </li>
                ))}
            </ul>
        </div>
    );
}