import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { useGlobalContext } from '../../Context/store';
import { parseBarData, updateFilters } from '../../Context/functions/barchartFuncs';
import { Rankings } from './Ranking/Ranking';
import {WithOutPlayers} from './Stats/WithoutPlayers';
import { DaysOfRest } from './Stats/DaysOfRest';
import { MinutesSlider } from './Stats/MinutesSlider';
import { Hero } from './Hero/Hero';
import { HomeSwitches } from './Stats/HomeSwitches';
import { Projection } from '../../Context/Types/ProjectionTypes';
import { StatsFilterHeader } from './Stats/StatsFilterHeader';
import { Notfound } from './NotFound/Notfound';
import { Loading } from './Loading/Loading';
import { BarInfo } from './MainBarChart/BarInfo';
import { Bars } from './Bars';

export type Filter = {
    isHome: boolean,
    isAway: boolean,
    stat: string, //Points, Asts,
    lastGame: string, //L10, H2H,
    period: string, //Q1, H1,
    supportingStat: string, //Minutes, fouls,
    withOutPlayers: string[],
    daysRested: number,
    minutes: [number, number],
    over: boolean
}
export type Filters = {
    stats: string[], 
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
    tie: boolean,
    underText: string,
    hit: boolean
}
export type MatchUp = {
    league: string,
    teams: string[], 
    time: string, 
}

export const bgColor = "#1E1E1E"; //tron #0B1C1F

