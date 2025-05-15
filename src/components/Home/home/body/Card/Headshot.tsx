import Image from 'next/image'
import React from 'react'
import { getHeadshotUrl } from '../../../../../Context/functions/urls/getUrls'
import { PopularProp } from '../../../../../Context/Types/ProjectionTypes'

interface Props {
    popularProp: PopularProp
}
export const Headshot: React.FC<Props> = ({ popularProp }) => {
    return (
        <div style={{ 
            position: 'relative', height: '100%', marginBottom:'.25',
            display:'flex', alignItems:'center', marginLeft:'.5rem'
        }}>
            {/* Team Logo */}
            {/* <div style={{position: 'absolute', right:'.25rem'}}>
                <TeamCircle team={team} />
            </div> */}

            {/* Player Picture */}
            <Image
                src={getHeadshotUrl(popularProp.propRef.player)}
                style={{marginTop:'-5px'}}
                height={35}
                width={50} 
                alt="Player Picture"
            />
        </div>
    )
}
