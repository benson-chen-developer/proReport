import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useGlobalContext } from '../../../Context/store'
import { Logo } from '../../Outlier/Sidebar/Logo'
import { Search } from '../../Outlier/Sidebar/Search/Search'
import Button from '@mui/material/Button';

export const Landing = () => {

    const {isMobile} = useGlobalContext();

    return (
        <div style={{ 
            // width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background:'#000' 
            width: '100%', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            background: '#000', // Fallback color
            backgroundImage: "url('/Landing/Background.svg')", 
            backgroundSize: 'cover', // Ensures it covers the whole screen
            backgroundRepeat: 'no-repeat' // Prevents tiling
        }}>
            {/* Foreground */}
            <div style={{ width: '100%', position: 'relative'}}>
                <div style={{
                    width:'100%', display:'flex', 
                    margin: isMobile ? '30px 0px 0px 8%' : '30px 0px 0px 10%'
                }}>
                    <Logo />
                </div>
                
                <div style={{ width: '100%'}}>
                    {/* 1st Segment (Welcome + Lebron Pic) */}
                    <div style={{width:'100%', display:'flex'}}>
                        {/* Left Text */}
                        <div style={{width:'50%', margin: isMobile ? '0px auto 0px 8%' : '0px auto 0px 10%'}}>

                            <h1 style={{
                                color:'#79F4F4', fontWeight:'bold', 
                                fontSize: isMobile ? "23px" : '50px', 
                                margin:0, 
                                // fontFamily:'roboto',
                                wordSpacing: isMobile ? '0px' : '4px', 
                                marginTop: isMobile ? '25px' : '50px'
                            }}>
                                Search For Any Player!
                            </h1>
                            <h1 style={{
                                color:'#79F4F4', fontWeight:'bold', 
                                fontSize: isMobile ? "23px" : '50px', 
                                // fontFamily:'roboto', 
                                margin: isMobile ? '10px 0px 0px 0px' : '25px 0px 0px 0px', 
                                wordSpacing: isMobile ? '0px' : '4px'
                            }}>
                                Data on all NBA Players
                            </h1>
                            <p style={{
                                fontWeight:'bold', 
                                fontSize: isMobile ? '12px' : '18px', 
                                color:'#fff', fontFamily:'roboto', 
                                lineHeight: '1.5',
                            }}>
                                Look through previous player matches. Viewing stats and filtering via 
                                game conditions.
                            </p>
                            <p style={{
                                fontWeight:'medium', fontSize: isMobile ? '12px' : '18px', 
                                color:'#fff', fontFamily:'roboto'
                            }}>
                                Passion project made by me to combine my love of the NBA with 
                                software development.
                            </p>

                            <p style={{
                                fontWeight:'medium', fontSize: isMobile ? '12px' : '18px', 
                                color:'#B1B1B1', fontFamily:'roboto', 
                                lineHeight: '1.5', margin:'50px 20px -5px 0px'
                            }}>
                                Start Your Search! Whether its Lebron James or Steph Curry, 
                                you can look up any player to see their stats. 🏀 
                            </p>

                            <Search length={isMobile ? '100%' : '80%'}/>
                        </div>

                        {/* Right Picture */}
                        <div style={{
                            width:'40%',
                            position: 'relative', overflow: 'hidden', 
                            marginTop: isMobile ? "15px" : '30px',
                            marginLeft: isMobile ? 'auto' : '0px'
                        }}>
                            <div 
                                style={{
                                    background:'#000', border: '10px solid #000', 
                                    borderTopLeftRadius:'20px', borderBottomLeftRadius:'20px'
                                }}
                            >
                                <Image 
                                    src="/Landing/LandingPlayerDemo.png" alt="Iphone MockUp" 
                                    width={isMobile ? 650 : 800} 
                                    height={ isMobile ? 350 : 450} 
                                    style={{borderRadius: '10px'}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
