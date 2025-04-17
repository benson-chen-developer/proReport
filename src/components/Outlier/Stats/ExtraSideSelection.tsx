import React, { Dispatch, SetStateAction, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { useGlobalContext } from '../../../Context/store';

interface Props {
    extraInfo: string
    setExtraInfo: Dispatch<SetStateAction<string>>
}
export const ExtraSideSelection: React.FC<Props> = ({extraInfo, setExtraInfo}) => {
    const {isMobile, activeProp} = useGlobalContext();

    const options = activeProp ? ["Stats Filter", "MatchUp Given", "Prop History"] : ["Stats Filter"];

    return (
        <div style={{
            width:'100%', height: isMobile ? '30px' : '40px', display:'flex',
            justifyContent:'center', alignItems:'center', 
            margin: isMobile ? '15px 0px 10px 0px' : '15px 0px 20px 0px'
        }}>
            <div style={{
                display: 'flex', width: '95%', fontSize: '14px', alignItems: 'center',
                fontWeight: 'bold', background: '#1E1E1E', height: '100%', borderRadius: '10px',
                padding: '5px', gap: '5px'
            }}>
                {options.map((option) => (
                    <div key={option} style={{
                        background: extraInfo === option ? '#2D2D2D' : '',
                        height: '80%', borderRadius: '10px', width: '100%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexGrow: 1, textAlign: 'center', padding: '5px', cursor:'pointer'
                    }} onClick={() => setExtraInfo(option)}>
                        <p style={{ color: '#fff', fontSize: isMobile ? '12px' : '14px', margin: 0 }}>
                            {option}
                        </p>
                    </div>
                ))}
            </div>

            {/* <p style={{fontWeight:'bold', fontSize:'18px', color:'#fff',}}>Stats Filter</p> */}

            {/* {hasProjections ?
                <div 
                    style={{
                        color:'#fff', display:'flex', fontSize:'12px', fontWeight:'bold',
                        alignItems:'center', cursor:'pointer', userSelect:'none'
                    }}
                    onClick={() => {
                        setShowAllStats(p => !p)
                    }}
                >
                    All Stats
                    <Checkbox 
                        style={{padding: '5px 0px 5px 5px'}}
                        checked={showAllStats} 
                        sx={{
                            color: '#1876D1', // Default color
                            '&.Mui-checked': {
                            color: '#1876D1', // Color when checked
                            },
                        }}
                    />
                </div> : null
            } */}
        </div>
    )
}
