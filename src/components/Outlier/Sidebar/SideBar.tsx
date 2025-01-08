import React from 'react'
import { Promos } from './Promos/Promos'
import { Search } from './Search/Search'

export const SideBar = () => {
    return (
        <div style={{
            width:'20%', height:'100vh', display:'flex',
            flexDirection:'column', alignItems:'center', background:'#000'
            // borderRight:' 1px solid #808080'
        }}>
            <div style={{height:'40px'}}/>

            <div style={{width:'90%', display:'flex', justifyContent:'space-between'}}>
                <div />
                <Promos />
            </div>

            <Search length='90%'/>
        </div>
    )
}
