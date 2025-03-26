import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { convertStatName } from '../../../Context/functions/convertStatName'
import { useGlobalContext } from '../../../Context/store'
import { PGame } from '../../../Context/Types/PlayerTypes'
import { Projection } from '../../../Context/Types/ProjectionTypes'
import { ProjectionSquare } from '../Hero/Projection'
import { BarData, Filter, Filters } from '../Matches'
import { DropDownStatsHeader } from '../Stats/DropDownStatsHeader'

interface Props {
    avg: number,
    seasonAvg: number,
    mainBarData: BarData[],
    projections: Projection[],
    setProjections: Dispatch<SetStateAction<Projection[]>>
    pickedProjection:Projection | null
    setPickedProjection: Dispatch<SetStateAction<Projection | null>>
    filters: Filters,
    showAllStats: boolean
}
export const BarInfo: React.FC<Props> = ({
    avg, seasonAvg, mainBarData, projections, setProjections, pickedProjection, setPickedProjection,
    filters, showAllStats
}) => {
    const {isMobile, filter, setFilter} = useGlobalContext()

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

    // The stat name (Rebounds+assists) litearly changes before the pickedprojections for some reaosn
    // debugger;
    // console.log("barinfo", pickedProjection)
    // debugger;
    const maxLength = 12;
    const statText = `${convertStatName(filter.stat)}`;
    const truncatedStatText = statText.length > maxLength ? statText.slice(0, maxLength - 3) + "..." : statText;

    const periodText = `${filter.period !== "All" ? `(${filter.period})` : ''}`;
    const projectionText = pickedProjection ? `${filter.over ? 'O' : 'U'} ${pickedProjection.values[pickedProjection.values.length-1]}` : '';

    return (
        <div style={{width: '100%', marginTop:'10px'}}>
            <div style={{
                width:'100%', display:'flex', justifyContent:'space-between', 
                alignItems:'center', fontSize: isMobile ? '12px' : '14px'
            }}>
                {/* The 90% 9 of 10 */}
                <div style={{marginLeft:'20px'}}>
                    <div style={{display:'flex', alignItems:'center', marginLeft:'-4px'}}>
                        <div style={{color:'#fff', fontWeight:'bold', margin:'10px 0px', display:'flex', alignItems:'flex-end'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18px" : "24px"} height={isMobile ? "18px" : "24px"} viewBox="0 0 24 24">
                                <path fill="#14EE9D" d="M19 21c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM9.553 9.658l4 2l1.553-3.105l1.789.895l-2.447 4.895l-4-2l-1.553 3.105l-1.789-.895z" />
                            </svg>
                        </div>
                        <span style={{color:'#fff', fontSize: isMobile ? '13px' : '15px', fontWeight:'bold', marginLeft:'5px'}}>
                            {isMobile ? truncatedStatText : statText} {periodText}
                        </span>
                        <span style={{color:"#B1B1B1", fontWeight: 'bold', fontSize: isMobile ? '13px' : '15px', marginLeft:'5px'}}>
                            {projectionText}
                        </span>
                    </div> 

                    {projections.find(p => p.name === filter.stat && p.period === filter.period) ?
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

                {/* Projections */}
                {(
                    pickedProjection && 
                    pickedProjection.name === filter.stat && 
                    pickedProjection.period === filter.period  && 
                    projections.length > 0
                ) ?
                    <div style={{ display:'flex', marginRight: isMobile ? '10px' : '20px'}}>
                        {pickedProjection?.overUnder === 3 ?
                            <div style={{
                                width: isMobile ? '25px' : '30px', height: isMobile ? '25px' : '30px', 
                                border: isMobile ? '2px solid #5B5B5B' : 'solid 3px #5B5B5B',
                                borderRadius:'8px', display:'flex', alignItems:'center',
                                justifyContent:'center', marginRight:'8px', cursor:'pointer',
                                transition: 'transform 0.3s ease',
                                transform: filter.over ? 'rotate(0deg)' : 'rotate(180deg)'
                            }} onClick={() => {
                                setFilter(p => ({...p, over: !p.over}))
                            }}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    style={{ marginBottom: '2px', transition: 'transform 0.3s ease' }} 
                                    width={isMobile ? '12' : "16"}
                                    height={isMobile ? '12' : "16"}
                                    viewBox="0 0 16 16"
                                >
                                    <path fill="#fff" d="M8 .5L.5 8H5v8h6V8h4.5z"/>
                                </svg>
                            </div> : null
                        }
                        
                        <div style={{display:'flex', alignItems:'center'}}>
                            {pickedProjection && pickedProjection.odds !== 100 ?
                                <Image 
                                    src={pickedProjection.odds > 100 ? "/PrizePicksDemon.png" : "/PrizePicksGoblin.png"}
                                    height={20} width={20} 
                                    alt="Projection icon" 
                                    style={{margin:'0px 10px 0px 0px'}}
                                /> : null
                            }
                        </div>
                        <ProjectionSquare 
                            pickedProjection={pickedProjection}
                            setPickedProjection={setPickedProjection}
                            projections={projections}
                            setProjections={setProjections}
                        />
                    </div> 
                        :
                    null
                }
            </div>

            <div style={{width:'100%', marginTop:'10px', overflowX:'auto'}}>
                <DropDownStatsHeader 
                    filter={filter} setFilter={setFilter}
                    filters={filters} 
                    projections={projections}
                    showAllStats={showAllStats}
                />
            </div>
        </div>
    )
}
