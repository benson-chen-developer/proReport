import React from 'react'
import { PopularProp } from '../../../../../Context/Types/ProjectionTypes'
import { Filter } from '../../../../Outlier/Matches';

interface Props {
    popularProp: PopularProp,
}
export const CardGameFilter: React.FC<Props>  = ({popularProp}) => {
    const getFiltersText = (filter: Filter): string[] => {
        let strArr: string[] = [];

        if(filter.isAway && !filter.isHome) strArr.push('At Away')
        if(filter.isHome && !filter.isAway) strArr.push('At Home')
        if(filter.lastGame === "H2H") strArr.push('H2H')

        return strArr;
    }

    return (
        <span>
             {getFiltersText(popularProp.popularGameFilter as unknown as Filter).length !== 0 ?
                <span>
                    {getFiltersText(popularProp.popularGameFilter as unknown as Filter).map((str, i) => 
                        <span key={i}>
                            ({str})
                        </span>
                    )}
                </span> : ""
            }
        </span>
    )
}

{/* <div style={{fontSize:'12px', color:'#A2A2A2', marginTop:'15px'}}>
                    <div style={{display:'flex'}}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#fff"
                                d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2z"
                            />
                        </svg>
                        <span style={{color:'#fff', marginLeft:'5px'}}>
                            Game Conditions
                        </span>
                    </div>

                    {getFiltersText(popularProp.popularGameFilter as unknown as Filter).map((str, i) => 
                        <p style={{margin: '5px 0px 0px 0px'}} key={i}>
                            - {str}
                        </p>
                    )}
                </div> */}
