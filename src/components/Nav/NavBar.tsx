import React, { Dispatch, SetStateAction, useState } from 'react'
import Link  from 'next/link'
import { green, pink } from '../../data/colors'
import { Promo } from './Promo'
import { SearchBar } from './SearchBar/SearchBar'
import Image from 'next/image';

interface Props {
    
}

export const NavBar: React.FC<Props> = ({
    
}) => {
    const promoCodes = [
        {
            name:'PrizePicks',
            url: 'https://app.prizepicks.com/sign-up?invite_code=PR-9LWKBZ1',
            promo: 'PR-9LWKBZ1', 
            picName: "prizepicks.png",
            text: '$100 Bonus'
        },
        {
            name:'UnderDog',
            url: 'https://play.underdogfantasy.com/goodluck255',
            promo: 'GOODLUCK255',
            picName: "underdog.jpeg",
            text: '$250 Bonus!'
        },
        {
            name: "Sleeper",
            url: 'https://sleeper.com/promo/RF-BENSON456',
            promo: 'BENSON456',
            picName: "sleeper.jpeg",
            text: '$100 Bonus!'
        }
    ]
    return (
        <nav style={{
            width: '100%', 
            height: '70px', 
            background: "#F33479", 
            display: 'flex',
            alignItems: 'center',
            position: 'fixed', // Make the navbar fixed
            top: 0, // Stick it to the top
            zIndex: 1000 // Ensure it stays above other content
        }}>
            <Link href="/" style={{textDecoration: 'none', height:'100%', display:'flex', alignItems:'center'}}>
                <Image src="/favicon.svg" alt="Sports Stats Icon" width={60} height={60} style={{margin: '0px 15px 0px 20px'}}/>
            </Link>

            <SearchBar />

            <div style={{marginRight:'10px'}}/>
            {promoCodes.map((promo, index) =>
                <Promo
                    picName={promo.picName} name={promo.name} 
                    text={promo.text} promo={promo.promo}
                    url={promo.url} key={index}
                />
            )}
        </nav>
    )
}