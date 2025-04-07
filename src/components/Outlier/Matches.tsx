import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import {  PGame, PPlayer } from '../../Context/Types/PlayerTypes';
import { PSport } from '../Player/SportClass/Psport';
import { SupportCard } from './Support/SupportCard';
import { useGlobalContext } from '../../Context/store';
import { parseBarData, updateFilters } from '../../Context/functions/barchartFuncs';
import { Rankings } from './Ranking/Ranking';
import { Hero } from './Hero/Hero';
import { Projection } from '../../Context/Types/ProjectionTypes';
import { ExtraSideSelection } from './Stats/ExtraSideSelection';
import { Notfound } from './NotFound/Notfound';
import { Loading } from './Loading/Loading';
import { BarInfo } from './MainBarChart/BarInfo';
import { Bars } from './Bars';
import { MatchUp } from '../../Context/Types/Match';
import { fetchProjections } from '../../Context/functions/fetch/fetchProjections';
import { MobileFilter } from './Filter/MobileFilter';

import { Drawer } from '@mui/material';
import { FilterBtn } from '../Overlay/Filter/FilterBtn';
import { DesktopFilter } from './Filter/DesktopFilter';
import { PropHistory } from './PropHistory/PropHistory';
import { fetchPlayers } from '../../Context/functions/fetch/players/fetchPlayers';
import { fetchMatches } from '../../Context/functions/fetch/matches/fetchMatches';
import { getNewStatsForFilters } from './Matches/functions';

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
    minutesChecked: boolean,
    over: boolean
}
export type Filters = {
    stats: string[], //PTS, REB, STL
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
    playerTeam: string,
    opp: string,
    tie: boolean,
    underText: string,
    hit: boolean
}

export const bgColor = "#1E1E1E"; //tron #0B1C1F

