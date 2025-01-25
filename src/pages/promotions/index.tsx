import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { SideBar } from '../../components/Outlier/Sidebar/SideBar';
import {PromoItem} from '../../components/Outlier/Promos/PromoItem';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { fetchPromos } from '../../Context/functions/fetchPromos';
import { useGlobalContext } from '../../Context/store';
// import CloseIcon from '@mui/icons-material/Close';


export type Promo = {
    sportsbook: string, 
    code: string,
    link: string,
    liveStates: string[],
    signUp: string,
    signUpValue: number
    description: string
}

const Index = () => {
    const {isMobile}  = useGlobalContext();
    const [promos, setPromos] = useState<Promo[]>([]);

    /* SideBar Mobiele Responsive */
    const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        const func = async () => {
            const promos = await fetchPromos();
            setPromos(promos)
        }

        func();
    }, [])

    /* SnackBar (Copied Code) */
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            </IconButton>
        </React.Fragment>
    );

    return (
        <div style={{background:'#1E1E1E', width:'100%', minHeight:'100vh', display:'flex'}}>
            <SideBar setSidebarVisible={setSidebarVisible} sidebarVisible={sidebarVisible}/>

            {/* Right Side */}
            <div style={{width: isMobile ? '100%' : '80%', alignItems:'center', display:'flex', overflowX:'hidden',flexDirection:'column'}}>
                {/* 
                    Best Sportsbook Promotions and Bonuses
                        All sportsbooks are licensed, safe, and trusted

                        $1,000 Bonus Available 
                */}
                <div style={{
                    width:'90%', fontWeight:'bold', color:'#fff', zIndex:2, display:'flex', 
                    justifyContent:'space-between', marginTop:'65px'
                }}>
                    <div>
                        <div style={{display:'flex', alignItems:'center', marginLeft:'-5px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#fff" d="M11 14v8H7a3 3 0 0 1-3-3v-4a1 1 0 0 1 1-1zm8 0a1 1 0 0 1 1 1v4a3 3 0 0 1-3 3h-4v-8zM16.5 2a3.5 3.5 0 0 1 3.163 5H20a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-7V7h-2v5H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h.337A3.5 3.5 0 0 1 4 5.5C4 3.567 5.567 2 7.483 2c1.755-.03 3.312 1.092 4.381 2.934l.136.243c1.033-1.914 2.56-3.114 4.291-3.175zm-9 2a1.5 1.5 0 0 0 0 3h3.143C9.902 5.095 8.694 3.98 7.5 4m8.983 0c-1.18-.02-2.385 1.096-3.126 3H16.5a1.5 1.5 0 1 0-.017-3"/></svg>
                            <h1 style={{fontSize: isMobile ? '16px' : '28px', margin:'0px 6px'}}>
                                Best Sportsbook Promotions and Bonuses
                            </h1>
                        </div>
                        <p style={{fontSize: isMobile ? '12px' : '16px', color:'#B1B1B1'}}>All sportsbooks are licensed, safe, and trusted</p>
                    </div>

                    {/* Total Bonus */}
                    <div style={{
                        width: isMobile ? '100px' : '235px', height: isMobile ? '30px' : '45px', 
                        borderRadius:100, 
                        background:'#C6FFDB', display:'flex', alignItems:'center', justifyContent:'center'
                    }}>
                        <p style={{
                            fontSize: isMobile ? '10px' : '18px', color:'#1E1E1E', 
                            fontWeight:'bold', textAlign:'center'
                        }}>
                            $1,000 Bonus Available
                        </p>
                    </div>
                </div>

                {/* Promo Items */}
                <div style={{width:'90%', marginTop:'30px'}}>
                    {promos.map((promo, i) => 
                        <PromoItem promo={promo} toastFunc={handleClick} key={i}/>
                    )}
                </div>

                {/* Green Blur Up Top */}
                <div style={{
                    position:'absolute', zIndex: 0, 
                    pointerEvents: 'none', width: isMobile ? '100%' : '80%', display:'flex',
                    top: '-140px'
                }}>
                    <Image 
                        src="/EllipseGreen.png" 
                        alt="Blur" 
                        width={2000} height={300} 
                    />
                </div>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
                message="Code Copied"
                action={action}
            />
        </div>
    )
}

export default Index;