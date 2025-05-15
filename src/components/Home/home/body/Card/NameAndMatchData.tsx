import React from 'react'
import { PopularProp } from '../../../../../Context/Types/ProjectionTypes'
import { convertTeamName, convertTime } from '../../../../../Context/functions/convertTeamName'

interface Props {
    popularProp: PopularProp
}
export const NameAndMatchData: React.FC<Props> = ({ popularProp }) => {
     const matchUpText = `
        ${convertTeamName(popularProp.matchUp.teams[0].name, 0, popularProp.matchUp.league)} 
            vs 
        ${convertTeamName(popularProp.matchUp.teams[1].name, 0, popularProp.matchUp.league)} - 
    `

    return (
        <div style={{minWidth: '25%', marginLeft:'.75rem'}}>
            <p style={{color:'#fff', fontWeight:'bold', margin:'0px', fontSize:'14px'}}>
                {popularProp.propRef.player.name}
            </p>
            <p style={{color:'#A2A2A2', fontWeight:'bold', margin:'0.25rem 0px 0px 0px', fontSize:'12px'}}>
                {matchUpText} 

                <span style={{fontWeight:'normal'}}>
                    {convertTime(popularProp.matchUp.time, 'Day')} {convertTime(popularProp.matchUp.time, 'Time')}
                </span>
            </p>
        </div> 
    )
}
