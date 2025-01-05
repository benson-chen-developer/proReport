import React, { Dispatch, SetStateAction, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';

interface Props {
    showAllStats: boolean,
    setShowAllStats: Dispatch<SetStateAction<boolean>>
}
export const StatsFilterHeader: React.FC<Props> = ({showAllStats, setShowAllStats }) => {
    return (
        <div style={{width:'95%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <p style={{fontWeight:'bold', fontSize:'18px', color:'#fff',}}>Stats Filter</p>
            <div 
                style={{
                    color:'#fff', display:'flex', fontSize:'12px', fontWeight:'bold',
                    alignItems:'center', cursor:'pointer', userSelect:'none'
                }}
                onClick={() => setShowAllStats(p => !p)}
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
            </div>
        </div>
    )
}