interface Props {
    loading: boolean, setLoading: Dispatch<SetStateAction<boolean>>
    isOverLayFilter: boolean
}
export const Matches: React.FC<Props> = ({isOverLayFilter, loading, setLoading}) => {
    const router = useRouter();
    const { paramPlayer, paramLeague, paramFilter } = router.query;
    const playerName = (paramPlayer as string).replace(/_/g, ' ');
    const league = paramLeague as string;
    
    const [mainBarData, setMainBarData] = useState<BarData[]>([]);
    const [seasonAvg, setSeasonAvg] = useState<{ name: string; value: number }[]>([]);
    const [matchUp, setMatchUp] = useState<MatchUp | undefined>();
    const [rightBtn, setRightBtn] = useState<"Filters" | "Rankings">("Filters");

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
        minutes: [15, 45],
        over: true
    });
    const [filters, setFilters] = useState<Filters>({
        stats: [],
        supportingStats: ["Minutes", "Fouls"],
        lastGames: ["L5", "L10", "L20"],
        periods: [],
        minutes: [15, 45]
    })

    const [showAllStats, setShowAllStats] = useState<boolean>(false);

    const [projections, setProjections] = useState<Projection[]>([]); /* The projections for this player */
    const [pickedProjection, setPickedProjection] = useState<Projection | null>(null);
    const getProjectionStats = (projections:Projection[]): string[] => {
        const statsInProjections: string[] = [];
        const stats = PSport.getAllPickedStats('nba');

        projections.forEach((proj) => {
            const foundProjStat = stats.find(s => s === proj.name);

            if(foundProjStat){
                statsInProjections.push(foundProjStat);
            }
        })

        return PSport.sortStats(league, statsInProjections);
    }

    const {fetchNbaPlayers, fetchProjections, fetchMatchUps, isMobile} = useGlobalContext();

    /* Initial */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
            const allGames = await PSport.fetchMatches(playerName, league);
            setPGames(allGames);

            const players = await fetchNbaPlayers();
            const player = players.find((p) => p.name.toLowerCase() === playerName.toLowerCase());

            if(!player) { 
                /* This is for if the url is not right */
            } else {
                /* Set the Player */
                setPlayer({
                    name: player!.name,
                    playerId: player!.playerId,
                    team: player!.team,
                    sport: league,
                    position: player!.position,
                    city: player!.city
                });

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

                /* Intial Projections and Intial Stats Filters set up */
                const projections = await fetchProjections(player!.name);
                let pickedProjection = null;
                let newFilters: Filters;
                if(projections.length === 0) {
                    newFilters = getNewStatsForFilters(true, []);
                    setShowAllStats(true)
                } else {
                    newFilters = getNewStatsForFilters(false, projections);
                    pickedProjection = projections.find(p => p.name === newFilters.stats[0] && filter.period === p.period);
                }
                setPickedProjection(pickedProjection!)
                setProjections(projections);

                /* Get the team they are playing against */
                const matchUps = await fetchMatchUps(league);
                const matchUp = matchUps.find(match => match.teams.includes(player!.city));
                setMatchUp(matchUp);
                if(matchUp && !filters.lastGames.includes('H2H')){
                    newFilters.lastGames = [...newFilters.lastGames, "H2H"];
                }

                /* Set up filters */
                setFilters(newFilters);

                /* Inital Bar Setting */
                const newData = parseBarData(allGames, filter, player!, pickedProjection, matchUp);
                setMainBarData(newData);

                if(paramFilter) {
                    try {
                        const filterFromParam = JSON.parse(paramFilter as string);
                        setFilter(p => ({...filterFromParam}))
                    } catch (error) {
                        /* Someone messed up the url just don;t parse it */
                        console.error("Error parsing filter:", error);
                    }
                }
            }

            setLoading(false);
        };
      
        fetchData();
    }, [playerName]);

    const getNewStatsForFilters = (showAllStats: boolean, projections: Projection[]): Filters => {
        let newFilters = filters;

        if(!showAllStats && projections.length > 0) { /* Game */
            const periods: string[] = Array.from(
                new Set(
                    projections
                        .filter((proj) => proj.name === filter.stat)
                        .map((proj) => proj.period)
                )
            );
            
            newFilters.periods = organizePeriods(periods);
            newFilters.stats = getProjectionStats(projections);
        } else { /* No Game */
            newFilters.periods = PSport.getAllPeriods('nba');
            newFilters.stats = PSport.getAllPickedStats('nba');
        }

        return newFilters;
    }
    const organizePeriods = (arr: string[]): string[] => {
        const order = ['All', 'H1', 'H2', 'Q1', 'Q2', 'Q3', 'Q4'];
    
        return arr.sort((a, b) => {
            return order.indexOf(a) - order.indexOf(b);
        });
    }

    /* Always make sure that the picked stat is in the options given */
    useEffect(() => {
        let foundMainStat = filters.stats.find(option => option === filter.stat);
        let foundSupportStat = filters.supportingStats.find(option => option === filter.supportingStat);
        let foundPeriod = filters.periods.find(p => p === filter.period);
        let newFilter = {...filter};

        if(!foundMainStat) newFilter.stat = filters.stats[0];
        if(!foundSupportStat) newFilter.supportingStat = filters.supportingStats[0];
        if(!foundPeriod) newFilter.period = filters.periods[0];

        setFilter({...newFilter})
    }, [filters.stats, filters.supportingStats, filters.periods])

    /* MainBarData */
    const { isAway, isHome, lastGame, period, stat, withOutPlayers, daysRested, minutes, over } = filter;
    useEffect(() => {
        const newData = parseBarData(pGames, filter, player, pickedProjection, matchUp);
        setMainBarData(newData);
    }, [isAway, isHome, lastGame, period, stat, withOutPlayers, daysRested, minutes, over, pickedProjection])

    /* When projected we have to make sure that the peridos match the projection */
    useEffect(() => {
        let newFilters = getNewStatsForFilters(showAllStats, projections);
        setFilters(p => ({...newFilters}));

        /* Look for a projection that matches this stat and period */
        const foundProjection = projections.find(proj => proj.name === filter.stat && proj.period === filter.period);
        if(foundProjection) setPickedProjection(foundProjection);
        else setPickedProjection(null);

    }, [filter.stat, filter.period, showAllStats])

    if(loading) return (
        <Loading />
    )

    if(!loading && !player.name) return(
        <Notfound />
    )

    if(!loading) return (
        <div style={{background: '#000', width: isMobile ? '100%' : '80%', display:'flex', flexDirection:'column'}}>
            <Hero 
                player={player}
                matchUp={matchUp}
                rightBtn={rightBtn} setRightBtn={setRightBtn}
            />
            
            {/* The stuff below the Hero */}
            <div style={{width:'100%', display:'flex', background:'#1F1F1F'}}>
                {/* Bar Charts */}
                <div style={{width: isMobile ? '100%' : '65%'}}>
                    {/* Main BarChart */}
                    <div style={{width:'100%'}}>
                        <BarInfo 
                            filters={filters} showAllStats={showAllStats}
                            pickedProjection={pickedProjection}
                            setPickedProjection={setPickedProjection}
                            projections={projections}
                            setProjections={setProjections}
                            avg={0} 
                            seasonAvg={0}
                            filter={filter} setFilter={setFilter}
                            mainBarData={mainBarData}
                        />
                        <Bars
                            lineValue={pickedProjection ? pickedProjection.values[pickedProjection.values.length-1] : null}
                            refLineOn={true}
                            seasonAvg={0}
                            barData={mainBarData}
                            player={player} 
                            chartType="main"
                        />
                    </div>
                    
                    <SupportCard 
                        filter={filter} setFilter={setFilter}
                        matchUp={matchUp}
                        filters={filters}
                        pGames={pGames}
                        player={player}
                        mainBarData={mainBarData}
                        pickedProjection={pickedProjection}
                    />
                </div>

                {/* Filters */}
                {!isMobile ?
                    <div style={{width:'35%', background:'#2B2B2B', borderLeft:'1px solid #808080'}}>
                        <div style={{marginLeft:'5%', height:'auto', display:'flex', flexDirection:'column'}}>
                            <StatsFilterHeader 
                                hasProjections={projections.length > 0}
                                showAllStats={showAllStats}
                                setShowAllStats={setShowAllStats}
                            />
                            <SecondStatsHeader 
                                filter={filter} filters={filters} setFilter={setFilter}
                            />
                            <PeriodStatsHeader
                                setFilter={setFilter} filter={filter}
                                filters={filters}
                            />

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
                            {matchUp ? 
                                <Rankings 
                                    filter={filter} matchUp={matchUp} player={player}
                                /> : null
                            }
                        </div>
                    </div>
                        : 
                    <div style={{
                        position:'fixed', height:'auto%', width:'100%', zIndex: 4,
                        backgroundColor: '#2B2B2B', bottom:0, 
                        // border:'2px solid #fff',
                        borderTopLeftRadius:'20px', borderTopRightRadius:'20px'
                    }}>
                        {isOverLayFilter ?
                            <div style={{marginLeft:'5%', height:'auto', display:'flex', flexDirection:'column'}}>
                                <StatsFilterHeader 
                                    hasProjections={projections.length > 0}
                                    showAllStats={showAllStats}
                                    setShowAllStats={setShowAllStats}
                                />
                                <SecondStatsHeader 
                                    filter={filter} filters={filters} setFilter={setFilter}
                                />
                                <PeriodStatsHeader
                                    setFilter={setFilter} filter={filter}
                                    filters={filters}
                                />

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
                                {matchUp ? 
                                    <Rankings 
                                        filter={filter} matchUp={matchUp} player={player}
                                    /> : null
                                }
                            </div> : null
                        }
                    </div>
                }
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
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
}
