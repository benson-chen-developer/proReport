import React from 'react'
import { Search } from './Search'

export const SideBar = () => {
    return (
        <div style={{
            width:'20%', height:'100%', display:'flex',
            flexDirection:'column', alignItems:'center'
            // borderRight:' 1px solid #808080'
        }}>
            <div style={{height:'40px'}}/>

            <Search length='90%'/>
        </div>
    )
}
