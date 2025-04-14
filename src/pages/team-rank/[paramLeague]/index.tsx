import React from 'react'
import { SideBar } from '../../../components/Outlier/Sidebar/SideBar';
import { TeamRanking } from '../../../components/Pages/TeamRankings/TeamRanking';

const Index = () => {
    return (
        <div style={{width:'100%', height:'100%', background:'#1E1E1E', display:'flex'}}>
            <SideBar />
            
            <TeamRanking />
        </div>
    )
}

export default Index;
