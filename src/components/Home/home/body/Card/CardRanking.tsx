import React from 'react'
import { PopularProp } from '../../../../../Context/Types/ProjectionTypes'

interface Props {
    popularProp: PopularProp
}
export const CardRanking: React.FC<Props> = ({ popularProp }) => {
    return (
        <div style={{
            display:'flex', height:'100%',
            alignItems:'center'
        }}>
            <p style={{color:'#A2A2A2',fontSize:'12px', margin:'0px 0px 0px 0px'}}>
                {/* <span style={{color:'#fff'}}>{convertTeamName(oppTeam?.name!, 0, popularProp.matchUp.league)} </span> */}
                All: 5th
            </p>
            <p style={{color:'#A2A2A2',fontSize:'12px', margin:'0px 0px 0px 0px'}}>
                {/* <span style={{color:'#fff'}}>{convertTeamName(oppTeam?.name!, 0, popularProp.matchUp.league)} </span> */}
                G: 6th
            </p>
        </div>
    )
}

{/* <div style={{ marginRight:'20px', fontSize:'13px', display:'flex', }}>
                    {rankings.map((rank, i) => (
                        i === 0 || popularProp.prop.player.position.split('-')[i - 1] !== undefined ? (
                            <div style={{ color: "#A2A2A2", marginTop: '5px' }} key={i}>
                                <span style={{ marginRight: '5px' }}>
                                    {i === 0 ? 'ALL:' : `${popularProp.prop.player.position.split('-')[i - 1]}:`}
                                </span>
                                
                                <span style={{ color: getRankColor(rank, teams), marginRight: '20px' }}>
                                    {rank.rank}
                                </span>
                            </div>
                        ) : null
                    ))}
                </div> */}
