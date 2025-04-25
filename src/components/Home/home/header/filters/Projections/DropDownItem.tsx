import React, { Dispatch, SetStateAction, useState } from 'react'
import { convertNBATeamName } from '../../../../../../Context/functions/convertNbaName'
import Checkbox from '@mui/material/Checkbox';
import { useGlobalContext } from '../../../../../../Context/store';

interface Props {
    name: string,
}
export const DropDownItem: React.FC<Props> = ({name}) => {
    const {homeFilter, setHomeFilter} = useGlobalContext();
    const selected = homeFilter.projections.includes(name);

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
                let prev = homeFilter.projections;

                if(selected){
                    prev = prev.filter(p => p !== name);
                } else {
                    prev = [...prev, name];
                }
                setHomeFilter(p => ({...p, projections: prev}));
            }}
        >
            {/* The Team Logos + Names */}
            <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>

                <span style={{
                    color:'#fff', fontWeight:'bold',fontSize:'12px',
                    margin:'0px 3px'
                }}>
                    {name}
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
