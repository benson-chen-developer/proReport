import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useGlobalContext } from '../../../Context/store';
import { Search } from './Search/Search'
import { useRouter } from 'next/router';
import { Logo } from './Logo';

interface Props {
}

export const SideBar: React.FC<Props> = () => {
    const router = useRouter();

    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const {isMobile} = useGlobalContext();
    const { paramLeague, paramPlayer } = router.query; 
    const isPlayerPage = router.pathname.startsWith('/player');

    const links: {text:string, link:string}[] = [
        // {text: 'Home', link: '/home'},
        // {text: 'Promos', link: '/promotions'},
        {text: 'Team Rankings', link: '/team-rank'},
    ]

    const getIcon = (text:string, picked: boolean) => {
        if(text === "Popular Picks") return <svg xmlns="http://www.w3.org/2000/svg" style={{margin:'0px 10px'}} width="20" height="20" viewBox="0 0 24 24"><path fill={picked ? "#fff" : "#A2A2A2"} d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z"/></svg>
        if(text === "Promos") return <svg xmlns="http://www.w3.org/2000/svg"  style={{margin:'0px 10px'}} width="20" height="20" viewBox="0 0 24 24"><path fill={picked ? "#fff" : "#A2A2A2"} d="M12.005 22.003c-5.523 0-10-4.477-10-10s4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10m-3.5-8v2h2.5v2h2v-2h1a2.5 2.5 0 1 0 0-5h-4a.5.5 0 1 1 0-1h5.5v-2h-2.5v-2h-2v2h-1a2.5 2.5 0 1 0 0 5h4a.5.5 0 0 1 0 1z"/></svg>
        if(text === "Home") return <svg xmlns="http://www.w3.org/2000/svg" style={{margin:'0px 10px'}} width="20" height="20" viewBox="0 0 24 24"><g fill={picked ? "#fff" : "#A2A2A2"}><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06z"/><path d="m12 5.432l8.159 8.159q.045.044.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198l.091-.086z"/></g></svg>
        if(text === "Team Rankings") return <svg xmlns="http://www.w3.org/2000/svg" style={{margin:'0px 10px'}} width="20" height="20" viewBox="0 0 24 24"><path fill={picked ? "#fff" : "#A2A2A2"} d="M3 21q-.425 0-.712-.288T2 20V10q0-.425.288-.712T3 9h3.5q.425 0 .713.288T7.5 10v10q0 .425-.288.713T6.5 21zm7.25 0q-.425 0-.712-.288T9.25 20V4q0-.425.288-.712T10.25 3h3.5q.425 0 .713.288T14.75 4v16q0 .425-.288.713T13.75 21zm7.25 0q-.425 0-.712-.288T16.5 20v-8q0-.425.288-.712T17.5 11H21q.425 0 .713.288T22 12v8q0 .425-.288.713T21 21z"/></svg>
        if(text === "player") return <svg xmlns="http://www.w3.org/2000/svg" style={{margin:'0px 10px'}} width="20" height="20" viewBox="0 0 24 24"><path fill="#79F4F4" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4"/></svg>
    }

    const styles = {
        notMobile: {
            width: isMobile ? "100vw" : "20%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#000",
            position: isMobile ? "fixed" : "relative",
            zIndex: 5,
            overflowX: "hidden",
            bottom: isMobile ? 0 : "auto",
        },
    };
    
    if(isMobile && !sidebarVisible) return (
        <div 
            style={{position:'fixed', zIndex: 5, marginTop:10, marginLeft: 10}}
            onClick={() => setSidebarVisible(p => !p)} 
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="#fff" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m1 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"/></svg>
        </div>
    )

    return (
        <div style={{
            width: isMobile ? "100vw" : "20%",
            position: isMobile ? "fixed" : "relative",
            bottom: isMobile ? 0 : "auto",
            height: isMobile ? "100vh" : "auto", 
            display: "flex",
            flexDirection: "column", alignItems: "center",
            background: "#000", zIndex: 6, 
            // overflowX: "hidden",
        }}>

            {/* X Btn */}
            {isMobile ?
                <div style={{width:'100%', margin: '10px 0px 0px 20px'}}>
                    <div 
                        style={{cursor:'pointer', }} 
                        onClick={() => setSidebarVisible(p => !p)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15"><path fill="#fff" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"/></svg>
                    </div>
                </div> : null
            }
            <div style={{height:'25px'}}/>

            {/* Logo */}
            <div style={{
                width: isMobile ? "100%" : '85%', 
                display:'flex', justifyContent: isMobile ? "center" : 'flex-start'
            }}>
                <Logo />
            </div>
            <div style={{height:'10px'}} />
            
            {/* Search */}
            <Search setSidebarVisible={setSidebarVisible} length='90%'/>
            <div style={{height:'10px'}} />

            {/* Player Page (Ex: Lebron James if on Lebron Page) */}
            {isPlayerPage && paramLeague && paramPlayer ?
                <div 
                    style={{
                        width:'90%', height:"50px", marginTop:'10px',
                        background: "#183838",
                        fontWeight:'bold', borderRadius:'10px', fontSize:'14px',
                        display:'flex', alignItems:'center', textDecoration:'none'
                    }}
                >
                    {getIcon('player', true)}
                    <p style={{color: '#79F4F4'}}>{
                        (paramPlayer as string).replace(/_/g, ' ')
                    }</p>

                    <div style={{
                        height:'40%', width:'5px', background:'#fff', 
                        marginLeft:'auto', borderTopLeftRadius:'10px', 
                        borderBottomLeftRadius:'10px'
                    }}/>
                </div> : null
            }

            {/* Actual Options (Ex: Home, Promos, Team Rankings) */}
            {links.map((link, i) => {
                const router = useRouter();
                const isActive = router.pathname.startsWith(link.link);
        
                return (
                    <Link 
                        key={i}
                        href={link.link} 
                        style={{
                            width:'90%', height:"50px", marginTop:'10px',
                            background: isActive || hoveredIndex === i ? "#1E1E1E" : "#000",
                            fontWeight:'bold', borderRadius:'10px', fontSize:'14px',
                            display:'flex', alignItems:'center', textDecoration:'none'
                        }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {getIcon(link.text, isActive)}
                        <p style={{color: isActive ? '#fff' : '#A2A2A2'}}>{link.text}</p>

                        {isActive ?
                            <div style={{
                                height:'40%', width:'5px', background:'#fff', 
                                marginLeft:'auto', borderTopLeftRadius:'10px', 
                                borderBottomLeftRadius:'10px'
                            }}/> : null
                        }
                    </Link>
                )
            })}
        </div>
    )
}
