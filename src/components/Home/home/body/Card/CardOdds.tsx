import Image from 'next/image'
import React from 'react'
import { PopularProp } from '../../../../../Context/Types/ProjectionTypes'

interface Props {
    popularProp: PopularProp
}
export const CardOdds: React.FC<Props> = ({ popularProp }) => {
    return (
        <div style={{
            width:'auto', display:'flex', justifyContent:'center', marginTop:'10px',
            fontSize:'14px', color:'#A2A2A2', fontWeight:'bold'
        }}>
            {popularProp.propRef.odds !== 100 ?
                <Image
                    src={popularProp.propRef.odds > 100 ? "/PrizePicksDemon.png" : "/PrizePicksGoblin.png"}
                    height={16} width={16} 
                    alt="Projection icon" 
                /> : null
            }
        </div> 
    )
}
