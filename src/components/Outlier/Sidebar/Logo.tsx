import Image from 'next/image'
import React from 'react'
import { useGlobalContext } from '../../../Context/store';

interface Props {
    showBeta?: boolean,
    size?: string
}
export const Logo: React.FC<Props> = ({showBeta=true, size="large"}) => {
    const version = "1.0";
    const {isMobile} = useGlobalContext();

    return (
        <div style={{
            display:'flex', flexDirection:'column',
            alignItems: isMobile ? 'center' : 'flex-start'
        }}>
            <Image 
                src="/Logo2.svg" 
                alt="ProReport Logo"
                width={size === "large" ? 175 : 125} 
                height={size === "large" ? 50 : 30} 
                priority
            />

            {showBeta && 
                <div style={{
                    width:'100px', height:'20px', borderRadius:'100px',
                    fontWeight:'bold', display:'flex', alignItems:'center',
                    justifyContent:'center', 
                    margin:'5px 0px 0px 0px',
                    background:'#196857', fontSize:'10px', color:'#14EE9D'
                }}>
                    <p style={{margin:0}}>BETA v{version}</p>
                </div>
            }
        </div>
    )
}
