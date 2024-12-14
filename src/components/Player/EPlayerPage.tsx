import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { StatComparator } from './Componenets/StatComparator';
import { Hero } from './Componenets/Hero';
import { TableHeader } from './Componenets/TableHeader';
import { Row } from './Componenets/Row';
import { NotFound } from './Componenets/NotFound';
import { Game, LolGame, PGame, PlayerType } from '../../Context/PlayerTypes';
import { EGame2 } from '../../Context/ESport';
import { ESport } from './SportClass/Esport';
import { DisplayedGame } from './Componenets/DisplayedGame';
import { TeamMatchup } from './TeamMatchup/TeamMatchup';
import { PreviousGamesBarChart } from './Componenets/PreviousGamesBarCharts';

interface Props {
    league: string,
    playerName: string
}
export const EPlayerPage: React.FC<Props> = ({league, playerName}) => {
    const statsHeader = ESport.getStatsHeader(league);
    const allPickedBtns = ESport.getAllPickedBtns();

    /* Player Page States */
    const [player, setPlayer] = useState<PlayerType>({
        name: "",
        playerId: "",
        team: "",
        sport: ""
    });
    const [pickedBtn, setPickedBtn] = useState<string>(allPickedBtns[0])

    const [displayedRows, setDisplayedRows] = useState<number[][]>([]);
    // const [displayedGames, setDisplayedGames] = useState<number[][]>([]);
    const [compareTo, setCompareTo] = useState<string[]>([])

    const [pGames, setPGames] = useState<PGame[]>([]);
    const [eGames, setEGames] = useState<EGame2[]>([]);
    const [lolGames, setLolGames] = useState<LolGame[]>([]);
    
    const [loading, setLoading] = useState<boolean>(true);
    
    const fetchPlayer = (latestGame: EGame2, playerId: string): PlayerType => {
        let team = ""
        for (const map of latestGame.maps) {
            const player = map.players.find(p => p.name === playerId);
            if (player) {
                team = player.team;
            }
        }
    
        return {
            team: team,
            name: playerId,
            playerId: playerId,
            sport: league,
        };
    }

    useEffect(() => {
        const fetchData = async () => {
            const allGames = await ESport.fetchMatches(playerName, league);
            
            const player = fetchPlayer(allGames[0], playerName);
            setPlayer(player);

            const rows = ESport.compareFunction(ESport.getAllPickedBtns(league)[0], allGames, playerName, league);
            setDisplayedRows(rows)
            setCompareTo(Array(statsHeader.length).fill(""));
            setEGames(allGames);

            setLoading(false);
        };
      
        fetchData();
      }, [playerName]);

    useEffect(() => {
        // setDisplayedRows(ESport.compareFunction(pickedBtn, eGames, firstName, league));
    }, [pickedBtn, setPickedBtn])

    if(!loading && player.playerId) return (
        <div>
            <Hero 
                playerName={player.name}
                picUrl={''}
                team={`${player?.team}`}
                number=''
                position=''
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
                    <tbody style={{
                        width: "100%", whiteSpace:"noWrap", display:'flex'
                    }}>
                        <div>
                            {eGames.map((game, index) => {
                                return <DisplayedGame
                                    key={index} 
                                    game={game}
                                    player={player}
                                    pickedBtn={pickedBtn}
                                    setPickedBtn={setPickedBtn}
                                />
                            })}
                        </div>

                        <div>
                            <TeamMatchup 
                                playerName={playerName}
                                otherTeam='MOUZ'
                                matches={eGames.filter((game) => game.team1 === "MOUZ" || game.team2 === "MOUZ")}
                            />
                            <div style={{width:'500px', height:'200px'}}>
                                <PreviousGamesBarChart 
                                    maps={eGames.flatMap(game => game.maps)} 
                                    pickedStat="kills" 
                                    playerName={player.name}
                                />
                            </div>
                        </div>
                    </tbody>
                </table>

                <div className='rowBottomSpace'/> 
            </div>
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
