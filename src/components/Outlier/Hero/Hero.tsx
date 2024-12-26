import React from 'react'
import { PPlayer } from '../../../Context/PlayerTypes'
import { MatchUp } from '../Matches'

interface Props {
    player: PPlayer
    matchUp: MatchUp
}
export const Hero: React.FC<Props> = ({player, matchUp}) => {
    return (
        <div
            style={{
                width: '100%', height: '140px', display:'flex',
                // background: 'linear-gradient(to bottom, #D31920, #383838)',
                background: 'linear-gradient(to bottom, #F48328, #383838)',
                borderBottom:'1px solid #808080'
            }}
        >
            {/* Headshot */}
            <div style={{height:'100%', display:'flex', alignItems:'flex-end', marginLeft:'25px'}}>
                <img
                    src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`}
                    style={{ width: '175px', height: '120px' }}
                />
            </div>

            {/* Name + Position */}
            <div style={{
                height:'100%', display:'flex', justifyContent:'flex-end', marginLeft:'25px',
                flexDirection:'column'
            }}>
                <p style={{margin:0, fontSize:'35px', fontWeight:'bold', color:'#fff'}}>{player.name}</p>
                <p style={{margin:'0px 0px 20px 0px', fontSize:'20px', fontWeight:'bold', color:'#fff'}}>
                    {player.city} - {player.position[0]}
                </p>
            </div>
        </div>

    )
}
