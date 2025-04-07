import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { teamColors } from '../../../Context/functions/colors/colors';
import { convertNBATeamName } from '../../../Context/functions/convertNbaName';
import { useGlobalContext } from '../../../Context/store';
import { MatchUp } from '../../../Context/Types/Match';
import { Team } from '../../../Context/Types/PlayerTypes';

interface Props {
    matchUp: MatchUp
    index: number
    picked: boolean
    setPickedMatchUps?: Dispatch<SetStateAction<MatchUp[]>>
}

export const TeamsMatchUp: React.FC<Props> = ({matchUp, index, picked, setPickedMatchUps}) => {
    const {isMobile} = useGlobalContext();
    const [isHovered, setIsHovered] = useState(false);

    const date = matchUp ? new Date(matchUp!.time) : new Date();
    let formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    formattedTime = formattedTime.replace(/^0/, ''); /* Gets rid of leading zero. EX) 07:00 to 7:00 */

    const team1: Team = matchUp.teams[0];
    const team2: Team = matchUp.teams[1];

    if(setPickedMatchUps) return (
        <div style={{
            display:'flex', alignItems:'flex-end', justifyContent:'flex-end',
            color:'#fff', fontWeight:'bold', 
            flexDirection:'column',
            marginRight: isMobile ? '5px' : '10px', 
            marginLeft: index === 0 ? '5px' : '0px',
            fontSize: isMobile ? '10px' : '12px'
        }}>
            <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                    setPickedMatchUps(p => {
                        const prev = [...p];
                        const foundIndex = p.findIndex(pickedMatch => 
                            pickedMatch.teams.some(m => 
                                matchUp.teams.some(n => n.name === m.name)
                            ) && pickedMatch.time === matchUp.time
                        );
                        
                        if (foundIndex !== -1) {
                            prev.splice(foundIndex, 1);
                        } else {
                            prev.push(matchUp);
                        }

                        return prev;
                    });
                }}
                
                style={{
                    borderRadius:'20px', background:'#1E1E1E',
                    border: picked || (isHovered && !isMobile) ? '1px solid #fff' : '1px solid #2B2B2B', 
                    padding:'0px 10px',
                    display:'flex', alignItems:'center',cursor:'pointer',
                    justifyContent:'space-between',
                    width:'auto', 
                    height: isMobile ? '30px' : '40px', 
                }}
            >
                <div style={{display:'flex', alignItems:'center'}}>
                    <NBATeamCircle team={team1} />
                    <span style={{margin:'0px 5px'}}>
                        {`
                            ${convertNBATeamName(team1.name, 0)} 
                                vs
                            ${convertNBATeamName(team2.name, 0)}
                        `} 
                    </span>
                    <NBATeamCircle team={team2} />
                </div>

                <span style={{fontWeight: 'normal', marginLeft:'10px'}}>
                    {formattedTime}
                </span>
            </div>
        </div>
    )

    return (
        <div style={{
            display:'flex', alignItems:'flex-end', justifyContent:'flex-end',
            color:'#fff', fontWeight:'bold', 
            flexDirection:'column',
            marginRight: isMobile ? '5px' : '10px', 
            marginLeft: index === 0 ? '5px' : '0px',
            fontSize: isMobile ? '8px' : '12px'
        }}>
            <div 
                style={{
                    display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap',
                    borderRadius: '20px', background: '#1E1E1E',
                    border: '1px solid #2B2B2B',
                    padding: isMobile ? "0px 5px" : '0px 15px',
                    alignItems: 'center', cursor: 'pointer',
                    justifyContent: 'space-between',
                    width: 'fit-content', // Adjusts width based on content but prevents wrapping
                    minWidth: isMobile ? '60px' : '100px',
                    height: isMobile ? '25px' : '40px',
                }}
                
            >
                <div style={{display:'flex', alignItems:'center'}}>
                    <NBATeamCircle team={team1} />
                    <span style={{margin:'0px 5px'}}>
                        {`
                            ${convertNBATeamName(team1.name, 0)} 
                                vs
                            ${convertNBATeamName(team2.name, 0)}
                        `} 
                    </span>
                    <NBATeamCircle team={team2} />
                </div>

                <span style={{fontWeight: 'normal', marginLeft: isMobile ? '3px' : '10px'}}>
                    {formattedTime}
                </span>
            </div>
        </div>
    )
}

interface Props2 {
    team: Team | undefined, 
}

/* Either pass in team or teamId */
export const NBATeamCircle: React.FC<Props2> = ({team}) => {
    const {isMobile} = useGlobalContext();

    if(!team) return null;

    return(
        <div style={{
            width: isMobile ? '18px' : '22px', height:isMobile ? '18px' : '22px', borderRadius:'100px', 
            display:'flex', justifyContent:'center', alignItems:'center',
            background: teamColors(team.name)
        }}>
            <Image 
                src={`https://cdn.nba.com/logos/nba/${team.id}/primary/L/logo.svg`}
                alt="Team Logo"
                width={isMobile ? 16 : 18} height={isMobile ? 16 : 18}
            />
        </div>
    )
}