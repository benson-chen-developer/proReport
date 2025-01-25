import React, { Dispatch, SetStateAction, useState } from 'react'
import { useGlobalContext } from '../../../Context/store';
import { Promos } from './Promos/Promos'
import { Search } from './Search/Search'

interface Props {
    sidebarVisible: boolean,
    setSidebarVisible: Dispatch<SetStateAction<boolean>>
}

export const SideBar: React.FC<Props> = ({sidebarVisible, setSidebarVisible}) => {
    const {isMobile} = useGlobalContext();

    if(!isMobile) return (
        <div style={{
            width:'20%', height:'100vh', display:'flex',
            flexDirection:'column', alignItems:'center', background:'#000',
        }}>
            <div style={{height:'40px'}}/>

            <div style={{width:'90%', display:'flex', justifyContent:'space-between'}}>
                <div />
                <Promos />
            </div>

            <Search setSidebarVisible={setSidebarVisible} length='90%'/>
        </div>
    )

    if(isMobile && !sidebarVisible) return (
        <div 
            style={{position:'fixed', zIndex: 5, marginTop:10, marginLeft: 10}}
            onClick={() => setSidebarVisible(p => !p)} 
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="#fff" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m1 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"/></svg>
        </div>
    )

    return (
        <div style={{
            width:'100vw', height:'100vh', display:'flex',
            flexDirection:'column', alignItems:'center', background:'#000',
            position:'fixed', zIndex:5, overflowX: 'hidden', bottom:0
        }}>

            {/* X Btn */}
            <div style={{width:'100%', margin: '10px 0px 0px 20px'}}>
                <div 
                    style={{cursor:'pointer', }} 
                    onClick={() => setSidebarVisible(p => !p)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15"><path fill="#fff" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"/></svg>
                </div>
            </div>

            <div style={{width:'90%', display:'flex', justifyContent:'space-between'}}>
                <div />
                
                <Promos />
            </div>

            <Search setSidebarVisible={setSidebarVisible} length='90%'/>
        </div>
    )
}
