import React from 'react'
import { teamColors } from '../../../Context/functions/colors/colors'
import { PPlayer } from '../../../Context/Types/PlayerTypes'
import { Projection } from '../../../Context/Types/ProjectionTypes'
import Image from 'next/image'

interface Props {
    player: PPlayer
    projections: Projection[]
}
export const Hero: React.FC<Props> = ({player, projections}) => {
    return (
        <div
            style={{
                width: '100%', height: '140px', display:'flex',
                background: `linear-gradient(to bottom, ${teamColors(player.city)}, #383838)`,
                borderBottom:'1px solid #808080', position: 'relative',
                overflow:'hidden'
            }}
        >
            {/* Logo */}
            <div style={{ left: -40, top: -40, position:'absolute'}}>
                 <Image
                    alt={'Team Logo'}
                    src={`/logos/nba/${player.city.replace(' ', '_')}.png`}
                    width={175}
                    height={175}
                    style={{ opacity: 0.3 }}
                />
            </div>
            
                {/* Headshot */}
                <div style={{height:'100%', display:'flex', alignItems:'flex-end', marginLeft:'25px', zIndex:1}}>
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
