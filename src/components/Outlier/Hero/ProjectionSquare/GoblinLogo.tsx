import Image from 'next/image'
import React from 'react'
import { Projection } from '../../../../Context/Types/ProjectionTypes'

interface Props {
    pickedProjection: Projection | null
}

export const GoblinLogo: React.FC<Props> = ({pickedProjection}) => {
    return (
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
    )
}
