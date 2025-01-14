import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { teamColors } from '../../../Context/functions/colors/colors'
import { PPlayer, Team } from '../../../Context/Types/PlayerTypes'
import { Projection } from '../../../Context/Types/ProjectionTypes'
import Image from 'next/image'
import { useGlobalContext } from '../../../Context/store'

interface Props {
    player: PPlayer
    projections: Projection[]
    rightBtn: "Filters" | "Rankings",
    setRightBtn: Dispatch<SetStateAction<"Filters" | "Rankings">>
}
export const Hero: React.FC<Props> = ({player, projections, rightBtn, setRightBtn}) => {
    const {fetchNbaTeams} = useGlobalContext();
    const [team, setTeam] = useState<Team>();
    useEffect(() => {
        const func = async () => {
            const teams = await fetchNbaTeams();
            const team = teams.find(t => t.name === player.city);
            setTeam(team);
        }

        func();
    }, [])

    if(!player && team) return null;

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
                    src={`https://cdn.nba.com/logos/nba/${team?.id}/primary/L/logo.svg`}
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
                flexDirection:'column', width:'50%',
            }}>
                <p style={{margin:0, fontSize:'35px', fontWeight:'bold', color:'#fff'}}>{player.name}</p>
                <p style={{margin:'0px 0px 20px 0px', fontSize:'20px', fontWeight:'bold', color:'#fff'}}>
                    {player.city} | {player.position.replace('-', ' - ')}
                </p>
            </div>

            {/* Filter + Ranking Btn */}
            {/* <div style={{
                display:'flex', height:'100%', alignItems:'flex-end', justifyContent:'flex-end',
                width:'50%', marginRight:'10px'
            }}>
                <div style={{
                    width:'90px', height:'35px', borderRadius:'20px', background:'#2B2B2B',
                    border: rightBtn === "Filters" ? '2px solid #FFFFFF' : '2px solid #2B2B2B', 
                    display:'flex', alignItems:'center',cursor:'pointer',
                    justifyContent:'center', color:'#fff', fontWeight:'bold', fontSize:'14px',
                    marginRight:'10px', marginBottom:'10px'
                }} onClick={() => setRightBtn('Filters')}>
                    Filters
                </div>

                <div style={{
                    width:'90px', height:'35px', borderRadius:'20px', background:'#2B2B2B',
                    border: rightBtn === "Rankings" ? '2px solid #FFFFFF' : '2px solid #2B2B2B', 
                    display:'flex', alignItems:'center', cursor:'pointer', marginBottom:'10px',
                    justifyContent:'center', color:'#fff', fontWeight:'bold', fontSize:'14px'
                }} onClick={() => setRightBtn('Rankings')}>
                    Rankings
                </div>
            </div> */}
        </div>

    )
}
