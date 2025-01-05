import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { Game, LolGame, PGame, PlayerType, PPlayer } from '../../Context/Types/PlayerTypes';
import { DropDownStatsHeader } from '../Outlier/Stats/DropDownStatsHeader';
import { SecondStatsHeader } from '../Outlier/Stats/SecondStatHeader';
// import { Hero } from '../Outlier/Hero';
import { PeriodStatsHeader } from '../Outlier/Stats/PeriodStatsHeader';
import { PSport } from '../Player/SportClass/Psport';
import { Averages } from './Averages';
import { SupportCard } from './Support/SupportCard';
import { MainBarChart } from './MainBarChart/MainBarChart';
import { useGlobalContext } from '../../Context/store';
import { updateFilters } from '../../Context/functions/barchartFuncs';
import { Rankings } from './Ranking/Ranking';
import {WithOutPlayers} from './Stats/WithoutPlayers';
import { DaysOfRest } from './Stats/DaysOfRest';
import { MinutesSlider } from './Stats/MinutesSlider';
import { Hero } from './Hero/Hero';
import { HomeSwitches } from './Stats/HomeSwitches';
import { Projection } from '../../Context/Types/ProjectionTypes';

interface Props {
    league: string,
    playerName: string
}
export type Filter = {
    isHome: boolean,
    isAway: boolean,
    stat: string, //Points, Asts,
    lastGame: string, //L10, H2H,
    period: string, //Q1, H1,
    supportingStat: string, //Minutes, fouls,
    withOutPlayers: string[],
    daysRested: number,
    minutes: [number, number]
}
export type Filters = {
    stats: string[][], //[PTS, PTS+REBS]
    supportingStats: string[], //Minutes, fouls,
    lastGames: string[], //L10, H2H,
    periods: string[], //Q1, H1,
    minutes: [number, number]
}
export type BarData = {
    name: string, 
    statTotal: number,
    stat1: number,
    stat2: number,
    stat3: number, 
    stat1Text: string,
    stat2Text: string,
    stat3Text: string,
    date: string, 
    score: string,
    isHome: boolean,
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
        withOutPlayers: [],
        supportingStat: "Minutes", 
        daysRested: -1,
        minutes: [15, 45]
    });
    const [filters, setFilters] = useState<Filters>({
        stats: [],
        supportingStats: ["Minutes", "Fouls"],
        lastGames: matchUp.teams.length > 0 ? ["L5", "L10", "L20", "H2H"] : ["L5", "L10", "L20"],
        periods: [],
        minutes: [15, 45]
    })

    const [projections, setProjections] = useState<Projection[]>([]); /* The projections for this player */
    const {fetchNbaPlayers, fetchProjections} = useGlobalContext();

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

            const projections = await fetchProjections();
            setProjections(projections);

            /* Get the season averages for fantasy stats */
            let newSeasonAvg = PSport.getFantasyStats(league).map((stat) => ({
                ...stat,
                value: 0,
            }));
            allGames.forEach((game) => {
                const playerPeriods = game.players.find((p) => p.name === player?.name);
            
                playerPeriods?.periods.forEach((period) => {
                    Object.entries(period).forEach(([statName, statValue]) => {
                        const matchingStat = newSeasonAvg.find((s) => s.name === statName);
            
                        if (matchingStat && statValue > 0) {
                            matchingStat.value += statValue;
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

            setLoading(false);
        };
      
        fetchData();
    }, [playerName]);

    useEffect(() => {
        setFilters(updateFilters(filters, filter))
    }, [filter.stat, filter.isAway, filter.isHome, filter.lastGame, filter.period])

    if(!loading) return (
        <div style={{background: '#000', width:'80%', display:'flex', flexDirection:'column'}}>
            <Hero 
                player={player}
                projections={projections}
            />
            {/* <div style={{width:'100%', display:'flex', alignItems:'flex-end', margin:'30px 0px 20px 0px'}}>
                <Averages averages={seasonAvg} pGames={pGames}/>
            </div> */}
            
            {/* The stuff below the Hero */}
            <div style={{width:'100%', display:'flex', background:'#1F1F1F'}}>
                {/* Bar Charts */}
                <div style={{width:'65%'}}>
                    <MainBarChart 
                        projections={projections}
                        player={player}
                        filter={filter}
                        matchUp={matchUp}
                        setBarData={setBarData}
                        pGames={pGames}
                    />
                    <SupportCard 
                        filter={filter} setFilter={setFilter}
                        matchUp={matchUp}
                        filters={filters}
                        pGames={pGames}
                        player={player}
                        barData={barData}
                        projections={projections}
                    />
                </div>

                {/* Filters */}
                <div style={{
                    width:'35%', //height:'300px', 
                    background:'#2B2B2B', borderLeft:'1px solid #808080'
                }}>
                    <div style={{marginLeft:'5%', height:'auto', display:'flex', flexDirection:'column'}}>
                        <p style={{fontWeight:'bold', fontSize:'18px', color:'#fff', margin:'20px 0px 10px 0px'}}>Stats Filter</p>
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

                        <p style={{fontWeight:'bold', fontSize:'18px', color:'#fff', margin:'25px 0px 5px 0px'}}>Games Filter</p>
                        <HomeSwitches filter={filter} setFilter={setFilter} />
                        <div style={{width:'95%', display:'flex', alignItems:'center'}}>
                            <WithOutPlayers 
                                ourPlayer={player}
                                setFilter={setFilter} filter={filter}
                            />
                            <DaysOfRest 
                                setFilter={setFilter} filter={filter}
                            />
                        </div>
                        <div style={{width:'95%', display:'flex', alignItems:'center', height:'70px'}}>
                            <MinutesSlider 
                                filter={filter} setFilter={setFilter}
                                filters={filters}
                            />
                        </div>
                    </div>

                    {/* <div style={{paddingLeft:'5%', background:'#1F1F1F'}}>
                        <Rankings filter={filter}/>
                    </div> */}
                </div>
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
