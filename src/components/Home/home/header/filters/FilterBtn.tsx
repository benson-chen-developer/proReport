import React from 'react'
import { useGlobalContext } from '../../../../../Context/store';

export const FilterBtn = () => {
    const {isMobile} = useGlobalContext();
    const width = isMobile ? '14' : '18';

    return (
        <div style={{
            height: isMobile ? '2rem' : '2.5rem', 
            width: '65px',
            borderRadius:'5px', border:'1px solid #5B5B5B',
            background: false ? '#fff' : '#151515', 
            fontSize: '12px',
            display:'flex', alignItems:'center', justifyContent:'space-evenly'
        }}>
            <div style={{margin:'3px -3px 0px 0px'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={width}
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#fff"
                        d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2z"
                    />
                </svg>
            </div>


            <span style={{
                color:'#fff', fontWeight:'bold'
            }}>
                Filter
            </span>
        </div>
    )
}
