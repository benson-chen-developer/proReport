import Image from 'next/image';
import React from 'react'
import { TrendingPlayer } from '../../../Context/PlayerTypes';
import { LeagueIcon } from '../../Nav/SearchBar/DropDown/SportBtn';
import { searchPlayer } from '../../Nav/SearchBar/SearchBar';

interface Props {
    player: TrendingPlayer,
}

const boxSize = '175px'; const iconSize = '50px'
export const PlayerBox: React.FC<Props> = ({player}) => {
    return (
        <div style={{
            width: boxSize, height: boxSize,
            background: '#4c2f39',
            border: '2px solid #fff',
            borderRadius: 20,
            display: 'flex', cursor:'pointer',
            justifyContent: 'space-evenly',
            alignItems: 'center', flexDirection:'column'
        }} onClick={() => {
            if(player.lastName){
                searchPlayer(`${player.firstName}_${player.lastName}`, player.sport, true);
            } else {
                searchPlayer(`${player.firstName}_`, player.sport, true);
            }
        }}>
            {player.picId !== "" ? 
                <Image
                    src={`${player.picId}`}
                    alt={`Headshot of ${player.firstName} ${player.lastName}`}
                    width={80}
                    height={60}
                /> :
                <LeagueIcon sport={player.sport} size={"40px"}/>
            }

            {/* <div style={{display:'flex', width:'70%', justifyContent:'space-evenly'}}>
                <p style={{color: '#fff', margin:0, fontSize:'14px', fontWeight:'bold'}}>{getDay(game.results.easternTime)}</p>
                <p style={{ color: '#fff', margin:0, fontSize:'14px' }}>{convertToEST(game.results.easternTime)}</p>
                </div> */}
            <h3 style={{ color: '#fff', margin:0, fontSize:'16px' }}>{player.firstName} {player.lastName}</h3>
            <p style={{ color: '#fff', margin:0, fontSize:'16px' }}>{player.sport} • {player.team}</p>
        </div>
    )
}
