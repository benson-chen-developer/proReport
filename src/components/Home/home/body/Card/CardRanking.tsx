import React from 'react'
import { PopularProp } from '../../../../../Context/Types/ProjectionTypes'
import { addOrdinalSuffix, getRank, getRankColor } from '../../../../../Context/controller/RankController'
import { Team } from '../../../../../Context/Types/PlayerTypes'

interface Props {
    popularProp: PopularProp
    teams: Team[]
}
export const CardRanking: React.FC<Props> = ({ popularProp, teams }) => {
    const matchUp = popularProp.matchUp;
    const player = popularProp.propRef.player;

    const oppTeam: Team| undefined = matchUp.teams.find(team => team.name !== player.team);
    const rankings = oppTeam ? 
        getRank(teams, popularProp.propRef.name, oppTeam.name, "All") : []

    if(!oppTeam) return null;

    return (
        <div style={{
            display:'flex', height:'100%', flexDirection:'column',
            justifyContent:'center', fontWeight:'bold', fontSize:'12px'
        }}>
            {rankings.map((ranking, i) => {
                return <p style={{color:'#A2A2A2', margin: i === 0 ? '0px 0px 0px 0px' : '.25rem 0px 0px 0px'}}>
                    All: <span style={{color:getRankColor(ranking, teams)}}>
                            {ranking.rank !== -1 ? addOrdinalSuffix(ranking.rank) : ""}
                        </span>
                </p>
            })}
        </div>
    )
}