import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { calcRank, getTeamStatRanking, RankDisplay } from '../../../Context/functions/rankFunctins'
import { PGame, PPlayer, Team } from '../../../Context/Types/PlayerTypes'
import { useGlobalContext } from '../../../Context/store'
import { PSport } from '../../Player/SportClass/Psport'
import { Filter, Filters, MatchUp } from '../Matches'
import { Projection } from '../../../Context/Types/ProjectionTypes'

interface Props {
    matchUp: MatchUp
    filter: Filter,
    player: PPlayer
}

type Ranking = {
    name: string, value: string, rank: number
}
export const Rankings: React.FC<Props> = ({filter, matchUp, player}) => {
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [selectedOption, setSelectedOption] = useState(`vs ${player.position[player.position.length-1]}`);
    const [teams, setTeams] = useState<Team[]>([]);
    const oppTeam = matchUp.teams.find(team => team !== player.city);

    const {fetchNbaTeams} = useGlobalContext();

    const setCurrentRank = async () => {
        const mapping = {"vs G": 0, "vs F": 1, "vs C": 2};
        const positionIndex = mapping[selectedOption as keyof typeof mapping];

        const teams = await fetchNbaTeams();
        setTeams(teams);

        let teamsOrderedByTotalStat = teams.slice().sort((a, b) => {
            const avgA = a.given[filter.stat][3] / a.gp;
            const avgB: number = b.given[filter.stat][3] / b.gp;
            return avgB - avgA;
        });
        let teamsOrderedByPosition = teams.slice().sort((a, b) => {
            const avgA = a.given[filter.stat][positionIndex] / a.gp;
            const avgB = b.given[filter.stat][positionIndex] / b.gp;
            return avgB - avgA;
        });

        const teamIndex = teamsOrderedByTotalStat.findIndex(team => team.name === oppTeam);
        let rankings: Ranking[] = [
            {
                name: `${filter.stat} Allowed`,
                rank: teamIndex+1,
                value: (teamsOrderedByTotalStat[teamIndex].given[filter.stat][3] / teamsOrderedByTotalStat[teamIndex].gp).toFixed(1)
            },
        ];

        const teamPosIndex = teamsOrderedByPosition.findIndex(team => team.name === oppTeam);
        if(selectedOption !== "All"){
            rankings.push({
                name: `${filter.stat} Allowed`,
                rank: teamPosIndex+1,
                value: (teamsOrderedByTotalStat[teamPosIndex].given[filter.stat][positionIndex] / teamsOrderedByTotalStat[teamPosIndex].gp).toFixed(1)
            })
        }
        
        setRankings(rankings)
    }

    useEffect(() => {
        setCurrentRank();
    }, [selectedOption, filter.stat, filter.period])

    return (
        <div>
            <h1 style={{fontWeight:'bold', fontSize:'18px', color:'#fff', margin:'25px 0px 10px 0px'}}>
                {oppTeam} Allows
            </h1>

            <div style={{display:'flex', marginBottom:'-10px'}}>
                {['vs G', 'vs F', 'vs C'].map((option, i) => (
                    <div 
                        key={i}
                        style={{
                            cursor:'pointer', color:'#fff', paddingRight:'20px', alignItems:'center',
                            display:'flex', flexDirection:'column', justifyContent:'space-between',
                        }}
                        onClick={() => setSelectedOption(option)}
                    >
                        <div style={{color: option === selectedOption ? '#fff' : 'grey', marginTop:'5px',}}>
                            <p style={{margin:0, fontWeight:'bold', marginBottom:'15px', fontSize:'14px'}}>
                                {option}
                            </p>
                        </div>

                        <div style={{
                            height:'4px', width:'90%', 
                            background: option === selectedOption ? '#fff' : '',
                            borderTopLeftRadius: option === selectedOption ? '8px' : '0', 
                            borderTopRightRadius: option === selectedOption ? '8px' : '0',
                        }}/>
                    </div>
                ))}
            </div>

            {/* Headers (Rank + Avg) */}
            <div style={{width:'100%', display:'flex', margin:'15px 0px 5px 0px'}}>
                <div style={{ width:'60%' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#B1B1B1'}}>
                        Stat per game
                    </p>
                </div>

                <div style={{display:'flex', width:'40%', marginRight:'20px'}}>
                    <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#B1B1B1', width:'50%', textAlign:'center' }}>
                        
                    </p>
                    <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#B1B1B1', width:'50%', textAlign:'center' }}>
                        Rank
                    </p>
                </div>
            </div>

            {/* Actual Data (Points Allowed     23rd     101.1) */}
            <div style={{ marginRight:'20px'}}>
                {rankings.map((ranking, index) => {
                    let color = '';
                    const percent = (ranking.rank / teams.length);
                    
                    if(percent <= .33) color = '#18ED9D';
                    else if (percent <= .60) color = '#ede515';
                    else color = '#FF3556';

                    return (
                        <div key={index} style={{width:'100%', display:'flex', marginBottom:'15px'}}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff', width:'60%' }}> 
                                {ranking.name} 
                                {index !== 0 ? 
                                    <span style={{color:'#808080'}}> ({selectedOption}) </span> : null
                                }
                            </div>

                            <div style={{display:'flex', width:'40%'}}>
                                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#B1B1B1', width:'50%', textAlign:'center' }}>
                                    {/* {ranking.value} */}
                                </div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px', color: color, width:'50%', textAlign:'center' }}>
                                    {ranking.rank}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}