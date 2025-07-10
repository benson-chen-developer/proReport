import React from 'react'
import { PopularProp } from '../../../../../Context/Types/ProjectionTypes'
import { CardGameFilter } from './CardGameFilter';
import { useGlobalContext } from '../../../../../Context/store';

interface Props {
    popularProp: PopularProp
}
export const CardHitsAndMisses: React.FC<Props> = ({ popularProp }) => {
    const {isMobile} = useGlobalContext();
    const hits = popularProp.popularHits.filter(hit => hit === "hit" || hit === "tie").length;
    const historyLen = popularProp.popularHits.length;
    const hitMissPercent = Math.round(hits / historyLen * 100);

    return (
        <div style={{
            width:'100%', display:'flex', alignItems:'flex-end',
            flexDirection:'column', 
            margin: isMobile ? '.25rem .75rem 0px .75rem' : '0 .75rem'
        }}>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between', marginBottom:'2px'}}>
                <p style={{color:'#fff', fontWeight:'bold', fontSize:'.75rem', margin:0}}>
                    {hits} / {historyLen} <span style={{fontWeight:'normal'}}> 
                        last <CardGameFilter popularProp={popularProp}/> games
                    </span>
                </p>

                <p style={{color:'#79F4F4', fontSize:'.75rem', fontWeight:'bold', margin:0}}>
                    {hitMissPercent}%
                </p>
            </div>

            <div style={{width:'100%', display:'flex', gap: '2px', alignItems:'center'}}>
                {popularProp.popularHits.map((val, i) => 
                    <div key={i}
                        style={{
                            background: val=== "tie" ? "#fff" : val === "hit" ? '#79F4F4' : '#A2A2A2',
                            width:'100%', height:'3px', borderRadius:'10px'
                        }} 
                    />
                )}
            </div>
        </div>
    )
}
