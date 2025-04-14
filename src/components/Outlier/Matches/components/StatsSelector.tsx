import React, { Dispatch, SetStateAction, useState } from 'react'
import { Projection } from '../../../../Context/Types/ProjectionTypes';
import { useGlobalContext } from '../../../../Context/store';

interface Props {
    projections: Projection[],
}
export const StatsSelector: React.FC<Props> = ({
    projections
}) => {
    const {isMobile, filter, setValidatedFilter} = useGlobalContext();
    const stats = Array.from(new Set(projections.map(p => p.name)));
    const statName = filter.pickedProjection?.name;

    const selectProjection = (stat: string) => {
        if(stat !== filter.pickedProjection?.name){
            const picked = projections.find(projection => projection.name === stat)
            
            setValidatedFilter(({...filter, pickedProjection: picked!}));
        }
    }
    
    return (
        <div style={{marginLeft:'20px', display: 'flex', overflowX:'auto', height: isMobile ? '30px' : '50px', paddingTop:'5px'}}>
            {stats.map((stat, index) => (
                <div 
                    key={index} 
                    style={{ position: 'relative' }}
                >
                    {/* Stat */}
                    <div 
                        style={{
                            cursor: 'pointer',
                            color: '#fff',
                            paddingRight: '15px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                        onClick={() => selectProjection(stat)}
                    >
                        <div style={{color: stat === statName ? '#fff' : 'grey',}}>
                            <p style={{margin: 0, fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px',}}>
                                {stat}
                            </p>
                        </div>
                        
                        {/* White Blip On the Bottom */}
                        <div style={{
                            height: '4px',
                            marginTop: isMobile ? '5px' : '10px',
                            width: '60%',
                            background: stat === statName ? '#fff' : '',
                            borderTopLeftRadius: stat === statName ? '8px' : '0',
                            borderTopRightRadius: stat === statName ? '8px' : '0',
                        }}/>
                    </div>
                </div>
            ))}
        </div>
    );
}


