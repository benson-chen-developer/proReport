import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { TrendingPlayer } from '../../../Context/PlayerTypes';
import { SportSquare } from '../../Nav/SearchBar/DropDown/SportDropDown'
import { PlayerBox } from './PlayerBox';

export const TrendingPage = () => {
    const trendings = [
        {name:'All'},
        {name:'WNBA'},
        {name:'CS'},
        {name:'Valorant'},
        {name:'LOL'}
    ];
    const [trendingPlayers, setTrendingPlayers] = useState<TrendingPlayer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedTab, setSelectedTab] = useState<string>(trendings[0].name);

    useEffect(() => {
        const GetTrendingPlayers = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/trending/players`);
            const parsed = await res.json();
            setTrendingPlayers(parsed);
            setLoading(false);
        }

        GetTrendingPlayers();
    }, [])

    return (
        <div className='TrendingPage'>
            <h1 style={{color:'#fff', fontWeight:'bold', fontSize: '2em', marginTop:"100px", marginBottom:'15px'}}
                className="marginSides"
            >
                Trending 🔥
            </h1>

            <div style={{
                display: 'flex', marginBottom: '25px',
                overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', 
                scrollbarWidth: 'none',  msOverflowStyle: 'none'
            }} className="marginSides">
                {trendings.map((trending, index) => 
                    <SportSquare 
                        selected={trending.name === selectedTab} 
                        sport={trending.name} setSport={setSelectedTab}
                        index={index} key={index} totalLen={trendings.length}
                    />
                )}
            </div>

            <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div style={{width:'100%', height:'1px', background:'#6d6d6d', borderRadius:'10px' }} className="marginSides"/>
            </div>

            <div className="trending-box">
                {loading ? 
                    <div style={{ marginLeft: '50px', marginTop: '20px' }}>
                        <ClipLoader
                            color={'#fff'}
                            loading={true}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                        :
                    <div className="trending-container">
                        {trendingPlayers
                            .filter(player => selectedTab === "All" || player.sport === selectedTab)
                            .length > 0 ? (
                            trendingPlayers
                                .filter(player => selectedTab === "All" || player.sport === selectedTab)
                                .map((player, index) => {
                                    return (
                                        <PlayerBox 
                                            key={index} 
                                            player={player}
                                        />
                                    );
                                })
                        ) : (
                            <div style={{display:'flex', justifyItems:'center',alignItems:'center', flexDirection:'column'}}>
                                <p style={{color:'#fff', fontSize:'25px', fontWeight:'bold'}}>
                                    No Trending Players Currently 
                                </p>
                                <p style={{color:'#b2b2b2', fontSize:'20px', fontWeight:'bold'}}>
                                    Check Back Later For More
                                </p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}