import React, { useEffect, useState } from 'react'
import { PPlayer, Team } from '../../../Context/Types/PlayerTypes'
import { useGlobalContext } from '../../../Context/store'
import { MatchUp } from '../../../Context/Types/Match'
import { fetchTeams } from '../../../Context/functions/fetch/team/fetchTeams'
import { TeamCircle } from '../Hero/TeamsMatchUp'

interface Props {
    matchUp: MatchUp
}

export type Ranking = {
    name: string, value: string, rank: number, teamName: string, position: string
}

export const Rankings: React.FC<Props> = ({matchUp}) => {
    const {filter, player} = useGlobalContext();
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    const oppTeam: Team = matchUp.teams.find(team => team.name !== player.city)!;

    useEffect(() => {
        const func = async () => {
            const nbaTeams = await fetchTeams(matchUp.league);
            setTeams(nbaTeams);

            const rankings = getRank(nbaTeams, filter.stat, oppTeam!.name, player.position)
            setRankings(rankings);
        }

        func();
    }, [filter.stat, filter.period])


    return (
        <div style={{width:"95%", borderRadius:'15px', marginLeft:'5%'}}>
            <h1 style={{
                fontWeight:'bold', fontSize:'16px', color:'#fff', margin:'0px 0px 5px 0px',
                display: 'flex'
            }}>
                <TeamCircle team={oppTeam}/>

                <span style={{marginLeft:'5px'}}>{oppTeam.name}</span>
            </h1>

            {/* Headers (Rank + Avg) */}
            <div style={{width:'100%', display:'flex', margin:'0px 0px 10px 0px'}}>
                <p style={{ fontWeight: 'bold', fontSize: '12px', color: '#B1B1B1', margin:'0px'}}>
                    {filter.stat} Allowed Per Game
                </p>
            </div>

            <div style={{ display:'flex', fontSize:'14px', marginTop:'20px'}}>
                {rankings.map((ranking, i) => {
                    return (
                        <div key={i} style={{display:'flex', marginBottom:'15px', fontWeight: 'bold', marginRight:'25px'}}>
                            <span style={{marginRight:'5px', color:"#fff"}}>
                                {i === 0 ? 'ALL:' : `${player.position.split('-')[i-1]}:`} 
                            </span>
                            <span style={{ color: getRankColor(ranking, teams)}}>
                                {ranking.rank}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const statWeights: Record<string, number> = {
    "PTS": 1,
    "REB": 1.2,
    "AST": 1.5,
    "STL": 3,
    "BLK": 3,
    "TOV": -1
};

const calcFantasyScore = (stats: Record<string, number>): number => {
    return Object.entries(stats).reduce((sum, [key, value]) => {
        return sum + (statWeights[key] || 0) * value;
    }, 0);
};

export const getRank = (
    teams: Team[], stat: string, oppTeam: string, position:string
): Ranking[] => {
    const positions = position === "All" ? [...position.split('-')] : ["All", ...position.split('-')];
    
    // console.log('positons',positions )
    const rankings = positions.map((pos) => {
        const orderedTeams = orderTeamsByStatAmount(stat, teams, pos);
        const teamIndex = orderedTeams.findIndex(team => team.name === oppTeam);

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

const orderTeamsByStatAmount = (stat: string, teams: Team[], position: string): Team[] => {
    const stats = stat.split('+');
    let teamsOrderedByTotalStat: Team[] = [];

    let mapping = {};
    const league = teams[0].league;
    if(league === "nba"){
        mapping = {"G": 0, "F": 1, "C": 2, "All": 3};
    }
    else if(league === "mlb"){
        mapping = {"All": 0};
    }

    let positionIndex = mapping[position as keyof typeof mapping];

    if(stats[0] === "FAN"){
        teamsOrderedByTotalStat = teams.slice().sort((a, b) => {
            const statsA: Record<string, number> = {};
            const statsB: Record<string, number> = {};
        
            Object.keys(statWeights).forEach(stat => {
                statsA[stat] = a.given[stat]?.[positionIndex] ?? 0;
                statsB[stat] = b.given[stat]?.[positionIndex] ?? 0;
            });
        
            const avgA:number = calcFantasyScore(statsA) / a.gp;
            const avgB:number = calcFantasyScore(statsB) / b.gp;
        
            return avgB - avgA;
        });
    } else {
        teamsOrderedByTotalStat = teams.slice().sort((a, b) => {
            const avgA = stats.reduce((sum, stat) => sum + (a.given[stat][positionIndex] / a.gp), 0);
            const avgB = stats.reduce((sum, stat) => sum + (b.given[stat][positionIndex] / b.gp), 0);
            return avgB - avgA;
        });
    }

    return teamsOrderedByTotalStat;
}

export const getRankColor = (ranking: Ranking, teams: Team[]): string => {
    const percent = (ranking.rank / teams.length);
                
    if(percent <= .33) return '#18ED9D';
    else if (percent <= .60) return '#ede515';
    else return '#FF3556';
}