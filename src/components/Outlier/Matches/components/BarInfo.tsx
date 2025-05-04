import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { OverUnder } from '../../Hero/ProjectionSquare/OverUnder'
import { GoblinLogo } from '../../Hero/ProjectionSquare/GoblinLogo'
import { useGlobalContext } from '../../../../Context/store'
import { convertStatName } from '../../../../Context/functions/convertStatName'
import { Projection } from '../../../../Context/Types/ProjectionTypes'
import { BarData, Filter } from '../../Matches'
import { StatsSelector } from './StatsSelector'
import { ProjectionSquare } from './ProjectionSquare'

interface Props {
    mainBarData: BarData[],
    screenShotMode?: boolean
}
export const BarInfo: React.FC<Props> = ({
    mainBarData, screenShotMode
}) => {
    const router = useRouter();
    if (!router.isReady) {
        return null;
    }
    const { paramLeague } = router.query;
    const league = paramLeague as string;

    const {isMobile, filter, projections, activeProp} = useGlobalContext();
    const statName = filter.pickedProjection?.name;

    const hits = mainBarData.reduce((count, item) => {
        return item.hit === true ? count + 1 : count;
    }, 0);
    const percentHit = hits/mainBarData.length*100;
    const getColor = (percent: number): string => {
        if(percent >= 80){
            return '#79F4F4';
        } else if(percent >= 70){
            return '#fff';
        } else {
            return '#A2A2A2'
        }
    }

    const pickedProjection = filter.pickedProjection;

    const maxLength = 12;
    const statText = `${convertStatName(league, filter.pickedProjection?.name)}`;
    const truncatedStatText = statText.length > maxLength ? statText.slice(0, maxLength - 3) + "..." : statText;
    const periodText = `${filter.period !== "All" ? `(${filter.period})` : ''}`;
    const projectionText = pickedProjection ? `${filter.over ? 'O' : 'U'} ${pickedProjection.values[pickedProjection.values.length-1]}` : '';

    return (
        <div style={{width: '100%', marginTop:'10px'}}>
            <div style={{
                width:'100%', display:'flex', justifyContent:'space-between', 
                alignItems:'center', fontSize: isMobile ? '12px' : '14px'
            }}>
                <div style={{marginLeft:'20px'}}>
                    {/* Stat Name and O/U (Amount) */} 
                    <div style={{display:'flex', alignItems:'center', marginLeft:'-4px'}}>
                        <div style={{color:'#fff', fontWeight:'bold', margin:'10px 0px', display:'flex', alignItems:'flex-end'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18px" : "24px"} height={isMobile ? "18px" : "24px"} viewBox="0 0 24 24">
                                <path fill="#14EE9D" d="M19 21c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM9.553 9.658l4 2l1.553-3.105l1.789.895l-2.447 4.895l-4-2l-1.553 3.105l-1.789-.895z" />
                            </svg>
                        </div>
                        <span style={{color:'#fff', fontSize: isMobile ? '13px' : '15px', fontWeight:'bold', marginLeft:'5px'}}>
                            {isMobile ? truncatedStatText : statText} {periodText}
                        </span>
                        
                        {/* O/U (Amount) */}
                        {activeProp ?
                            <span style={{color:"#B1B1B1", fontWeight: 'bold', fontSize: isMobile ? '13px' : '15px', marginLeft:'5px'}}>
                                {projectionText}
                            </span> : null
                        }
                    </div> 

                    {/* The 90% 9 of 10 or No Projection  */}
                    {projections.find(p => p.name === statName && p.period === filter.period) && activeProp ?
                        <div style={{color: isNaN(percentHit) ? '#fff' : getColor(percentHit), fontWeight:'bold'}}>
                            {isNaN(percentHit) ?
                                'No Games' : `${percentHit.toFixed(0)}%`
                            }

                            <span style={{color: getColor(percentHit), fontSize:'12px'}}> 
                                {mainBarData.length > 0 ?
                                    ` ${hits} of ${mainBarData.length}` : ''
                                }
                            </span>
                        </div>
                            :
                        <div style={{color:'#fff', fontWeight:'bold'}}>
                            No Projection
                        </div>
                    }      
                </div>

                {/* Projection */}
                {activeProp && !screenShotMode ?
                    <div style={{ display:'flex', marginRight: isMobile ? '10px' : '20px'}}>
                        <OverUnder />
                        <GoblinLogo pickedProjection={pickedProjection}/>
                        <ProjectionSquare
                            projections={projections}
                        />
                    </div> : null
                }
            </div>
            
            {!screenShotMode ?
                <div style={{width:'100%', marginTop:'10px', overflowX:'auto'}}>
                    <StatsSelector 
                        projections={projections}
                    />
                </div> : null
            }
        </div>
    )
}
