import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { teamColors } from '../../../Context/functions/colors/colors'
import { PPlayer, Team } from '../../../Context/Types/PlayerTypes'
import { Projection } from '../../../Context/Types/ProjectionTypes'
import Image from 'next/image'
import { useGlobalContext } from '../../../Context/store'
import { convertNBATeamName } from '../../../Context/functions/convertNbaName'
import { MatchUp } from '../../../Context/Types/Match'
import { NBATeamCircle, TeamsMatchUp } from './TeamsMatchUp'

interface Props {
    player: PPlayer
    rightBtn: "Filters" | "Rankings",
    setRightBtn: Dispatch<SetStateAction<"Filters" | "Rankings">>
    matchUp: MatchUp | undefined
}
export const Hero: React.FC<Props> = ({player, rightBtn, setRightBtn, matchUp}) => {
    const {fetchNbaTeams, isMobile} = useGlobalContext();

    const [team, setTeam] = useState<Team>();
    useEffect(() => {
        const func = async () => {
            const teams = await fetchNbaTeams();
            const team = teams.find(t => t.name === player.city);
            setTeam(team);
        }

        func();
    }, [])

    const date = matchUp ? new Date(matchUp!.time) : new Date();
    let formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    formattedTime = formattedTime.replace(/^0/, ''); /* Gets rid of leading zero. EX) 07:00 to 7:00 */
    
    if(!player && team) return null;

    return (
        <div
            style={{
                width: '100%', height: isMobile ? '100px' : '140px', display:'flex',
                background: `linear-gradient(to bottom, ${teamColors(player.city)}, #383838)`,
                borderBottom:'1px solid #808080', position: 'relative',
                overflow:'hidden'
            }}
        >
            {/* Logo */}
            <div style={{ left: isMobile ? -15 : -40, top: isMobile ? -5 : -40, position:'absolute'}}>
                <Image
                    alt={'Team Logo'}
                    src={`https://cdn.nba.com/logos/nba/${team?.id}/primary/L/logo.svg`}
                    width={isMobile ? 100 : 175}
                    height={isMobile ? 100 : 175}
                    style={{ opacity: 0.3 }}
                />
            </div>
            
            {/* Headshot */}
            <div style={{height:'100%', display:'flex', alignItems:'flex-end', marginLeft: isMobile ? '15px' : '25px', zIndex:1}}>
                <Image
                    alt={'Person Pic'}
                    src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`}
                    width={isMobile ? 100 : 175}
                    height={isMobile ? 70 : 125}
                    priority
                />
            </div>

            {/* Name + Position */}
            <div style={{
                height:'100%', display:'flex', justifyContent:'flex-end', marginLeft: isMobile ? '0px' : '25px',
                flexDirection:'column', width:'50%',
            }}>
                <p style={{margin:0, fontSize: isMobile ? '16px' : '35px', fontWeight:'bold', color:'#fff'}}>{player.name}</p>
                
                <p style={{
                    margin: isMobile ? '0px 0px 20px 0px' : '0px 0px 20px 0px', 
                    fontSize: isMobile ? '10px' : '20px', fontWeight:'bold', color:'#fff'
                }}>
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

            {matchUp ?
                <div style={{
                    display:'flex', height:'100%', alignItems:'flex-end', justifyContent:'flex-end',
                    width:'60%', color:'#fff', fontWeight:'bold', 
                    flexDirection:'column', 
                    marginRight: isMobile ? '0px' : '10px', 
                    fontSize: isMobile ? '10px' : '14px'
                }}>
                    <p style={{ 
                        marginRight: isMobile ? '10px' : '15px', 
                        marginBottom: isMobile ? '5px' : '10px', 
                        fontSize: isMobile ? '11px' : '16px' 
                    }}>
                        ({matchUp.teams[0].name === player.city ? "Home" : "Away"}) {" "}
                        {(() => {
                            const date = matchUp ? new Date(matchUp.time) : new Date();
                            const today = new Date();

                            // Check if it's today
                            if (
                                date.getFullYear() === today.getFullYear() &&
                                date.getMonth() === today.getMonth() &&
                                date.getDate() === today.getDate()
                            ) {
                                return "Today";
                            }

                            // If not today, return the day of the week
                            return date.toLocaleDateString(undefined, { weekday: 'long' });
                        })()}
                    </p>
                    
                    <div style={{marginBottom:'10px'}}>
                        <TeamsMatchUp 
                            matchUp={matchUp} 
                            index={0}
                            picked={false}
                        />
                    </div>
                </div> : null
            }
        </div>

    )
}
