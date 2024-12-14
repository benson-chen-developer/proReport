import React, { Dispatch, SetStateAction } from 'react'
import { bgColor } from '../../Player/PPlayerPage'
import { Filter } from '../Matches'

interface CustomLabelProps {
    filter: Filter,
    setFilter: Dispatch<SetStateAction<Filter>>
}
export const PeriodStatsHeader: React.FC<CustomLabelProps> = ({
    filter, setFilter
}) => {
    const stats = ['All', "H1", "H2", "Q1", "Q2", "Q3", "Q4"]

    return (
        <div style={{display:'flex', width:'100%'}}>
            {stats.map((stat, index) => 
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
