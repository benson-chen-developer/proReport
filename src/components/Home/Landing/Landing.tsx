import Image from 'next/image'
import React from 'react'
import { Logo } from '../../Outlier/Sidebar/Logo'
import { Search } from '../../Outlier/Sidebar/Search/Search'

export const Landing = () => {
    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>

            {/* Background with the Elicpses */}
            <div style={{
                width:'100%', height:'100%', position:'absolute', zIndex:0,
                background:'#000', display:'flex'
            }}>
                <Image 
                    src="/Blur/EllipsePurple.svg" 
                    alt="Blur" 
                    width={995} height={900} 
                />
                <Image src="/Blur/EllipseBlue.png" alt="Blur" width={1000} height={550}/>
            </div>
            
            {/* 1st Segment */}
            <div style={{width:'100%', display:'flex', position:'absolute', background:'none'}}>

                {/* Left Text */}
                <div style={{width:'50%', margin:'30px 0px 0px 10%'}}>
                    <Logo />

                    <h1 style={{
                        color:'#79F4F4', fontWeight:'bold', fontSize:'60px', fontFamily:'roboto', margin:0, 
                        letterSpacing:'2px', wordSpacing:'4px', marginTop:'50px'
                    }}>
                        Better Prices
                    </h1>
                    <h1 style={{
                        color:'#79F4F4', fontWeight:'bold', fontSize:'60px', fontFamily:'roboto', 
                        margin:'25px 0px 0px 0px', letterSpacing:'2px', wordSpacing:'4px'
                    }}>
                        Better Picks
                    </h1>
                    <p style={{
                        fontWeight:'bold', fontSize:'18px', color:'#fff', fontFamily:'roboto', 
                        lineHeight: '1.5',
                    }}>
                        Elevate your game by analyzing from thousands of players and teams. 
                        Find patterns and trends to place the best bets for FREE.
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
                <div style={{ width: '50%', position: 'relative', overflow: 'hidden',}}>
                    <div 
                        style={{
                            marginTop: '60px', background:'#000',
                            border: '15px solid #000', 
                            borderTopLeftRadius:'20px', borderBottomLeftRadius:'20px'
                        }}
                    >
                        <Image 
                            src="/LandingPlayerDemo.png" alt="Iphone MockUp" width={800} height={450} 
                            style={{borderRadius:'10px'}}
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}
