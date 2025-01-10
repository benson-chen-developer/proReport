import React, { Dispatch, forwardRef, SetStateAction } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { PPlayer } from '../../../../Context/Types/PlayerTypes';
import { convertNBATeamName } from '../../../../Context/functions/convertNbaName';

interface Props {
    similarPlayers: PPlayer[], 
    setIsPopUp: Dispatch<SetStateAction<boolean>>
}

export const SuggestedPlayers = forwardRef<HTMLDivElement, Props>(({ similarPlayers, setIsPopUp }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                borderRadius: "10px",
                minHeight: '100px', maxHeight: "400px",
                width: '130%',
                overflowY: "auto", border: '1px solid #A2A2A2',
                backgroundColor: "#1E1E1E", marginTop: '5px', zIndex: 3
            }}
        >
            {similarPlayers.length > 0 ? (
                similarPlayers.map((player, index) => {
                    const playerDash = player.name.replace(' ', '_');
                    return (
                        // <Link 
                        //     href={`${process.env.NEXT_PUBLIC_LOCAL_ROUTE_FRONT}/player/nba/${playerDash}`} 
                        //     key={index}
                        //     passHref
                        //     onClick={() => setIsPopUp(false)}
                        //     style={{textDecoration:'none'}}
                        // >
                        <Link 
                            href={{
                                pathname: `/player/nba/[playerName]`,
                                query: { playerName: playerDash },
                            }}
                            key={index}
                            passHref
                            onClick={() => setIsPopUp(false)}
                            style={{textDecoration:'none'}}
                        >
                            <div
                                onClick={() => {}}
                                className='suggestedPlayer'
                                style={{
                                    padding: "15px", cursor: "pointer", width: '95%', display: 'flex',
                                    height: '40px', color: '#fff', alignItems: 'center'
                                }}
                            >
                                <div style={{
                                    width: "40px", height: '40px', borderRadius: 100, border: '1px solid #fff',
                                    overflow: 'hidden', marginRight: '10px', display: 'flex',
                                    alignItems: `${player.playerId ? 'flex-end' : 'center'}`,
                                    justifyContent: 'center'
                                }}>
                                    {player.playerId ?
                                        <img
                                            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`}
                                            alt="Profile"
                                            style={{
                                                width: "130%", height: '95%'
                                            }}
                                        /> :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="75%" height="75%" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.8 10.946a1 1 0 0 0-1.414.014a2.5 2.5 0 0 1-3.572 0a1 1 0 0 0-1.428 1.4a4.5 4.5 0 0 0 6.428 0a1 1 0 0 0-.014-1.414M9.01 9l-.127.007A1 1 0 0 0 9 11l.127-.007A1 1 0 0 0 9.01 9m6 0l-.127.007A1 1 0 0 0 15 11l.127-.007A1 1 0 0 0 15.01 9"/>
                                        </svg>
                                    }
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{player.name}</span>
                                    <span style={{ fontSize: '14px', color: '#A2A2A2' }}>NBA - {convertNBATeamName(player.city, 0)}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })
            ) : (
                <div style={{ padding: "15px", color: "#999" }}>
                    No players found.
                </div>
            )}
        </div>
    )
});
