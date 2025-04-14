import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useGlobalContext } from '../../../Context/store';
import { bgColor } from '../../Player/PPlayerPage'

interface CustomLabelProps {
}
export const PeriodStatsHeader: React.FC<CustomLabelProps> = ({}) => {
    const {filter, setValidatedFilter, projections} = useGlobalContext();
    const {pickedProjection} = filter;

    const sameStatProjections = projections.filter(projection => 
        projection.name === pickedProjection?.name &&
        projection.odds === pickedProjection.odds
    );
    const uniquePeriodsProjections = Array.from(
        new Map(sameStatProjections.map(p => [p.period, p])).values()
    );

    return (
        <div style={{display:'flex', width:'100%', marginBottom:'10px'}}>
            {uniquePeriodsProjections.map((projection, index) => 
                <div 
                    key={index}
                    style={{
                        fontWeight:'bold', width:'50px', height:'30px',
                        display:'flex', justifyContent:'center', alignItems:'center',
                        borderRadius:'5px', fontSize:'13px',
                        background: projection.period === pickedProjection!.period ? '#fff' : '',
                        color: projection.period === pickedProjection!.period ? '' : '#fff', cursor:'pointer'
                    }}
                    onClick={() => setValidatedFilter({
                        ...filter, 
                        pickedProjection: projection
                    })}
                >
                    {projection.period}
                </div>
            )}
        </div>
    )
}

/* Og */
// export const PeriodStatsHeader: React.FC<CustomLabelProps> = ({}) => {
//     const {filter, setFilter, filters} = useGlobalContext();

//     return (
//         <div style={{display:'flex', width:'100%', marginBottom:'10px'}}>
//             {filters.periods.map((stat, index) => 
//                 <div 
//                     key={index}
//                     style={{
//                         fontWeight:'bold', width:'50px', height:'30px',
//                         display:'flex', justifyContent:'center', alignItems:'center',
//                         borderRadius:'5px', fontSize:'13px',
//                         background: stat === filter.period ? '#fff' : '',
//                         color: stat === filter.period ? '' : '#fff', cursor:'pointer'
//                     }}
//                     onClick={() => setFilter(p => ({...p, period: stat}))}
//                 >
//                     {stat}
//                 </div>
//             )}
//         </div>
//     )
// }
