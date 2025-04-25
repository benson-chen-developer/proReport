import React, { Dispatch, SetStateAction, useState } from 'react'
import { isSameMatchup, MatchUp } from '../../../../../../Context/Types/Match'
import { TeamCircle } from '../../../../../Outlier/Hero/TeamsMatchUp'
import { convertNBATeamName } from '../../../../../../Context/functions/convertNbaName'
import Checkbox from '@mui/material/Checkbox';
import { useGlobalContext } from '../../../../../../Context/store';

interface Props {
    matchUp: MatchUp,
}
export const DropDownItem: React.FC<Props> = ({matchUp}) => {
    const {homeFilter, setHomeFilter} = useGlobalContext();
    const selected = homeFilter.matches.find(match => isSameMatchup(match, matchUp));

    const team1 = matchUp.teams[0];
    const team2 = matchUp.teams[1];

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
                let prevMatches = homeFilter.matches;

                if(selected){
                    prevMatches = prevMatches.filter(m => !isSameMatchup(m, matchUp));
                } else {
                    prevMatches = [...prevMatches, matchUp];
                }
                setHomeFilter(p => ({...p, matches: prevMatches}));
            }}
        >
            {/* The Team Logos + Names */}
            <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>
                <TeamCircle team={team1}/>

                <span style={{
                    color:'#fff', fontWeight:'bold',fontSize:'12px',
                    margin:'0px 3px'
                }}>
                    {convertNBATeamName(team1.name, 0)}
                    <span style={{fontWeight:'normal', color:'#b1b1b1', margin:'0px 2px'}}>
                        vs
                    </span>
                    {convertNBATeamName(team2.name, 0)}
                </span>

                <TeamCircle team={team2}/>
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