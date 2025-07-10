import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { useGlobalContext } from '../../../../../../Context/store';
import { PPlayer } from '../../../../../../Context/Types/PlayerTypes';
import Image from 'next/image';
import { getHeadshotUrl } from '../../../../../../Context/functions/urls/getUrls';

interface Props {
    player: PPlayer,
}
export const DropDownItem: React.FC<Props> = ({player}) => {
    const {popularPropsFilter, setPopularPropsFilter, isMobile} = useGlobalContext();
    const selected = popularPropsFilter.players.find(p => p.name === player.name);

    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div
            style={{
                width:'100%', minHeight:'45px', display:'flex',
                alignItems:'center', justifyContent:'space-between',
                background: hovered || selected ? '#1e1e1e' : 'transparent',
                transition: 'background 0.2s ease',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
                let prev = popularPropsFilter.players;

                if(selected){
                    prev = prev.filter(p => p.name !== player.name);
                } else {
                    prev = [...prev, player];
                }
                setPopularPropsFilter(p => ({...p, players: prev}));
            }}
        >
            {/* The Team Logos + Names */}
            <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>
                {player.playerId ?
                    <Image
                        src={getHeadshotUrl(player)}
                        alt="Profile"
                        width={35} 
                        height={25} 
                    /> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="75%" height="75%" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.8 10.946a1 1 0 0 0-1.414.014a2.5 2.5 0 0 1-3.572 0a1 1 0 0 0-1.428 1.4a4.5 4.5 0 0 0 6.428 0a1 1 0 0 0-.014-1.414M9.01 9l-.127.007A1 1 0 0 0 9 11l.127-.007A1 1 0 0 0 9.01 9m6 0l-.127.007A1 1 0 0 0 15 11l.127-.007A1 1 0 0 0 15.01 9"/>
                    </svg>
                }

                <span style={{
                    color:'#fff', fontWeight:'bold',fontSize:'12px',
                    marginLeft: '8px'
                }}>
                    {player.name}
                </span>
            </div>

            {/* CheckBox */}
            <div style={{
                width:'30%',marginRight:'10px', display:'flex',
                justifyContent:'flex-end'
            }}>
                <Checkbox 
                    style={{padding: '5px 0px 5px 5px'}}
                    checked={!!selected}
                    sx={{
                        color: '#484c4a', // Default color
                        '&.Mui-checked': {
                        color: '#25B97C', // Color when checked
                        },
                    }}
                />
            </div>
        </div>
    )
}
