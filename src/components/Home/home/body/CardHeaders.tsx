import React from 'react'
import { useGlobalContext } from '../../../../Context/store';

export const CardHeaders = () => {
    const {isMobile} = useGlobalContext();
    
    return (
        <div style={{
            width:'100%', display:'flex', color:'#A2A2A2', fontWeight:'bold',
            fontSize:'.75rem', padding: '.75rem 0px 0.5rem 0px'
        }}>
            <p style={{margin:0, width: isMobile ? '30%' : '30%', marginLeft:'1.25rem'}}>
                Player+Game
            </p>

            <p style={{margin:0, width:'100px'}}>Prop</p>

            <p style={{margin:0}}>Opp Ranking</p>

            <p style={{margin:'0px 1rem 0px auto'}}>Odds</p>
        </div>
    )
}
