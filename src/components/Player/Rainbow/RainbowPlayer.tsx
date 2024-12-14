import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { useGlobalContext } from '../../../Context/store';
import { RainbowGame, RainbowPlayer } from '../../../Context/PlayerTypes';
import { Hero } from '../Componenets/Hero';
import { Row } from '../Componenets/Row';
import { StatComparator } from '../Componenets/StatComparator';
import { TableHeader } from '../Componenets/TableHeader';

export const RainbowPlayerPage = () => {
    const router = useRouter();
    const { paramPlayer, paramLeague } = router.query;
    const {fetchRainbowPlayers} = useGlobalContext();
    const [player, setPlayer] = useState<RainbowPlayer | undefined>(undefined);
    const [allGames, setAllGames] = useState<RainbowGame[]>([]);
    const [displayedStats, setDisplayedStats] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const allPickedBtns = ["All Maps", "Map 1", "Map 2", "Map 3", "Map 1+2"];
    const statsHeader = [
        {name: "K", underName: "Kills"},
        {name: "D", underName: "Deaths"},
    ];
    const [compareTo, setCompareTo] = useState<string[]>(Array(statsHeader.length).fill(""))
    const [pickedBtn, setPickedBtn] = useState<string>(allPickedBtns[0])

    const compareFunction = (newAllGames: RainbowGame[], foundPlayer: RainbowPlayer): number[][] => {
        const addUpMaps = (pickedNumbers: number[], game: RainbowGame) => {
            let statsArr: number[] = Array(statsHeader.length).fill(0);
            let didNotPlayAtAll = true;

            for(let number of pickedNumbers){
                let map = game.maps[number];
                
                if(map && map.didPlay){
                    let playerStats = map.players.find(p => p.name === foundPlayer.firstName)
                    statsArr[0] += Number(playerStats!.kills)
                    statsArr[1] += Number(playerStats!.deaths)
                    didNotPlayAtAll = false;
                } else {
                    if(didNotPlayAtAll) return [-1];
                }
            }

            return statsArr;
        }

        let displayStats: number[][] = [];
        if(pickedBtn === 'All Maps') {
            displayStats = newAllGames.map((game) => addUpMaps([0,1,2], game))
        } 
        else if(pickedBtn === 'Map 1'){
            displayStats = newAllGames.map((game) => addUpMaps([0], game))
        }
        else if(pickedBtn === 'Map 2'){
            displayStats = newAllGames.map((game) => addUpMaps([1], game))
        }
        else if(pickedBtn === 'Map 3'){
            displayStats = newAllGames.map((game) => addUpMaps([2], game))
        }
        else if (pickedBtn === 'Map 1+2') {
            displayStats = newAllGames.map((game) => addUpMaps([0,1], game));
        }

        return displayStats;
    }

    useEffect(() => {
        const fetchPlayer = async () => {
            const allValPlayers = await fetchRainbowPlayers();

            /* Found the player in the load all players array */
            const foundPlayer = allValPlayers.find(player => player.firstName.toLowerCase() === (paramPlayer as string).toLowerCase());
            setPlayer(foundPlayer);

            const matchRes = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/rainbow/matches`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({team: foundPlayer?.team}) 
            });
            let games = await matchRes.json();
            games.sort((a: RainbowGame, b: RainbowGame) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });
            setAllGames(games);

            setDisplayedStats(compareFunction(games, foundPlayer!));
            setLoading(false);
        }

        if(paramLeague && paramPlayer) fetchPlayer();
    }, [])

    useEffect(() => {
        setDisplayedStats(compareFunction(allGames, player!));
    }, [pickedBtn])

    if(!loading) return (
        <div>
            <Hero 
                playerName={player!.firstName}
                picUrl=""
                team={player!.team}
                number=""
                position=''
                pickedBtn={pickedBtn}
                setPickedBtn={setPickedBtn}
                allPickedBtns={allPickedBtns}
            />

            <p className="playerPageGamesHeader">Games</p>

            <div className='tableWrapper'>
                <table className='playerPageStatTable'>
                    <thead>
                        <StatComparator compareTo={compareTo} setCompareTo={setCompareTo} hasMaps={true}/>
                        <TableHeader statsHeader={statsHeader} hasMaps={true}/>
                    </thead>
                    <tbody className="rowTable">
                        {allGames.map((game, index) => {
                            const dateObj = new Date(game.date);
                            const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;

                            return (
                                <Row 
                                    key={index}
                                    compareTo={compareTo}
                                    displayedStats={displayedStats[index]}
                                    team={game.team1 === player?.team ? game.team2 : game.team1}
                                    date={formattedDate}
                                    extraText=''
                                    mapsPlayed={game.maps.length}
                                />
                            );
                        })}
                    </tbody>
                </table>

                <div style={{marginBottom: '50px'}}></div>        
            </div>

        </div>
    )

    return <div style={{
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
}
