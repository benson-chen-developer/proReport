import React from 'react'
import { convertNBATeamName } from '../../Context/functions/convertNbaName'
import { PPlayer } from '../../Context/PlayerTypes'
import { useGlobalContext } from '../../Context/store'
import { bgColor } from '../Player/PPlayerPage'
import { MatchUp } from './Matches'

interface Props {
    player: PPlayer
    matchUp: MatchUp
}
export const Hero: React.FC<Props> = ({player, matchUp}) => {
    const formatMatchUpTime = (time: string): string => {
        if(time === '') return '';
        
        const date = new Date(time); //Need to use UTC time since new Date() expects a utc string but will convert to local time for you
      
        // Get local time components
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
      
        // Format hours and minutes for 12-hour clock
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
      
        // Determine if the date is today
        const today = new Date();
        const isToday = today.toDateString() === date.toDateString();
      
        // Get day of the week
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeek = daysOfWeek[date.getDay()];
      
        // Format the final time string
        const timeString = `${formattedHours}:${formattedMinutes} ${period}`;
        return isToday ? `${timeString} Today` : `${timeString} ${dayOfWeek}`;
    }

      
    return (
        <div style={{
            width:'425px', height:'130px', background: '#2B2B2B',
            borderRadius:'20px', zIndex: 2
        }}>
            {/* Not Next Game */}
            <div style={{width:'100%', height:' 75%', display:'flex', alignItems:'flex-end',}}>
                {/* PFP */}
                <div style={{ 
                    position: 'relative', width: '80px', height: '80px',
                    margin:'0px 30px 0px 20px', 
                }}>
                    <div
                        style={{
                            width: '80px',
                            height: '80px', 
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}
                    >
                        <img
                            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`}
                            style={{ width: '110px', height: '80px' }}
                        />
                    </div>
                </div>

                {/* Text */}
                <div>
                    <p style={{
                        fontSize:'23px', fontWeight:'bold', color:'#fff', 
                        margin:'0px 0px 5px 0px'
                    }}>
                        {player.name}
                    </p>
                    <p style={{
                        fontSize:'12px', fontWeight:'bold', color:'#fff', 
                        margin: '0px 0px 15px 0px'
                    }}>
                        {player.position} - {player.city}
                    </p>
                </div>
            </div>

            {/* Next Game */}
            <div style={{
                width:'100%', height:'25%', display:'flex', 
                justifyContent:'flex-end', alignItems:'flex-end', color:'#A2A2A2',
                right:0, bottom: 0, zIndex: 1, flexDirection:'column'
            }}>
                <div style={{fontSize:'14px', margin:'0px 8px 5px 0px'}}>
                    Next Game
                </div>
                <div style={{
                    height:'100%', background:'#000', width:'250px',
                    borderTopLeftRadius: '10px', borderBottomRightRadius:'10px',
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                    <p style={{fontSize: '13px', color:'#fff', fontWeight:'bold', margin:'18px'}}>
                        {matchUp.teams.length > 0 ? 
                            `${convertNBATeamName(matchUp.teams[0], 0)} vs ${convertNBATeamName(matchUp.teams[1], 0)}`
                        : ''}
                    </p>
                    <p style={{fontSize: '13px', color:'#fff', marginRight:'18px'}}>
                        {formatMatchUpTime(matchUp.time)}
                    </p>
                </div>
            </div>
        </div>
    )
}
