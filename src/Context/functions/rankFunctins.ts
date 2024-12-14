import { PSport } from "../../components/Player/SportClass/Psport";
import { PGame, PPlayer } from "../PlayerTypes"

export type Ranking = {
    team: string;
    stats: {
        [key: string]: Record<string, number>[];
    };
    games: number;
}
export type RankDisplay = {
    statAllowed: string, rank: string, avg: number, color:string
}

export const getTeamStatRanking = (
    // team: string, againstTeam: string, position: string,
    allGames: PGame[], allPlayers: PPlayer[]
): Ranking[] => {
    let rankings: Ranking[] = [
        {
            team: 'detroit',
            stats: PSport.getStatsHeader('nba').reduce((acc, stat) => {
                acc[stat.name] = [
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                ];
                return acc;
            }, {} as Record<string, { G: number; F: number; C: number }[]>),
            games: 0
        },
        {
            team: 'cleveland',
            stats: PSport.getStatsHeader('nba').reduce((acc, stat) => {
                acc[stat.name] = [
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                ];
                return acc;
            }, {} as Record<string, { G: number; F: number; C: number }[]>),
            games: 0
        },
        {
            team: 'indiana',
            stats: PSport.getStatsHeader('nba').reduce((acc, stat) => {
                acc[stat.name] = [
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                    { G: 0, F: 0, C: 0 },
                ];
                return acc;
            }, {} as Record<string, { G: number; F: number; C: number }[]>),
            games: 0
        }
    ];
    
    allGames.forEach((game) => {
        const players = game.players;

        players.forEach((pStat) => {
            const foundPlayer = allPlayers.find(p => p.name.toLowerCase() === pStat.name.toLowerCase());

            if(foundPlayer){ /* If not found then this player prob isn't in the nba anymore */
                const playerPos = foundPlayer!.position;
                const oppTeam = pStat.team !== game.team1 ? game.team1 : game.team2;
                const rankingsTeam = rankings.find(r => r.team.toLowerCase() === oppTeam.toLowerCase());
    
                if(rankingsTeam){
                    pStat.periods.forEach((period, index) => {
                        period.forEach(s => {
                            const positions = playerPos.split('-');
                            
                            positions.forEach(position => {
                                // console.log(`${position} ${foundPlayer?.name}`)
                                rankingsTeam.stats[s.name][index][position] += s.value > 0 ? s.value : 0;
    
                                if(index === 0 && position === 'G' && s.name === "PTS" && s.value > 0){
                                    // console.log(`1st Q ${foundPlayer!.name} on tea ${foundPlayer?.team}`, s.value)
                                }
                            })
                        })
                    })
    
                }
            }
        })
        
        rankings.forEach(ranking => {
            if(ranking.team === game.team1.toLowerCase()) ranking.games++;
            if(ranking.team === game.team2.toLowerCase()) ranking.games++;;
        });
    })

    return rankings;
}

export const calcRank = (
    teamStats: Ranking[], period: string, position: string, teamParam: string,
    pickedStat: string,
): RankDisplay => {
    console.log('Selected Position', position)
    console.log('Selected Period', period)
    let retRank = {statAllowed: '', rank: '', avg: 0, color: ''};
    let periods = PSport.getPeriods(period, "nba");

    const ranked = teamStats.sort((a, b) => {
        const sumOfAllPeriods = (stats: Record<string, number>[], games: number, currTeam: string) => {
            let totalVal = 0;

            if(period !== 'All'){
                retRank.statAllowed = `${pickedStat} Allowed (${period})`
            } else {
                retRank.statAllowed = `${pickedStat} Allowed`;
            }
    
            if (position === "All") {
                totalVal = periods.reduce((sum, periodIndex) => {
                    const periodStats = stats?.[periodIndex] || {};
                    const periodSum = Object.values(periodStats).reduce((periodTotal, posValue) => periodTotal + posValue, 0);
                    return sum + periodSum;
                }, 0);
            } else {
                totalVal = periods.reduce((sum, periodIndex) => {
                    return sum + (stats?.[periodIndex]?.[position] || 0);
                }, 0);
            }
    
            if (currTeam === teamParam) {
                retRank.avg = totalVal / games;
            }
    
            return totalVal / games;
        };
    
        const aValue = sumOfAllPeriods(a.stats[pickedStat], a.games, a.team);
        const bValue = sumOfAllPeriods(b.stats[pickedStat], b.games, b.team);
    
        return bValue - aValue;
    });
    
    // console.log("Ranked Rankings: ", ranked);

    let foundIndex = ranked.findIndex(r => r.team.toLowerCase() === teamParam.toLowerCase())+1;
    let indexString = '';
    if (foundIndex % 10 === 1 && foundIndex % 100 !== 11) {
        indexString = `${foundIndex}st`;
    } else if (foundIndex % 10 === 2 && foundIndex % 100 !== 12) {
        indexString = `${foundIndex}nd`;
    } else if (foundIndex % 10 === 3 && foundIndex % 100 !== 13) {
        indexString = `${foundIndex}rd`;
    } else {
        indexString = `${foundIndex}th`;
    }
    retRank.rank = indexString;

    /* Pick the color */
    let total = teamStats.length;
    let percent = foundIndex / total;
    console.log(foundIndex)

    if(percent >= .3){
        retRank.color = '#ff0000';
    }
    else if (percent >= .5){
        retRank.color = '#ede515';
    }
    else if (percent >= .7){
        retRank.color = '#14EE9D';
    }

    return retRank;
}