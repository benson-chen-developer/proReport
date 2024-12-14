import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { useGlobalContext } from '../../../Context/store';
import { StatComparator } from '../Componenets/StatComparator';
import { Hero } from '../Componenets/Hero';
import { EverythingLoaded } from '../Componenets/EverythingLoaded';
import { TableHeader } from '../Componenets/TableHeader';
import { Row } from '../Componenets/Row';
import { NotFound } from '../Componenets/NotFound';
import { WNBAGame, WNBAGamePlayer, WNBAPlayer } from '../../../Context/PlayerTypes';

export const WNBAPlayerPage = () => {
    const router = useRouter();
    const { paramPlayer, paramLeague } = router.query;
    const {fetchWnbaPlayer} = useGlobalContext();
    const [allPlayers, setAllPlayers] = useState<WNBAPlayer[]>([]);
    const [player, setPlayer] = useState<WNBAPlayer | undefined>(undefined);
    const firstName = (paramPlayer! as string).split('_')[0];
    const lastName = (paramPlayer! as string).split('_')[1];

    const [allGames, setAllGames] = useState<WNBAGame[]>([]);
    const [displayedRows, setDisplayedRows] = useState<number[][]>([]);
    
    const [loading, setLoading] = useState<boolean>(true);

    const allPickedBtns = ["Whole Game", "1st Half", "2nd Half", "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];
    const statsHeader = [
        {name: "PTS", underName: "Points"},
        {name: "REB", underName: "Rebounds"},
        {name: "AST", underName: "Assists"},
        {name: "STL", underName: "Steals"},
        {name: "BLK", underName: "Blocks"},
        {name: "TO", underName: "Turn Overs"},
        {name: "PF", underName: "Fouls"},
        {name: "FGM", underName: "Field Goals Made"},
        {name: "FGA", underName: "Field Goals Attempted"},
        {name: "3PM", underName: "3 Pointers Made"},
        {name: "3PA", underName: "3 Pointers Attempted"},
        {name: "FTM", underName: "Free Throws Made"},
        {name: "FTA", underName: "Free Throws Attempted"},
        {name: "FAN", underName: "Fantasy Score"},
        {name: "PR", underName: "Points + Rebounds"},
        {name: "PA", underName: "Points + Assists"},
        {name: "PRA", underName: "Points + Rebounds + Assists"},
        {name: "RA", underName: "Rebounds + Assists"},
    ];
    const [compareTo, setCompareTo] = useState<string[]>(Array(statsHeader.length).fill(""))
    const [pickedBtn, setPickedBtn] = useState<string>(allPickedBtns[0])

    const FantasyScoring = (stat: string, amount: number): number => {
        if(stat === "PTS") return 1*amount;
        else if(stat === "REB") return 1.2*amount;
        else if(stat === "AST") return 1.5*amount;
        else if(stat === "STL") return 3*amount;
        else if(stat === "BLK") return 3*amount;
        else if(stat === "TO") return -1*amount;
        else return 0;
    }

    const compareFunction = (pickedBtn: string, allTheGames: WNBAGame[]): number[][] => {
        /*
            - condition can be Q1, Q2, Q3, Q4, H1, H2, W
            - playerName should be in C. Clark format
            - if playerName is "" then just get all stats
        */
        const fillStats = (playerName: string, condition: string, players: WNBAGamePlayer[]): number[] => {
            let foundPlayer = players.find(player => player.playerNameI === playerName);
            let stats: any = {};
            if (foundPlayer) {
                if (condition === "1st Quarter") stats = foundPlayer.stats[0];
                else if (condition === "2nd Quarter") stats = foundPlayer.stats[1];
                else if (condition === "3rd Quarter") stats = foundPlayer.stats[2];
                else if (condition === "4th Quarter") stats = foundPlayer.stats[3];
                else if (condition === "1st Half") {
                    stats = { ...foundPlayer.stats[0] };
                    let secondHalfStats: any = foundPlayer.stats[1];
                    for (let key in secondHalfStats) {
                        stats[key] = (stats[key] || 0) + (secondHalfStats[key] || 0);
                    }
                }
                else if (condition === "2nd Half") {
                    stats = { ...foundPlayer.stats[2] };
                    let secondHalfStats: any = foundPlayer.stats[3];
                    for (let key in secondHalfStats) {
                        stats[key] = (stats[key] || 0) + (secondHalfStats[key] || 0);
                    }
                }
                else if (condition === "Whole Game") {
                    stats = { ...foundPlayer.stats[0] };
                    let secondQ: any = foundPlayer.stats[1];
                    let thirdQ: any = foundPlayer.stats[2];
                    let fourthQ: any = foundPlayer.stats[3];
                    for (let key in secondQ) {
                        stats[key] = (stats[key] || 0) + (secondQ[key] || 0);
                    }
                    for (let key in thirdQ) {
                        stats[key] = (stats[key] || 0) + (thirdQ[key] || 0);
                    }
                    for (let key in fourthQ) {
                        stats[key] = (stats[key] || 0) + (fourthQ[key] || 0);
                    }
                }
            }
            delete stats["_id"];

            /* Fantasy + PR + PA + PRA + RA*/
            let fanAmount = -1;
            for (let key in stats) {
                if(fanAmount === -1) fanAmount = 0;
                let value = stats[key];
                fanAmount += FantasyScoring(key, value);
            }
            stats["FAN"] = parseFloat(fanAmount.toFixed(1))
            stats["PR"] = stats["PTS"] + stats["REB"];
            stats["PA"] = stats["PTS"] + stats["AST"];
            stats["PRA"] = stats["PTS"] + stats["REB"] + stats['AST'];
            stats["RA"] = stats["REB"] + stats["AST"];

            return [...Object.values(stats) as number[]];
        }

        const allTheDisplayedStats: number[][] = [];
        allTheGames.forEach((game) => {
            allTheDisplayedStats.push(fillStats(`${firstName[0]}. ${lastName}`, pickedBtn, game.players))
        })
        
        return allTheDisplayedStats;
    }

    useEffect(() => {
        const fetchPlayer = async () => {
            const allPlayers = await fetchWnbaPlayer();
            setAllPlayers(allPlayers);

            const foundPlayer = allPlayers.find(player => player.firstName.toLowerCase() === firstName.toLowerCase() && player.lastName.toLowerCase() === lastName.toLowerCase());
            if(foundPlayer){
                setPlayer(foundPlayer);
                const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/wnba/player/${foundPlayer.team}`);
                const allGames = await res.json();
                allGames.sort((a: WNBAGame, b: WNBAGame) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateB - dateA;
                });

                console.log(allGames)
                setAllGames(allGames);
                setDisplayedRows(compareFunction('Whole Game', allGames)); 
            }
            setLoading(false);
        }

        if(paramLeague && paramPlayer) fetchPlayer();
    }, [])

    useEffect(() => {
        setDisplayedRows(compareFunction(pickedBtn, allGames));
    }, [pickedBtn, setPickedBtn])

    if(!loading && player) return (
        <div>
            <Hero 
                playerName={`${player?.firstName as string} ${player?.lastName as string}`}
                picUrl={`https://cdn.wnba.com/headshots/wnba/latest/1040x760/${player.picId}.png`}
                team={`${player?.city} ${player?.team}`}
                number={player?.number}
                position={player?.position}
                pickedBtn={pickedBtn}
                setPickedBtn={setPickedBtn}
                allPickedBtns={allPickedBtns}
            />

            <p className="playerPageGamesHeader">Games</p>

            <div className="tableWrapper">
                <table className='playerPageStatTable'>
                    <thead>
                        <StatComparator compareTo={compareTo} setCompareTo={setCompareTo} hasMaps={false}/>
                        <TableHeader statsHeader={statsHeader} hasMaps={false}/>
                    </thead>
                    <tbody className="rowTable">
                        {displayedRows.map((row, index) => {
                            // Is in UTC so use UTC functions or else its gonna be behind
                            let dateObject = new Date(allGames[index].date);
                            let month = dateObject.getUTCMonth() + 1;
                            let day = dateObject.getUTCDate();
                            let year = dateObject.getUTCFullYear();
                            let formattedDate = `${month}/${day}/${year}`;
                            
                            return (
                                <Row 
                                    key={index} 
                                    compareTo={compareTo}
                                    displayedStats={row}
                                    team={allGames[index].team1 === player.team ? allGames[index].team2 : allGames[index].team1}
                                    date={formattedDate}
                                    extraText=''
                                    showDNP='dont'
                                />
                            );
                        })}
                    </tbody>
                </table>

                <div className='rowBottomSpace'/> 
            </div>
        </div>
    )

    if(!loading && !player) return(
        <NotFound />
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
