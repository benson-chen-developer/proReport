import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { Game, LolGame, PGame, PlayerType, PPlayer } from '../../Context/PlayerTypes';
import { Bars } from './MainBarChart/Bars';
import { SupportBars } from '../Outlier/SupportBars';
import { StatsHeader } from '../Outlier/Stats/StatsHeader';
import { DropDownStatsHeader } from '../Outlier/Stats/DropDownStatsHeader';
import { SecondStatsHeader } from '../Outlier/Stats/SecondStatHeader';
import { Hero } from '../Outlier/Hero';
import { PeriodStatsHeader } from '../Outlier/Stats/PeriodStatsHeader';
import { PSport } from '../Player/SportClass/Psport';
import { Averages } from './Averages';
import { SupportCard } from './Support/SupportCard';
import { BarInfo } from './MainBarChart/BarInfo';
import { MainBarChart } from './MainBarChart/MainBarChart';
import { updateFilters } from './MainBarChart/BarFunctions';
import { useGlobalContext } from '../../Context/store';
import { positions } from '@mui/system';
import { Rankings } from './Ranking/Ranking';

interface Props {
    league: string,
    playerName: string
}
export type Filter = {
    isHome: boolean,
    isAway: boolean,
    stat: string, //Points, Asts,
    supportingStat: string, //Minutes, fouls,
    lastGame: string, //L10, H2H,
    period: string, //Q1, H1,
}
export type Filters = {
    stats: string[][], //[PTS, PTS+REBS]
    supportingStats: string[], //Minutes, fouls,
    lastGames: string[], //L10, H2H,
    periods: string[], //Q1, H1,
}
export type BarData = {
    name: string, 
    stat1: number,
    stat2: number,
    stat3: number, 
    date: string, 
    score: string,
    against: string,
    opp: string,
    underText: string,
    hit: boolean
}
export type MatchUp = {
    league: string,
    teams: string[], 
    time: string, 
    bets: {filter: Filter, value: number}[]
}

export const bgColor = "#1E1E1E"; //tron #0B1C1F

