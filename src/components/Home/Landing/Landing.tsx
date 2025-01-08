import Image from 'next/image'
import React from 'react'
import { Search } from '../../Outlier/Sidebar/Search/Search'

export const Landing = () => {
    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>

            {/* Background with the Elicpses */}
            <div style={{
                width:'100%', height:'100%', position:'absolute', zIndex:0,
                background:'#1E1E1E', display:'flex', justifyContent:'space-between'
            }}>
                <Image src="/EllipseWhite.png" alt="Blur" width={175} height={900} />
                <Image src="/EllipseBlue.png" alt="Blur" width={650} height={550}/>
            </div>
            
            <div style={{width:'85%', display:'flex', position:'absolute', background:'none'}}>
                {/* Left Text */}
                <div style={{width:'50%', margin:'85px 0px 0px 20px'}}>
                    <h1 style={{
                        color:'#79F4F4', fontWeight:'bold', fontSize:'70px', fontFamily:'roboto', margin:0, 
                        letterSpacing:'2px', wordSpacing:'4px'
                    }}>
                        Free To Use
                    </h1>
                    <h1 style={{
                        color:'#79F4F4', fontWeight:'bold', fontSize:'65px', fontFamily:'roboto', 
                        margin:'25px 0px 0px 0px', letterSpacing:'2px', wordSpacing:'4px'
                    }}>
                        Better Picks
                    </h1>
                    <p style={{
                        fontWeight:'bold', fontSize:'22px', color:'#fff', fontFamily:'roboto', 
                        lineHeight: '1.5',
                    }}>
                        Elevate your game by analyzing from thousands of players and teams. Find patterns and trends to place the best bets for FREE.
                    </p>

                    <p style={{
                        fontWeight:'medium', fontSize:'18px', color:'#B1B1B1', fontFamily:'roboto', 
                        lineHeight: '1.5', margin:'10px 0px -5px 0px'
                    }}>
                        Start Your Search! NBA is always <span style={{color:'#79F4F4', fontWeight:'bold',}}>FREE</span> 🏀
                    </p>

                    <Search length='80%'/>
                </div>

                {/* Right Picture */}
                <div style={{width:'50%'}}>
                    <Image src="/iphoneMockup.svg" alt="Iphone MockUp" width={650} height={650} />
                </div>
            </div>

        </div>
    )
}
