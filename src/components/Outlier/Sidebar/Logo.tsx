import Image from 'next/image'
import React from 'react'

export const Logo = () => {
    return (
        <div style={{display:'flex', alignItems:'center'}}>
            {/* <div style={{
                width:'30px', height:'30px', background:'#fff', borderRadius:'5px',
                display:'flex', alignItems:'center', justifyContent:'center'
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#048998" d="M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V5h4V3h10v2h4v3q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m10 0q.9-.325 1.45-1.088T19 8V7h-2z"/></svg>
            </div>

            <h1 style={{color:'#fff', fontSize:'24px', marginLeft:'10px'}}>
                ProReport
            </h1> */}
            <Image 
                src="/logo2.svg" 
                alt="ProReport Logo"
                width={175} 
                height={50} 
                priority
            />

            <div style={{
                width:'40px', height:'20px', borderRadius:'100px',
                fontWeight:'bold', display:'flex', alignItems:'center',
                justifyContent:'center', margin:'5px 0px 0px 10px',
                background:'#196857', fontSize:'10px', color:'#14EE9D'
            }}>
                <p style={{margin:0}}>BETA</p>
            </div>
        </div>
    )
}
