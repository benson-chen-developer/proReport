import React, { useState } from 'react'
import { Matches } from '../Outlier/Matches';
import { SideBar } from '../Outlier/Sidebar/SideBar';
import { useGlobalContext } from '../../Context/store';
import { FilterBtn } from '../Overlay/Filter/FilterBtn';
import { NoProjectionMatches } from '../Outlier/Matches/components/NoProjection/NoMatchesProjection';

interface Props {
    league: string,
    playerName: string
}
export const bgColor = "#1E1E1E"; //tron #0B1C1F

export const PPlayerPage: React.FC<Props> = ({league, playerName}) => {
    const {isMobile, filter} = useGlobalContext();
    const [loading, setLoading] = useState<boolean>(true);

    /* For Mobile Filter */
    const [filterShow, setFilterShow] = useState(false);

    return (
        <div style={{display: "flex", width: "100%", background: "#000" }}>
            <SideBar />

            <Matches 
                loading={loading} setLoading={setLoading}
            /> 

            {/* {isMobile && !sidebarVisible && !loading ? 
                <FilterBtn 
                    isOverLayFilter={isOverLayFilter} 
                    setIsOverLayFilter={setIsOverLayFilter}
                /> 
                    : 
                null
            } */}
        </div>
    );
}
