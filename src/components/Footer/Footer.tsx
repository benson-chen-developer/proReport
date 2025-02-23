import React from 'react'

export const Footer = () => {
    return (
        <div style={{
            width:'100%', height:'200px', display:'flex', alignItems:'center', 
            flexDirection:'column', background: "#1E1E1E", fontSize:'14px', zIndex:100
        }}>
            <div style={{width:'100%', height:'1px', background:'#808080', borderRadius:'10px'}} />
            <div style={{width:'95%', marginTop: '35px'}}>
                <p style={{color:'#fff', fontWeight:'bold'}}>ProReport @ 2025 All Rights Reserved</p>
                <p style={{color:'#a2a2a2', fontWeight:'bold', fontSize:'12px'}}>
                    This website is for data analytics only. You must be an
                    adult and 21+ to use this site.
                </p>
                <p style={{color:'#a2a2a2', fontWeight:'bold', fontSize:'12px'}}>
                    If you or a loved one has a problem with gambling please call
                    1-800-GAMBLER to get live support.
                </p>
            </div>
        </div>
    )
}
