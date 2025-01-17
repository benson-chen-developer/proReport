import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { bgColor } from '../../Player/PPlayerPage'
import { Filter, Filters } from '../Matches'

interface CustomLabelProps {
    filter: Filter, filters: Filters,
    setFilter: Dispatch<SetStateAction<Filter>>
}
export const PeriodStatsHeader: React.FC<CustomLabelProps> = ({
    filter, setFilter, filters
}) => {
    return (
        <div style={{display:'flex', width:'100%', marginBottom:'20px'}}>
            {filters.periods.map((stat, index) => 
                <div 
                    key={index}
                    style={{
                        fontWeight:'bold', width:'50px', height:'30px',
                        display:'flex', justifyContent:'center', alignItems:'center',
                        borderRadius:'5px', fontSize:'13px',
                        background: stat === filter.period ? '#fff' : '',
                        color: stat === filter.period ? '' : '#fff', cursor:'pointer'
                    }}
                    onClick={() => setFilter(p => ({...p, period: stat}))}
                >
                    {stat}
                </div>
            )}
        </div>
    )
}
