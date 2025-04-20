import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import {  PGame, PPlayer, Team } from '../../Context/Types/PlayerTypes';
import { PSport } from '../Player/SportClass/Psport';
import { useGlobalContext } from '../../Context/store';
import { Hero } from './Hero/Hero';
import { Projection } from '../../Context/Types/ProjectionTypes';
import { ExtraSideSelection } from './Stats/ExtraSideSelection';
import { Notfound } from './NotFound/Notfound';
import { Loading } from './Loading/Loading';
import { MatchUp } from '../../Context/Types/Match';
import { fetchProjections } from '../../Context/functions/fetch/fetchProjections';
import { MobileFilter } from './Filter/MobileFilter';

import { Drawer } from '@mui/material';
import { FilterBtn } from '../Overlay/Filter/FilterBtn';
import { DesktopFilter } from './Filter/DesktopFilter';
import { PropHistory } from './PropHistory/PropHistory';
import { fetchPlayers } from '../../Context/functions/fetch/players/fetchPlayers';
import { fetchMatches } from '../../Context/functions/fetch/matches/fetchMatches';
import { getInitialProjection } from './Matches/functions/initialProjection';
import { getNewStatsForFilters } from './Matches/functions/functions';
import { fetchMatchUps } from '../../Context/functions/fetch/fetchMatchUps';
import { BarInfo } from './Matches/components/BarInfo';
import { parseBarData } from './Matches/functions/barData';
import { Bars } from './Matches/components/Bars';
import { Rankings } from './Matches/components/Rankings';
import { fetchTeams } from '../../Context/functions/fetch/team/fetchTeams';
import { getStaticProjections } from './Matches/functions/getStaticProjections';

export type Filter = {
    isHome: boolean,
    isAway: boolean,
    pickedProjection: Projection | null,
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
    const [teams, setTeams] = useState<Team[]>([]);

    /* Player Page States */
    const [pGames, setPGames] = useState<PGame[]>([]);

    /* For Mobile Filter */
    const [filterShow, setFilterShow] = useState(false);

    const [extraInfo, setExtraInfo] = useState<string>('Stats Filter');

    const {
        isMobile, filter, setFilter, player, setPlayer, 
        projections, setProjections, setActiveProp
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
                let activeProp = true;
                let projections = await fetchProjections(player.sport, player.name);
                if(projections.length === 0){
                    activeProp = false;
                    projections = getStaticProjections(league, player);
                }
                projections = PSport.sortStats(player, projections);

                const initialPickedProjection = getInitialProjection(
                    projections, 
                    (paramFilter as string), 
                    (paramPropValue as string)
                );
                setProjections(projections);

                /* Set Filter */
                const newFilter = {
                    ...filter, 
                    pickedProjection: initialPickedProjection,
                }
                setFilter(newFilter);

                /* MatchUp */
                let matchUp;
                if(activeProp){
                    const matchUps = await fetchMatchUps(league);
                    matchUp = matchUps.find(match => 
                        match.teams.some(t => t.name === player!.team)
                    );

                    if(matchUp){
                        setMatchUp(matchUp);
                    } else {
                        activeProp = false;
                    }
                }

                /* Teams */
                const teams = await fetchTeams(league);
                setTeams(teams);
                
                /* Inital Bar Setting */
                const newData = parseBarData(allGames, newFilter, player!, teams, matchUp);
                setMainBarData(newData);

                /* Whether or not there are projections for this player */
                setActiveProp(activeProp);
            }

            setLoading(false);
        };
      
        fetchData();
    }, [playerName]);

    useEffect(() => {
        const { pickedProjection } = filter;
    
        if (pickedProjection && teams.length > 0) {
            const newData = parseBarData(pGames, filter, player!, teams, matchUp);
            setMainBarData(newData);
        }

    }, [filter]);


    if(loading) return <Loading />;

    if(!loading && !player.name) return <Notfound />;

    if(!loading) return (
        <div style={{background: '#000', width: isMobile ? '100%' : '80%', display:'flex', flexDirection:'column'}}>
            <Hero matchUp={matchUp} teams={teams}/>
            
            {/* The stuff below the Hero */}
            <div style={{width:'100%', display:'flex', background:'#1F1F1F'}}>
                {/* Bar Charts */}
                <div style={{width: isMobile ? '100%' : '65%'}}>
                    {/* Main BarChart */}
                    <div style={{width:'100%'}}>
                        <BarInfo
                            mainBarData={mainBarData}
                        />
                        <Bars
                            refLineOn={true}
                            seasonAvg={0}
                            barData={mainBarData}
                            player={player} 
                            chartType="main"
                        />
                    </div>
                    
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

                            {extraInfo === "Prop History" && filter.pickedProjection ?
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
