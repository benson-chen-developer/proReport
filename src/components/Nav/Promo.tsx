import React from 'react'
import { black } from '../../data/colors'
import Image from 'next/image';

interface Props {
    picName: string
    name: string
    text: string
    promo: string
    url: string
}

export const Promo: React.FC<Props> = ({picName, name, text, promo, url}) => {
    const handleClick = () => window.open(url, '_blank');

    return (
        <div style={{
            height:'90%', minWidth:'225px', background: black, borderRadius:10,
            margin: '0px 10px 0px 0px', display:'flex', cursor:'pointer'
        }} onClick={() => handleClick()}>
            <div style={{width:'25%', height:'100%',display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Image
                    src={`/promos/${picName}`}
                    alt={`Pic of ${picName}`} width={40} height={40}
                    style={{borderRadius:20}}
                />
            </div>

            <div style={{width:'75%', height:'100%',display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <div style={{display:'flex', height:'50%', width:'100%', alignItems:'flex-start'}}>
                    <p style={{color:'#fff', fontWeight:'bold', fontSize:'12px', marginRight:'5px'}}>{name}</p>
                    <p style={{fontWeight:'bold', fontSize:'12px', color:'#6DFC03'}}>{text}</p>
                </div>
                <div style={{display:'flex', height:'50%', alignItems:'flex-end', width:'100%'}}>
                    <p style={{color:'#fff', fontWeight:'bold', fontSize:'14px', marginRight:'5px'}}>Promo:</p>
                    <p style={{color:'#FEC83D', fontWeight:'bold', fontSize:'14px'}}>{promo}</p>
                </div>
            </div>
        </div>
    )
}
