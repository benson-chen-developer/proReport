import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { BarData } from '../../../Matches';
import { PGame, Team } from '../../../../../Context/Types/PlayerTypes';
import { MatchUp } from '../../../../../Context/Types/Match';
import { useGlobalContext } from '../../../../../Context/store';
import { fetchMatches } from '../../../../../Context/functions/fetch/matches/fetchMatches';
import { fetchPlayers } from '../../../../../Context/functions/fetch/players/fetchPlayers';
import { fetchTeams } from '../../../../../Context/functions/fetch/team/fetchTeams';
import { parseBarData } from '../../functions/barData';
import { Loading } from '../../../Loading/Loading';
import { Notfound } from '../../../NotFound/Notfound';
import { Hero } from '../../../Hero/Hero';
import { BarInfo } from '../BarInfo';
import { Bars } from '../Bars';
import { Drawer } from '@mui/material';
import { ExtraSideSelection } from '../../../Stats/ExtraSideSelection';
import { DesktopFilter } from '../../../Filter/DesktopFilter';
import { FilterBtn } from '../../../../Overlay/Filter/FilterBtn';
import { getStaticProjections } from '../../functions/getStaticProjections';
import { MobileFilter } from '../../../Filter/MobileFilter';

export const bgColor = "#1E1E1E"; //tron #0B1C1F

interface Props {
    loading: boolean, setLoading: Dispatch<SetStateAction<boolean>>
}
export const NoProjectionMatches: React.FC<Props> = ({loading, setLoading}) => {
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

                const staticProjections = getStaticProjections(league, player);
                setProjections(staticProjections);

                const newFilter = {
                    ...filter, 
                    pickedProjection: staticProjections[0],
                }
                setFilter(newFilter);

                /* Inital Bar Setting */
                const teams = await fetchTeams(league);
                setTeams(teams);
                const newData = parseBarData(allGames, newFilter, player!, teams, matchUp);
                setMainBarData(newData);

                setActiveProp(false);
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


    if(loading) return (
        <Loading />
    )

    if(!loading && !player.name) return(
        <Notfound />
    )

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
                            height:'auto', display:'flex', flexDirection:'column'
                        }}>
                            <ExtraSideSelection
                                extraInfo={extraInfo} 
                                setExtraInfo={setExtraInfo}
                            />

                            {extraInfo === "Stats Filter" ?
                                <DesktopFilter
                                    homeGame={matchUp?.teams[0].name === player.city}
                                /> : null
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
