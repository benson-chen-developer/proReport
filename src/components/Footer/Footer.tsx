import React from 'react'
import { black } from '../../data/colors'

export const Footer = () => {
    return (
        <div style={{
            width:'100%', height:'150px', display:'flex', alignItems:'center',
            flexDirection:'column', background: black
        }}>
            <div style={{width:'95%', height:'1px', background:'#545454', borderRadius:'10px'}} />
            <div style={{width:'95%', marginTop: '50px'}}>
                <p style={{color:'#fff', fontWeight:'bold'}}>Sports Stats @ 2024 All Rights Reserved</p>
            </div>
        </div>
    )
}
