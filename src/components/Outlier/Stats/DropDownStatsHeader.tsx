import React, { Dispatch, SetStateAction, useState } from 'react'
import { useGlobalContext } from '../../../Context/store';
import { Projection } from '../../../Context/Types/ProjectionTypes';
import { bgColor } from '../../Player/PPlayerPage';
import { Filter, Filters } from '../Matches';

interface CustomLabelProps {
    filter: Filter,
    filters: Filters,
    setFilter: Dispatch<SetStateAction<Filter>>
    projections: Projection[],
    showAllStats: boolean
}
export const DropDownStatsHeader: React.FC<CustomLabelProps> = ({
    filter, filters, setFilter, projections, showAllStats
}) => {
    const {isMobile} = useGlobalContext();
    
    return (
        <div style={{marginLeft:'20px', display: 'flex', overflowX:'auto', height: isMobile ? '30px' : '50px', paddingTop:'5px'}}>
            {filters.stats.map((stat, index) => (
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
                        onClick={() => {setFilter(p => ({...p, stat: stat}))}}
                    >
                        <div style={{color: stat === filter.stat ? '#fff' : 'grey',}}>
                            <p style={{margin: 0, fontWeight: 'bold', fontSize: isMobile ? '10px' : '14px',}}>
                                {stat}
                            </p>
                        </div>
                        
                        {/* White Blip On the Bottom */}
                        <div style={{
                            height: '4px',
                            marginTop: isMobile ? '5px' : '10px',
                            width: '60%',
                            background: stat === filter.stat ? '#fff' : '',
                            borderTopLeftRadius: stat === filter.stat ? '8px' : '0',
                            borderTopRightRadius: stat === filter.stat ? '8px' : '0',
                        }}/>
                    </div>
                </div>
            ))}
        </div>
    );
}