export const PMatches: React.FC<Props> = ({league, playerName}) => {
    const [displayedGames, setDisplayedGames] = useState<PGame[]>([]);
    const [barData, setBarData] = useState<BarData[]>([]);
    const [seasonAvg, setSeasonAvg] = useState<{ name: string; value: number }[]>([]);
    const [matchUp, setMatchUp] = useState<MatchUp>({
        league: 'nba',
        teams: [], 
        time: '', 
        bets: []
    });

    /* Player Page States */
    const [pGames, setPGames] = useState<PGame[]>([]);
    const [player, setPlayer] = useState<PPlayer>({
        name: "", playerId: "", city: "",
        team: "", sport: "", position: ''
    });

    /* Filter */
    const [filter, setFilter] = useState<Filter>({
        isHome: true,
        isAway: true,
        stat: "PTS", 
        lastGame: "L10", 
        period: "All",
        supportingStat: "Minutes", 
    });
    const [filters, setFilters] = useState<Filters>({
        stats: [],
        supportingStats: ["Minutes", "Fouls"],
        lastGames: ["L5", "L10", "L20", "H2H"],
        periods: []
    })

    // const currentMatchUp = {
    //     league: '',
    //     oppTeam: 'Indiana',
    //     time: '9:00 PM EST',
    //     bets: [{filter:{
    //         isHome: true,
    //         isAway: true,
    //         stat: "PTS", 
    //         lastGame: "L10", 
    //         period: "All",
    //         supportingStat: "Minutes", 
    //     }, value: 25.5}]
    // }
    const {fetchNbaPlayers, fetchMatchUps} = useGlobalContext();

    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const allGames = await PSport.fetchMatches(playerName, league);
            setPGames(allGames);
            setDisplayedGames(allGames);

            const players = await fetchNbaPlayers();
            const player = players.find((p) => p.name.toLowerCase() === playerName.toLowerCase());
            setPlayer({
                name: player!.name,
                playerId: player!.playerId,
                team: player!.team,
                sport: league,
                position: player!.position,
                city: player!.city
            });

            /* Get the season averages for fantasy stats */
            let newSeasonAvg =  PSport.getFantasyStats(league).map((stat) => ({
                ...stat, value: 0, 
            }));
            allGames.forEach((game) => {
                const playerPeriods = game.players.find((p) => p.name === player?.name);
            
                playerPeriods?.periods.forEach((period) => {
                    period.forEach((stat) => {
                        const matchingStat = newSeasonAvg.find((s) => s.name === stat.name);
            
                        if (matchingStat && stat.value > 0) {
                            matchingStat.value += stat.value;
                        }
                    });
                });
            });
            setSeasonAvg([...newSeasonAvg, {
                name: 'FAN', value: PSport.calcFantasyScore(league, newSeasonAvg, allGames.length)
            }])

            setFilters(p => ({
                ...p, 
                stats: PSport.getAllPickedStats('nba')
            }))

            const matchUps = await fetchMatchUps(league);
            const foundMatchUp = matchUps.find(m => m.teams.includes(player!.city));
            if(foundMatchUp) setMatchUp(foundMatchUp);

            setLoading(false);
        };
      
        fetchData();
    }, [playerName]);

    useEffect(() => {
        // let displayedGames: PGame[] = [];

        // let homeGames = pGames.filter(game => game.team1 === player.team);
        // let awayGames = pGames.filter(game => game.team2 === player.team);
        // if(filter.isHome) displayedGames.push(...homeGames);
        // if(filter.isAway) displayedGames.push(...awayGames);

        // if(filter.lastGame[0] === "L"){
        //     let length = Number(filter.lastGame.slice(1, filter.lastGame.length));
        //     displayedGames = displayedGames.slice(-length);
        // }
        // else if(filter.lastGame === "H2H"){
        //     displayedGames = displayedGames.filter(game => game.team1 === currentMatchUp.oppTeam || game.team2 === currentMatchUp.oppTeam);
        // }

        // setDisplayedGames(displayedGames);
        setFilters(updateFilters(filters, filter))
    }, [filter.stat, filter.isAway, filter.isHome, filter.lastGame, filter.period])

    if(!loading) return (
        <div style={{background: bgColor, width:'75%', display:'flex'}}>

            <div>
                <div style={{width:'100%', display:'flex', alignItems:'flex-end', margin:'30px 0px 20px 0px'}}>
                    <Hero 
                        player={player}
                        matchUp={matchUp}
                    />
                    <Averages averages={seasonAvg} pGames={pGames}/>
                </div>
                
                <div style={{
                    width:'705px', background:'#2B2B2B', display:'flex',
                    flexDirection:'column', alignItems:'center', borderRadius:'20px',
                    boxShadow: '0px 0px 50px 5px #79F4F4'
                }}>
                    {/* Stats Header */}
                    <div style={{
                        width:'95%', height:'200px', display:'flex', justifyContent:'space-evenly',
                        flexDirection:'column',
                    }}>
                        <div style={{color:'#fff', fontWeight:'bold', margin:'10px 0px', display:'flex', alignItems:'flex-end'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
                                <path fill="#14EE9D" d="M19 21c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM9.553 9.658l4 2l1.553-3.105l1.789.895l-2.447 4.895l-4-2l-1.553 3.105l-1.789-.895z" />
                            </svg>
                            <span style={{fontSize:'25px', marginLeft:'8px'}}> {player.name}</span>
                            <span style={{fontSize:'15px', color:'#a2a2a2', marginLeft:'5px'}}>
                                {filter.stat}+{filter.lastGame}{filter.period !== "All" ? `+${filter.period}` : ''}
                            </span>
                        </div>
                        <DropDownStatsHeader 
                            filter={filter} filters={filters}
                            setFilter={setFilter}
                        />
                        <SecondStatsHeader 
                            filter={filter} filters={filters} setFilter={setFilter}
                        />
                        <PeriodStatsHeader
                            setFilter={setFilter} filter={filter}
                        />
                    </div>

                    <MainBarChart 
                        player={player}
                        filter={filter}
                        matchUp={matchUp}
                        setBarData={setBarData}
                        pGames={pGames}
                    />
                </div>

                <SupportCard 
                    filter={filter} setFilter={setFilter}
                    // matchUp={currentMatchUp}
                    filters={filters}
                    displayedGames={displayedGames}
                    player={player}
                    barData={barData}
                />
            </div>

            {/* <Rankings filter={filter}/> */}
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
