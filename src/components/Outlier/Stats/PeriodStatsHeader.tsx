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

    /* If there is only an "ALL" period then no need to show it */
    if(
        uniquePeriodsProjections.length === 1 && 
        uniquePeriodsProjections[0].period === 'All'
    ) return null;

    return (
        <div style={{
            display:'flex', width:'100%', marginBottom:'10px', flexDirection:'column',
        }}>
            <p className='filterTitle'>
                Period
            </p>

            <div style={{display:'flex'}}>
                {uniquePeriodsProjections.map((projection, index) => 
                    <div 
                        key={index}
                        style={{
                            fontWeight:'bold', width:'50px', height:'30px',
                            display:'flex', justifyContent:'center', alignItems:'center',
                            borderRadius:'5px', fontSize:'13px', marginRight:'5px',
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
        </div>
    )
}
