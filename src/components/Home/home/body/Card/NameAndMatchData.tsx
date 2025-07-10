import React from 'react'
import { PopularProp } from '../../../../../Context/Types/ProjectionTypes'
import { convertTeamName, convertTime } from '../../../../../Context/functions/convertTeamName'
import { useGlobalContext } from '../../../../../Context/store'

interface Props {
    popularProp: PopularProp
}
export const NameAndMatchData: React.FC<Props> = ({ popularProp }) => {
    const {isMobile} = useGlobalContext();

     const matchUpText = `
        ${convertTeamName(popularProp.matchUp.teams[0].name, 0, popularProp.matchUp.league)} 
            vs 
        ${convertTeamName(popularProp.matchUp.teams[1].name, 0, popularProp.matchUp.league)}
    `

    return (
        <div style={{minWidth: isMobile ? "25%" : '25%', marginLeft:'.75rem'}}>
            <p style={{
                color:'#fff', fontWeight:'bold', margin:'0px', 
                fontSize: isMobile ? "10px" : '14px'
            }}>
                {popularProp.propRef.player.name.slice(0,14)}
            </p>
            <p style={{
                color:'#A2A2A2', fontWeight:'bold', margin:'0.25rem 0px 0px 0px', 
                fontSize: isMobile ? "10px" : '12px'
            }}>
                {matchUpText} {isMobile ? '' : '- '}

                <span style={{
                    fontWeight:'normal', 
                    display: isMobile ? 'block' : 'inline'
                }}>
                    {convertTime(popularProp.matchUp.time, 'Day')} {convertTime(popularProp.matchUp.time, 'Time')}
                </span>
            </p>
        </div> 
    )
}
