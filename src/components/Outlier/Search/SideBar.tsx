import React from 'react'
import { Search } from './Search'

export const SideBar = () => {
    return (
        <div style={{
            width:'20%', height:'100%', display:'flex',
            flexDirection:'column', alignItems:'center'
        }}>
            <Search />
        </div>
    )
}
