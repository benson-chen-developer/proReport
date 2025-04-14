import React from 'react'
import { Projection } from '../../../../Context/Types/ProjectionTypes'
import { useGlobalContext } from '../../../../Context/store'
import { Filter } from '../../Matches'


interface Props {
}
export const OverUnder: React.FC<Props> = () => {
    const {isMobile, pickedProjection, filter, setFilter} = useGlobalContext();

    if(filter.pickedProjection?.overUnder === 3) return (
        <div style={{
            width: isMobile ? '25px' : '30px', height: isMobile ? '25px' : '30px', 
            border: isMobile ? '2px solid #5B5B5B' : 'solid 3px #5B5B5B',
            borderRadius:'8px', display:'flex', alignItems:'center',
            justifyContent:'center', marginRight:'8px', cursor:'pointer',
            transition: 'transform 0.3s ease',
            transform: filter.over ? 'rotate(0deg)' : 'rotate(180deg)'
        }} onClick={() => {
            setFilter((p: Filter) => ({...p, over: !p.over}))
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
        </div> 
    )

    return null;
}
