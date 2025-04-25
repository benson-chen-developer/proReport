import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { PPlayer } from '../../../../Context/Types/PlayerTypes';
import { useGlobalContext } from '../../../../Context/store';
import Image from 'next/image';
import { convertNBATeamName } from '../../../../Context/functions/convertNbaName';
import { getLeagueIcon } from '../../../Home/home/header/LeagueBtn';

interface Props {
    player: PPlayer
    setIsPopUp: Dispatch<SetStateAction<boolean>>,
    setSidebarVisible?: Dispatch<SetStateAction<boolean>>
}
export const SuggestedPlayer: React.FC<Props> = ({player, setIsPopUp, setSidebarVisible }) => {
    const {isMobile} = useGlobalContext();
    const playerDash = player.name.replace(/ /g, '_');
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                padding: "15px 0px", cursor: "pointer", width:'100%',
                background: isHovered ? '#393939' : '#1e1e1e',
                borderRadius: 10,
            }}
        >
            <Link
                href={`/player/nba/${playerDash}`}
                passHref
                target="_blank"  
                rel="noopener noreferrer"
                onClick={() => {
                    setIsPopUp(false);
                    if (isMobile) setSidebarVisible?.(false);
                }}
                style={{ textDecoration: 'none' }}
            >
                <div style={{
                    width: '100%',
                    display: 'flex',
                    height: isMobile ? "25px" : '35px',
                    color: '#fff', 
                    alignItems: 'center',
                }}>
                    <div style={{
                        width: isMobile ? "30px" : "40px", 
                        height: isMobile ? "30px" : '40px',  
                        borderRadius: 100,
                        border: '1px solid #fff',
                        overflow: 'hidden',
                        margin: '0px 10px',
                        display: 'flex',
                        alignItems: player.playerId ? 'flex-end' : 'center',
                        justifyContent: 'center'
                    }}>
                        {player.playerId ? (
                            <Image
                                src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`}
                                alt="Profile"
                                width={isMobile ? 55 : 75} 
                                height={isMobile ? 30 : 40} 
                            />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="75%" height="75%" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.8 10.946a1 1 0 0 0-1.414.014a2.5 2.5 0 0 1-3.572 0a1 1 0 0 0-1.428 1.4a4.5 4.5 0 0 0 6.428 0a1 1 0 0 0-.014-1.414M9.01 9l-.127.007A1 1 0 0 0 9 11l.127-.007A1 1 0 0 0 9.01 9m6 0l-.127.007A1 1 0 0 0 15 11l.127-.007A1 1 0 0 0 15.01 9"/>
                            </svg>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: isMobile ? "12px" : '14px', fontWeight: 'bold' }}>
                            {player.name}
                        </span>
                        <span style={{ fontSize: isMobile ? "12px" : '14px', color: '#A2A2A2' }}>
                            {player.sport.toUpperCase()} - {convertNBATeamName(player.team, 0)}
                        </span>
                    </div>

                    <div style={{marginLeft:'auto', marginRight:'10px'}}>
                        {getLeagueIcon(player.sport, isMobile ? "18px" : "24px")}
                    </div>
                </div>
            </Link>
        </div>
    )
}
