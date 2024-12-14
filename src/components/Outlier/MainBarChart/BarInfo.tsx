import React, { useEffect, useState } from 'react'
import { convertStatName } from '../../../Context/functions/convertStatName'
import { PGame } from '../../../Context/PlayerTypes'
import { BarData, Filter, MatchUp } from '../Matches'

interface Props {
    filter: Filter,
    avg: number,
    seasonAvg: number,
    mainBarData: BarData[]
}
export const BarInfo: React.FC<Props> = ({filter, avg, seasonAvg, mainBarData}) => {
    const hits = mainBarData.reduce((count, item) => {
        return item.hit === true ? count + 1 : count;
    }, 0);
    const percentHit = hits/mainBarData.length*100;
    const getColor = (percent: number): string => {
        if(percent >= 80){
            return '#14EE9D';
        } else if(percent >= 60){
            return '#ede515';
        } else {
            return '#ff0000'
        }
    }

    const fullStatName = convertStatName(filter.stat);

    return (
        <>
            <div style={{
                margin:'20px 0px 0px 50px', color:'#fff', fontSize:'15px', fontWeight:'bold'
            }}>
                {fullStatName}
                <span style={{color:"#B1B1B1", fontWeight:'normal', fontSize:'14px'}}> Last 10</span>
            </div>

            <div style={{
                margin:'10px 40px 15px 50px', color:'#fff', fontSize:'14px', fontWeight:'bold',
                display:'flex', justifyContent:'space-between'
            }}>
                {isNaN(percentHit) ?
                    <div>
                        No Games
                    </div>
                        :
                    <div>
                        {percentHit.toFixed(0)}%
                        <span style={{color: getColor(percentHit), fontSize:'12px'}}> {hits} of {mainBarData.length}</span>
                    </div>
                }

                <div style={{fontSize:'14px'}}>
                    <span style={{color:"grey", fontSize:'13px'}}>Avg </span> 
                    <span style={{fontWeight:'normal', color:'#A2A2A2'}}> {filter.lastGame}: </span>
                    {isNaN(avg) ? 'NA' : avg.toFixed(1)}
                    <span style={{fontWeight:'normal', color:'#A2A2A2'}}>  24-25: </span>
                    {isNaN(seasonAvg) ? 'NA' : seasonAvg.toFixed(1)}
                </div>
            </div>
        </>
    )
}
