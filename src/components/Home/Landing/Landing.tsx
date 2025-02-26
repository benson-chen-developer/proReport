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

                {/* 1st Segment */}
                <div style={{width:'100%', display:'flex'}}>
                    {/* Left Text */}
                    <div style={{width:'50%', margin: isMobile ? '60px 0px 0px 10%' : '30px 0px 0px 10%'}}>
                        <Logo />

                        <h1 style={{
                            color:'#79F4F4', fontWeight:'bold', 
                            fontSize: isMobile ? "30px" : '60px', 
                            fontFamily:'roboto', margin:0, 
                            letterSpacing:'2px', 
                            wordSpacing: isMobile ? '0px' : '4px', 
                            marginTop: isMobile ? '25px' : '50px'
                        }}>
                            Better Prices
                        </h1>
                        <h1 style={{
                            color:'#79F4F4', fontWeight:'bold', 
                            fontSize: isMobile ? "30px" : '60px', 
                            fontFamily:'roboto', 
                            margin: isMobile ? '10px 0px 0px 0px' : '25px 0px 0px 0px', 
                            letterSpacing:'2px', 
                            wordSpacing: isMobile ? '0px' : '4px'
                        }}>
                            Better Picks
                        </h1>
                        <p style={{
                            fontWeight:'bold', 
                            fontSize: isMobile ? '14px' : '18px', 
                            color:'#fff', fontFamily:'roboto', 
                            lineHeight: '1.5',
                        }}>
                            Elevate your game by analyzing from thousands of players and teams. 
                            Find patterns and trends to place the best bets for FREE.
                        </p>

                        <p style={{
                            fontWeight:'medium', fontSize: isMobile ? '12px' : '18px', 
                            color:'#B1B1B1', fontFamily:'roboto', 
                            lineHeight: '1.5', margin:'10px 0px -5px 0px'
                        }}>
                            Start Your Search! NBA is always <span style={{color:'#79F4F4', fontWeight:'bold',}}>FREE</span> 🏀
                        </p>

                        <Search length={isMobile ? '100%' : '80%'}/>

                        <p style={{
                            fontWeight:'medium', fontSize: isMobile ? '12px' : '18px', color:'#B1B1B1', fontFamily:'roboto', 
                            lineHeight: '1.5', margin:'10px 0px -5px 0px'
                        }}>
                            See today's popular picks
                        </p>

                        <Link
                            href="/home"
                            style={{
                                width: isMobile ? '50px' : '100px',
                                height: isMobile ? '30px' : '40px',
                                background: '#8FC9F9',
                                borderRadius: '5px',
                                fontSize: isMobile ? '12px' : '18px',
                                marginTop:'10px',
                                textAlign: 'center',
                                display: 'flex', // Makes it behave like a button
                                alignItems: 'center', // Centers text vertically
                                justifyContent: 'center', // Centers text horizontally
                                textDecoration: 'none', // Removes default underline
                                fontWeight: 'bold', // Optional: makes text stand out
                                color:'#000'
                            }}
                        >
                            Home
                        </Link>

                    </div>

                    {/* Right Picture */}
                    <div style={{ 
                        width: '50%', position: 'relative', overflow: 'hidden', 
                        marginLeft: isMobile ? '40px' : '0px'
                    }}>
                        <div 
                            style={{
                                marginTop: isMobile ? '80px' : '60px', background:'#000',
                                border: '10px solid #000', 
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

                {/* 2nd Segment */}
                <div style={{width:'100%', display:'flex', justifyContent:'center', textAlign:'center', marginBottom:'100px'}}>
                    <div style={{
                        color:'#fff', fontSize: isMobile ? '22px' : '30px', fontWeight:'bold', 
                        marginTop: isMobile ? '125px' : '225px', 
                        width: isMobile ? '80%' : '60%'
                    }}>
                        Welcome to our Beta 🤖

                        <p style={{ fontSize: isMobile ? '12px' : '16px', color:'#c1cfd5'}}>
                            Certain features will be missing and app issues may exist. Our team is hard at work addressing these problems. <br /><br />
                            Be on the lookout for changes as new features are constantly being added! <br /><br />
                            During beta all features will be <span style={{color:'#79F4F4'}}>FREE</span> to gather feedback. <br /><br />
                            You can send feedback and report bugs here: <span style={{color:'#fff'}}>proreport.helper@gmail.com</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
