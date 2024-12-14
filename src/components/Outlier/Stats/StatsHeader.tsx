import React, { Dispatch, SetStateAction } from 'react'
import { bgColor } from '../../Player/PPlayerPage';
import { Filter, Filters } from '../Matches';

interface CustomLabelProps {
    filters: Filters;
    filter: Filter,
    setFilter: Dispatch<SetStateAction<Filter>>
}
export const StatsHeader: React.FC<CustomLabelProps> = ({filter, filters, setFilter}) => {
    return (
        <div style={{width:'500px', display:'flex', marginTop:'10px'}}>
            {filters.supportingStats.map((stat, index) => 
                <div 
                    key={index}
                    style={{
                        cursor:'pointer', color:'#fff', paddingRight:'20px',
                        display:'flex', flexDirection:'column', justifyContent:'space-between',
                    }}
                    onClick={() => setFilter(p => ({...p, supportingStat: stat}))}
                >
                    <div style={{color: stat === filter.supportingStat ? '#fff' : 'grey', marginTop:'5px',}}>
                        <p style={{margin:0, fontWeight:'bold', marginBottom:'15px', fontSize:'14px'}}>{stat}</p>
                    </div>

                    <div style={{
                        height:'3px', width:'100%',
                        background: stat === filter.supportingStat ? '#fff' : '',
                        borderTopLeftRadius: stat === filter.supportingStat ? '8px' : '0', 
                        borderTopRightRadius: stat === filter.supportingStat ? '8px' : '0',
                    }}/>
                </div>
            )}
        </div>
    )
}