interface Props {
    loading: boolean, setLoading: Dispatch<SetStateAction<boolean>>
}
export const Matches: React.FC<Props> = ({loading, setLoading}) => {
    const router = useRouter();
    const { paramPlayer, paramLeague, paramFilter, paramPropValue } = router.query;
    const playerName = (paramPlayer as string).replace(/_/g, ' ');
    const league = paramLeague as string;
    
    const [mainBarData, setMainBarData] = useState<BarData[]>([]);
    const [matchUp, setMatchUp] = useState<MatchUp | undefined>();

    /* Player Page States */
    const [pGames, setPGames] = useState<PGame[]>([]);

    /* For Mobile Filter */
    const [filterShow, setFilterShow] = useState(false);

    const [showAllStats, setShowAllStats] = useState<boolean>(false);
    const [extraInfo, setExtraInfo] = useState<string>('Stats Filter');

    const [projections, setProjections] = useState<Projection[]>([]); /* The projections for this player */

    const {
        fetchMatchUps, isMobile,
        filter, setFilter, player, setPlayer, filters, setFilters,
        pickedProjection, setPickedProjection
    } = useGlobalContext();

    /* Initial */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
            const allGames = await fetchMatches(league, playerName);
            setPGames(allGames);
            const players = await fetchPlayers(league);
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

                /* Intial Projections and Intial Stats Filters set up */
                const projections = await fetchProjections(player.name);
                let newFilters: Filters;
                if(projections.length === 0) {
                    newFilters = getNewStatsForFilters(true, [], filter, filters, league);
                    setShowAllStats(true)
                } else {
                    newFilters = getNewStatsForFilters(false, projections, filter, filters, league);
                }
                setProjections(projections);

                /* Get the team they are playing against */
                const matchUps = await fetchMatchUps(league);
                const matchUp = matchUps.find(match => match.teams.some(t => t.name === player!.city));
                setMatchUp(matchUp);
                if(matchUp && !filters.lastGames.includes('H2H')){
                    newFilters.lastGames = [...newFilters.lastGames, "H2H"];
                }

                /* Set up filters */
                setFilters(newFilters);

                const newFilter = {
                    ...filter, 
                    period: newFilters.periods[0],
                }
                setFilter(newFilter);

                /* Inital Bar Setting */
                const newData = parseBarData(allGames, filter, player!, pickedProjection, matchUp);
                setMainBarData(newData);

                let initalPickedProjection = null;
                if(paramFilter) {
                    try {
                        const filterFromParam: Filter = JSON.parse(paramFilter as string);
                        if(paramPropValue){
                            const foundProp = projections.find(p => 
                                p.values[p.values.length-1] === Number(paramPropValue) &&
                                p.period === filterFromParam.period &&
                                p.name === filterFromParam.stat
                            );
                            if(foundProp) initalPickedProjection = foundProp;
                        }
                        setFilter(p => ({...filterFromParam}))
                    } catch (error) {
                        /* Someone messed up the url just don;t parse it */
                        console.error("Error parsing filter:", error);
                    }
                }

                if(!initalPickedProjection){
                    initalPickedProjection = projections.find(p => 
                        p.name === newFilters.stats[0] && filter.period === p.period
                    );
                }

                setPickedProjection(initalPickedProjection ? initalPickedProjection : null);
            }

            setLoading(false);
        };
      
        fetchData();
    }, [playerName]);

    useEffect(() => {
        // console.log('filter', filter)
    }, [filter])

    /* Always make sure that the picked stat is in the options given */
    const validateStat = (changedFilter: Filter): Filter => {
        let foundMainStat = filters.stats.find(option => option === filter.stat);
        let foundSupportStat = filters.supportingStats.find(option => option === filter.supportingStat);
        let foundPeriod = filters.periods.find(p => p === filter.period);
        let newFilter = {...filter};
        
        if(!foundMainStat) newFilter.stat = filters.stats[0];
        if(!foundSupportStat) newFilter.supportingStat = filters.supportingStats[0];
        if(!foundPeriod) newFilter.period = filters.periods[0];

        return newFilter;
    }

    /* Make sure the filter is valid when changing it */
    const validateFilter = (changedFilter: Filter, currentFilters: Filters): Filter => {
        let foundMainStat = filters.stats.find(option => option === filter.stat);
        let foundSupportStat = filters.supportingStats.find(option => option === filter.supportingStat);
        let foundPeriod = filters.periods.find(p => p === filter.period);
        let validatedFilter = {...filter};
        
        if(!foundMainStat) validatedFilter.stat = filters.stats[0];
        if(!foundSupportStat) validatedFilter.supportingStat = filters.supportingStats[0];
        if(!foundPeriod) validatedFilter.period = filters.periods[0];

        return validatedFilter;
    }

    /* MainBarData */
    const { isAway, isHome, lastGame, period, stat, withOutPlayers, daysRested, minutes, over, minutesChecked } = filter;

    useEffect(() => {
        if(!loading){
            const newFilterAndPickedProjection = getValidFiltersAndPickedProjection();
            const {pickedProjection, filter} = newFilterAndPickedProjection;
    
            let newFilter = validateStat(filter);
            let newFilters = getNewStatsForFilters(showAllStats, projections, filter, filters, league);
            
            // //When u switch periods the h1 has a null pickedpgroject
            // //i think its the filter.period isnt change yet
            // console.log("stat",stat)
            // console.log("pickedProjection",pickedProjection)
            
            const newData = parseBarData(pGames, newFilter, player, pickedProjection, matchUp);
            setMainBarData(newData);
            
            setFilters(newFilters);
            setFilter(newFilter);
    
            setPickedProjection(pickedProjection);
        }
    }, [isAway, isHome, lastGame, withOutPlayers, daysRested, minutes, over, period, stat, pickedProjection, minutesChecked]);
    
    /* 
        CHANGE (PICKED PROJECTIONS)
        When projected we have to make sure that the peridos match the projection 
    */
    const getValidFiltersAndPickedProjection = (): {
        pickedProjection : Projection | null,
        filter: Filter
    } => {
        const newFilterAndPickedProjection = {
            pickedProjection: pickedProjection,
            filters: filters,
            filter:filter,
        }
        // console.log("filter", filter)

        /* Look for a projection that matches this stat and period */
        const foundProjection = projections.find(proj => proj.name === filter.stat && proj.period === filter.period);

        if (foundProjection) {
            /* Only look for a new one if the current doesn't work */
            if (pickedProjection?.name !== filter.stat || pickedProjection?.period !== filter.period) {
                newFilterAndPickedProjection.pickedProjection = foundProjection;
            }
            
            if (foundProjection.overUnder === 1) setFilter(p => ({ ...p, over: true }));
        } else {
            newFilterAndPickedProjection.pickedProjection = null;
        }

        return newFilterAndPickedProjection;
    }

    if(loading) return (
        <Loading />
    )

    if(!loading && !player.name) return(
        <Notfound />
    )

    if(!loading) return (
        <div style={{background: '#000', width: isMobile ? '100%' : '80%', display:'flex', flexDirection:'column'}}>
            <Hero matchUp={matchUp}/>
            
            {/* The stuff below the Hero */}
            <div style={{width:'100%', display:'flex', background:'#1F1F1F'}}>
                {/* Bar Charts */}
                <div style={{width: isMobile ? '100%' : '65%'}}>
                    {/* Main BarChart */}
                    <div style={{width:'100%'}}>
                        <BarInfo 
                            showAllStats={showAllStats}
                            projections={projections}
                            setProjections={setProjections}
                            avg={0} 
                            seasonAvg={0}
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
                        matchUp={matchUp}
                        filters={filters}
                        pGames={pGames}
                        player={player}
                        mainBarData={mainBarData}
                        pickedProjection={pickedProjection}
                    />

                    <div key={'bottom'}>
                        <Drawer
                            anchor={'bottom'}
                            open={filterShow}
                            onClose={() => setFilterShow(false)}
                            PaperProps={{
                                style: {
                                    backgroundColor: '#2B2B2B',
                                    borderTopLeftRadius: '20px',
                                    borderTopRightRadius: '20px',
                                    minHeight: '50vh', 
                                    maxHeight: '50vh', 
                                    overflow: 'hidden',
                                }
                            }}
                        >
                            <MobileFilter 
                                extraInfo={extraInfo} setExtraInfo={setExtraInfo}
                                projections={projections}
                                showAllStats={showAllStats} setShowAllStats={setShowAllStats}
                                matchUp={matchUp}
                            />
                        </Drawer>
                    </div>
                </div>


                {/* Filters */}
                {!isMobile ?
                    <div style={{width:'35%', background:'#2B2B2B', borderLeft:'1px solid #808080'}}>
                        <div style={{
                            // marginLeft:'5%', 
                        height:'auto', display:'flex', flexDirection:'column'}}>
                            <ExtraSideSelection 
                                hasProjections={projections.length > 0}
                                showAllStats={showAllStats}
                                setShowAllStats={setShowAllStats}
                                extraInfo={extraInfo} 
                                setExtraInfo={setExtraInfo}
                            />

                            {extraInfo === "Stats Filter" ?
                                <DesktopFilter 
                                    homeGame={matchUp?.teams[0].name === player.city}
                                /> : null
                            }

                            {extraInfo === "MatchUp Given" && matchUp ?
                                <Rankings 
                                    matchUp={matchUp}
                                /> : null
                            }

                            {extraInfo === "Prop History" && pickedProjection ?
                                <PropHistory /> : null
                            }

                        </div>
                    </div> : null
                }
            </div>

            {isMobile && !loading ? 
                <FilterBtn
                    isOverLayFilter={filterShow} 
                    setIsOverLayFilter={setFilterShow}
                /> 
                    : 
                null
            }
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
