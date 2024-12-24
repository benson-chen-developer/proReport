import React, { useEffect, useState } from 'react'
import { black } from '../data/colors'
import Head from 'next/head';
import '@fontsource/roboto'; // Defaults to weight 400
import '@fontsource/comfortaa';
import { Landing } from '../components/Home/Landing/Landing';

const Trending = () => {
    // useEffect(() => {
    //     const fetchTodayGames = async () => {
    //         try {
    //             // const newTrendingGames = await fetchTodayWNBAGames();
    //             const newTrendingGames: any [] = [];
    //             setHomePlayersLoad(true);
    //             setTrendingGames(newTrendingGames);
    //         }
    //         catch (error) {
    //             setHomePlayersLoad(true);
    //             console.error('Error fetching today\'s games:', error);
    //         }
    //     };
    
    //     fetchTodayGames();
    // }, []);
    
    return (
        <>

        <Head>
            <title>{'Trending Players'}</title>
            <meta name="description" content={"Players playing games today and trending"} />
            <meta name="ahrefs-site-verification" content="881627b9cdfce1e5ef0a890ec7d5477594ec45471d470d5eeaadea5976b61433" />
        </Head>

        <div style={{minHeight:'100vh', minWidth: '100vw', background: black, display:'flex', flexDirection:'column'}}>
            <Landing />
        </div>

        </>
    )
}

export default Trending;