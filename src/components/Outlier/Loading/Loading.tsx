import React from 'react'
import { ClipLoader } from 'react-spinners'

export const Loading = () => {
    return (
        <div style={{
            width:'100vw', height:'100vh', background:'#000', display:'flex', 
            justifyContent:'center',
        }}>
            <ClipLoader color='#fff' size={40} style={{marginTop:'25px'}}/>
        </div>
    )
}
