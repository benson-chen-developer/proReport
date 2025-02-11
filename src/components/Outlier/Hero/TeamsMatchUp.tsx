import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { teamColors } from '../../../Context/functions/colors/colors';
import { convertNBATeamName } from '../../../Context/functions/convertNbaName';
import { useGlobalContext } from '../../../Context/store';
import { Team } from '../../../Context/Types/PlayerTypes';
import { MatchUp } from '../Matches';

interface Props {
    matchUp: MatchUp
    teams: Team[]
    index: number
    picked: boolean
    setPickedMatchUps: Dispatch<SetStateAction<MatchUp[]>>
}

export const TeamsMatchUp: React.FC<Props> = ({matchUp, teams, index, picked, setPickedMatchUps}) => {
    const {isMobile} = useGlobalContext();
    const [isHovered, setIsHovered] = useState(false);

    const date = matchUp ? new Date(matchUp!.time) : new Date();
    let formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    formattedTime = formattedTime.replace(/^0/, ''); /* Gets rid of leading zero. EX) 07:00 to 7:00 */

    const team1: Team = teams.find(t => convertNBATeamName(matchUp?.teams[0], 0) === convertNBATeamName(t.name, 0))!;
    const team2: Team = teams.find(t => convertNBATeamName(matchUp?.teams[1], 0) === convertNBATeamName(t.name, 0))!;

    if(teams.length === 0) return null;

    return (
        <div style={{
            display:'flex', alignItems:'flex-end', justifyContent:'flex-end',
            color:'#fff', fontWeight:'bold', 
            flexDirection:'column',
            marginRight: isMobile ? '0px' : '10px', 
            marginLeft: index === 0 ? '5px' : '0px',
            fontSize: isMobile ? '10px' : '12px'
        }}>
            <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                    setPickedMatchUps(p => {
                        const exists = p.some(m => m.teams[0] === matchUp.teams[0] && m.time === matchUp.time);
                
                        if (exists) {
                            return p.filter(m => !(m.teams[0] === matchUp.teams[0] && m.time === matchUp.time)); 
                        } else {
                            return [...p, matchUp];
                        }
                    });
                }}
                
                style={{
                    borderRadius:'20px', background:'#1E1E1E',
                    border: picked || isHovered ? '1px solid #fff' : '1px solid #2B2B2B', 
                    padding:'0px 10px',
                    display:'flex', alignItems:'center',cursor:'pointer',
                    justifyContent:'space-between',
                    width:'auto', 
                    height: isMobile ? '21px' : '40px', 
                }}
            >
                <div style={{display:'flex', alignItems:'center'}}>
                    <NBATeamCircle 
                        teamId={team1.id} 
                        color={teamColors(team1.name)!}
                    />
                    <span style={{margin:'0px 5px'}}>
                        {`
                            ${convertNBATeamName(matchUp?.teams[0], 0)} 
                                vs
                            ${convertNBATeamName(matchUp?.teams[1], 0)}
                        `} 
                    </span>
                    <NBATeamCircle 
                        teamId={team2.id} 
                        color={teamColors(team2.name)!}
                    />
                </div>

                <span style={{fontWeight: 'normal', marginLeft:'10px'}}>
                    {formattedTime}
                </span>
            </div>
        </div>
    )
}

interface Props2 {
    teamId: string, 
    color: string
}

const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return `#${(
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
        .toString(16)
        .slice(1)}`;
};

const NBATeamCircle: React.FC<Props2> = ({teamId, color}) => {
    return(
        <div style={{
            width:'22px', height:'22px', borderRadius:'100px', 
            display:'flex', justifyContent:'center', alignItems:'center',
            // background: lightenColor(color, 20)
            background:color
        }}>
            <Image 
                src={`https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`}
                alt="Team Logo"
                width={18} height={18}
            />
        </div>
    )
}