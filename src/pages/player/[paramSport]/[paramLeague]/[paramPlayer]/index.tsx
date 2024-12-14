import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import Head from 'next/head';
import { EPlayerPage } from '../../../../../components/Player/EPlayerPage';
import { PPlayerPage } from '../../../../../components/Player/PPlayerPage';

interface Props{
    // allGamesLoaded: {league: string, loaded: boolean}[]
    // setAllGamesLoaded: Dispatch<SetStateAction<{league: string, loaded: boolean}[]>>
}
export const metadate = {
    title: 'Player Stats Page'
}

/*
    This page is in the url form of /WNBA/Caitlyn_clark

    The name has to be perfect or else it doesn't work
*/
const Player: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { paramSport, paramPlayer, paramLeague } = router.query;

    if(paramLeague) return (
        <>

        <Head>
            <title>{paramPlayer ? `${(paramPlayer as string).split('_').join(' ')} | Sports Stats` : 'Player Stats Page'}</title>
            <meta name="description" content={paramPlayer ? `Check out the latest stats for ${(paramPlayer as string).split('_').join(' ')}` : 'Player Stats Page'} />
            <meta name="keywords" content={`WNBA, fantasy, rebounds, points, assists, steals, blocks`} />
        </Head>

        {(paramSport as string) === "p" ?
            <PPlayerPage 
                playerName={(paramPlayer as string).split('_').join(' ').trim()}
                league={paramLeague as string}
            /> : null
        }
        {(paramSport as string) === "e" ?
            <EPlayerPage 
                playerName={paramPlayer as string} 
                league={paramLeague as string}
            /> : null
        }

        </>
    )

    return (
        <div style={{
            width:'100%', minHeight:'100vh', justifyContent:'center', alignItems:'center',
            display:'flex'
        }}>
            <ClipLoader
                color={'#000'}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Player;