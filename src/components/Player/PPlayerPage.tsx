import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { PMatches } from '../Outlier/Matches';
import { SideBar } from '../Outlier/Search/SideBar';

interface Props {
    league: string,
    playerName: string
}
export const bgColor = "#1E1E1E"; //tron #0B1C1F

export const PPlayerPage: React.FC<Props> = ({league, playerName}) => {
    return (
        <div style={{display:'flex', width:'100%', background: bgColor}}>
            <SideBar />

            <PMatches league={league} playerName={playerName}/>
        </div>
    )
    // if(!loading && !player) return(
    //     <NotFound />
    // )

    return <div style={{
        width:'100%', minHeight:'100vh', justifyContent:'center', alignItems:'center',
        display:'flex'
    }}>
        <ClipLoader
            color={'#000'}
            loading={true}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
}
