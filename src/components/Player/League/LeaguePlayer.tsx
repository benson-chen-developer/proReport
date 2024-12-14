import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { useGlobalContext } from '../../../Context/store';
import { StatComparator } from '../Componenets/StatComparator';
import { Hero } from '../Componenets/Hero';
import { EverythingLoaded } from '../Componenets/EverythingLoaded';
import { TableHeader } from '../Componenets/TableHeader';
import { LolGame, LolPlayer } from '../../../Context/PlayerTypes';
import { Row } from '../Componenets/Row';
import { NotFound } from '../Componenets/NotFound';

export type StatCompartorLeague = {
    kills: number, 
    deaths: number,
    assists: number,
}

/*

*/
export const LeaguePlayer = () => {
    const router = useRouter();
    const { paramPlayer, paramLeague } = router.query;
    const {fetchLolPlayers} = useGlobalContext();
    const [player, setPlayer] = useState<LolPlayer | undefined>(undefined);

    const [allGames, setAllGames] = useState<LolGame[]>([]);
    const [displayedStats, setDisplayedStats] = useState<number[][]>([]);
    
    const [loading, setLoading] = useState<boolean>(true);

    const allPickedBtns = ["All Maps", "Map 1", "Map 2", "Map 3", "Map 1+2", "Map 1+2+3", "Map 4", "Map 5"];
    const statsHeader = [
        {name: "K", underName: "Kills"},
        {name: "D", underName: "Deaths"},
        {name: "A", underName: "Assists"},
    ];
    const [compareTo, setCompareTo] = useState<string[]>(Array(statsHeader.length).fill(""))
    const [pickedBtn, setPickedBtn] = useState<string>('All Maps')

    const GetTeamName = (games: LolGame[]): string => {
        let firstGame = games[0]; let secondGame = games[1];
        let names: string[] = [];

        if(firstGame && secondGame){
            names = [
                firstGame.game.split('vs')[0], firstGame.game.split('vs')[1], 
                secondGame.game.split('vs')[0], secondGame.game.split('vs')[1]
            ]
        }
        for (let i = 0; i < names.length; i++) {
            for (let j = i + 1; j < names.length; j++) {
                if (names[i].toLocaleLowerCase() === names[j].toLocaleLowerCase()) {
                    return names[i].trim();
                }
            }
        }
        
        return ''; 
    };

    /*
        Goes through the game's scores
            - Which is in the format ['3/3/3', '1/1/1']
            - Adds up the maps needed (so all maps is '4/4/4')
            - returns displayedRows which is the same game but with only one item in scores field
    */
    const compareFunction = (pickedBtn: string, allTheGames: LolGame[]) => {
        /* This takes the strings '3/3/3' and adds up the columns */
        const addUpMaps = (...maps: (string | undefined | null)[]): number[] => {
            // Check if any map is null, undefined, or out of range
            if (maps.some(map => !map || map === '-1/-1/-1')) {
                return [-1];
            }
            const sums = [0, 0, 0];
            
            maps.forEach(map => {
                const parts = map!.split('/').map(Number);
                for (let i = 0; i < parts.length; i++) {
                    sums[i] += parts[i];
                }
            });
        
            return sums;
        };

        if(pickedBtn === "All Maps"){
            setDisplayedStats(allTheGames.map((game) => addUpMaps(...game.scores.slice().reverse())))
        }
        else if(pickedBtn === "Map 1"){
            setDisplayedStats(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[0])))
        }
        else if(pickedBtn === "Map 2"){
            setDisplayedStats(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[1])))
        }
        else if(pickedBtn === "Map 3"){
            setDisplayedStats(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[2])))
        }
        else if(pickedBtn === "Map 1+2"){
            setDisplayedStats(allTheGames.map((game) => addUpMaps(...game.scores.slice().reverse().slice(0, 2))))
        }
        else if(pickedBtn === "Map 1+2+3"){
            setDisplayedStats(allTheGames.map((game) => addUpMaps(...game.scores.slice().reverse().slice(0, 3))))
        }
        else if(pickedBtn === "Map 4"){
            setDisplayedStats(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[3])))
        }
        else if(pickedBtn === "Map 5"){
            setDisplayedStats(allTheGames.map((game) => addUpMaps(game.scores.slice().reverse()[4])))
        }
    }

    useEffect(() => {
        const fetchPlayer = async () => {
            const allPlayers = await fetchLolPlayers();
        
            let foundPlayer = allPlayers.find(player => player.firstName.toLowerCase() === (paramPlayer as string).toLowerCase());

            if(foundPlayer){
                const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/lol/player/${foundPlayer.id}`)
                const allGames = await res.json();

                let team = GetTeamName(allGames);
                if(team) foundPlayer.team = team;
                setPlayer(foundPlayer);
                setAllGames(allGames);
                compareFunction('All Maps', allGames);
            }

            setLoading(false);
        }

        if(paramLeague && paramPlayer) fetchPlayer();
    }, [])

    useEffect(() => {
        compareFunction(pickedBtn, allGames)
    }, [pickedBtn, setPickedBtn])

    if(!loading && player) return (
        <div>
            <Hero 
                playerName={player?.firstName as string}
                picUrl=""
                team={player?.team as string}
                number=""
                position=''
                pickedBtn={pickedBtn}
                setPickedBtn={setPickedBtn}
                allPickedBtns={allPickedBtns}
            />

            <p className="playerPageGamesHeader">Games</p>

            <div className="tableWrapper">
                <table style={{ width: '50%', borderCollapse: "collapse"}}>
                    <thead>
                        <StatComparator compareTo={compareTo} setCompareTo={setCompareTo} hasMaps={true}/>
                        <TableHeader statsHeader={statsHeader} hasMaps={true}/>
                    </thead>
                    <tbody className="rowTable">
                        {allGames.map((game, index) => {
                            let firstName = game.game.split("vs")[0].trim();
                            let secondName = game.game.split("vs")[1].trim();
                            let oppTeam = firstName.toLocaleLowerCase() !== player?.team.toLocaleLowerCase() ? firstName : secondName;
                            oppTeam = oppTeam.split(" ")[0].toLocaleLowerCase() === 'team' ? oppTeam.split(" ")[1] : oppTeam;
                        
                            return (
                                <Row 
                                    key={index} 
                                    compareTo={compareTo}
                                    displayedStats={displayedStats[index]}
                                    team={oppTeam}
                                    date={game.date}
                                    mapsPlayed={game.scores.length}
                                    extraText={allGames[index].scores.length === 1 ? 'DNP (Best of 1)' : 'DNP (Best of 3)'}
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
