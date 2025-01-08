import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { convertStatName } from '../../../Context/functions/convertStatName'
import { useGlobalContext } from '../../../Context/store'
import { PGame } from '../../../Context/Types/PlayerTypes'
import { Projection } from '../../../Context/Types/ProjectionTypes'
import { ProjectionSquare } from '../Hero/Projection'
import { BarData, Filter, MatchUp } from '../Matches'

interface Props {
    filter: Filter,
    avg: number,
    seasonAvg: number,
    mainBarData: BarData[],
    projections: Projection[],
}
export const BarInfo: React.FC<Props> = ({filter, avg, seasonAvg, mainBarData, projections}) => {
    const hits = mainBarData.reduce((count, item) => {
        return item.hit === true ? count + 1 : count;
    }, 0);
    const percentHit = hits/mainBarData.length*100;
    const getColor = (percent: number): string => {
        if(percent >= 80){
            return '#79F4F4';
        } else if(percent >= 70){
            return '#c9e8e8';
        } else {
            return '#A2A2A2'
        }
    }

    const fullStatName = convertStatName(filter.stat);

    return (
        <div style={{width:'100%', display:'flex', padding:'10px 20px', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <div style={{display:'flex', alignItems:'center', marginLeft:'-4px'}}>
                    <div style={{color:'#fff', fontWeight:'bold', margin:'10px 0px', display:'flex', alignItems:'flex-end'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                            <path fill="#14EE9D" d="M19 21c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM9.553 9.658l4 2l1.553-3.105l1.789.895l-2.447 4.895l-4-2l-1.553 3.105l-1.789-.895z" />
                        </svg>
                    </div>
                    <span style={{color:'#fff', fontSize:'15px', fontWeight:'bold', marginLeft:'5px'}}>
                        {fullStatName}
                    </span>
                    <span style={{color:"#B1B1B1", fontWeight:'normal', fontSize:'14px', margin:'1px 0px 0px 3px'}}> Last 10</span>
                </div> 

                {projections.find(p => p.name === filter.stat) ?
                    <div style={{color:'#fff', fontSize:'14px', fontWeight:'bold', height:'20px'}}>
                        {percentHit.toFixed(0)}%
                        <span style={{color: getColor(percentHit), fontSize:'12px'}}> {hits} of {mainBarData.length}</span>
                    </div>
                        :
                    <div style={{color:'#fff', fontSize:'14px', fontWeight:'bold', height:'20px'}}>
                        No Projection
                    </div>
                }
            </div>

            {projections.length > 0 ?
                <div style={{marginRight:'40px'}}>
                    <ProjectionSquare projection={projections[1]}/>
                </div> : null
            }
        </div>
    )
}
