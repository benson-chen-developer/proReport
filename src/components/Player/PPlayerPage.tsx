import React, { useState } from 'react'
import { Matches } from '../Outlier/Matches';
import { SideBar } from '../Outlier/Sidebar/SideBar';
import { useGlobalContext } from '../../Context/store';
import { FilterBtn } from '../Overlay/Filter/FilterBtn';

interface Props {
    league: string,
    playerName: string
}
export const bgColor = "#1E1E1E"; //tron #0B1C1F

export const PPlayerPage: React.FC<Props> = ({league, playerName}) => {
    const {isMobile} = useGlobalContext();
    const [loading, setLoading] = useState<boolean>(true);

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const [isOverLayFilter, setIsOverLayFilter] = useState(false);

    return (
        <div style={{display: "flex", width: "100%", background: "#000" }}>
            <SideBar 
                sidebarVisible={sidebarVisible} 
                setSidebarVisible={setSidebarVisible}
            />

            <Matches 
                loading={loading} setLoading={setLoading}
                isOverLayFilter={isOverLayFilter}
            />

            {isMobile && !sidebarVisible && !loading ? 
                <FilterBtn 
                    isOverLayFilter={isOverLayFilter} 
                    setIsOverLayFilter={setIsOverLayFilter}
                /> 
                    : 
                null
            }
        </div>
    );
}
