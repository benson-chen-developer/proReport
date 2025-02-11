import React, { useState } from 'react'
import { SideBar } from '../../components/Outlier/Sidebar/SideBar';
import { useGlobalContext } from '../../Context/store';
import { Body } from '../popular/body/Body';
import { Header } from '../popular/header/Header';

export const Index = () => {
    const {isMobile} = useGlobalContext();
    const [loading, setLoading] = useState<boolean>(true);

    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <div style={{display: "flex", width: "100%", background: "#000" }}>
            <SideBar 
                sidebarVisible={sidebarVisible} 
                setSidebarVisible={setSidebarVisible}
            />

            <div style={{width: isMobile ? '100%' : '80%', height:'100%'}}>
                <Header />  

                <Body />
            </div>
        </div>
    )
}

export default Index;