import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { SideBar } from '../../components/Outlier/Sidebar/SideBar';
import { useGlobalContext } from '../../Context/store';
import { isSameMatchup, MatchUp } from '../../Context/Types/Match';
import { PPlayer, Team } from '../../Context/Types/PlayerTypes';
import { Body } from '../../components/Home/home/body/Body';
import { Header } from '../../components/Home/home/header/Header';
import { Loading } from '../../components/Outlier/Loading/Loading';
import { PopularProp, Projection } from '../../Context/Types/ProjectionTypes';
import { fetchPopularProjections } from '../../Context/functions/fetch/fetchProjections';
import { prettierPopularProps } from '../../components/Home/home/body/functions';
import { useRouter } from 'next/router';
import { fetchPlayers } from '../../Context/functions/fetch/players/fetchPlayers';
import { fetchTeams } from '../../Context/functions/fetch/team/fetchTeams';
import { fetchMatchUps } from '../../Context/functions/fetch/fetchMatchUps';

export type PopularPropsFilter = {
    matches: MatchUp[]
    projections: string[],
    players: PPlayer[],
    league: string
}

export const Index = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const [teams, setTeams] = useState<Team[]>([]);
    const [players, setPlayers] = useState<PPlayer[]>([]);

    const [periods, setPeriods] = useState<string[]>([]);
    const [search, setSearch] = useState<string>("");

    const {
        fetchProjections, isMobile,
        popularProps, setPopularProps,
        popularPropsFilter,
        shownPopularProps, setShownPopularProps
    } = useGlobalContext();
    const {league} = popularPropsFilter;

    useEffect(() => {
        const func = async () => {
            setLoading(true);

            /* Cached */
            const teams = await fetchTeams(league);
            const players = await fetchPlayers(league);
            setPlayers(players);
            setTeams(teams);

            // /* Gotta to be new each time */
            // const props = await fetchProjections();
            const popularPropsWithoutMatchUps = await fetchPopularProjections();
            const props = popularPropsWithoutMatchUps.map(popularProp => popularProp.propRef);
            const matchUps = await fetchMatchUps(league, props);
            const popularProps = popularPropsWithoutMatchUps
                .map(popularProp => {
                    const matchUp = matchUps.find(matchUp => 
                        matchUp.teams.find(t => t.name === popularProp.propRef.player.team)
                    );
            
                    return matchUp ? { ...popularProp, matchUp } : null;
                })
                .filter((prop): prop is PopularProp & { matchUp: MatchUp } => prop !== null);
                
            /* Set the popularProps */
            setPopularProps(popularProps);
            setShownPopularProps(popularProps);
            
            // const prettyProps = prettierPopularProps(popularProps);
            // setShownPopularProps(prettyProps);

            // /* Set all the filter options */
            // const uniquePeriods = Array.from(new Set(popularProps.flatMap(prop => prop.filter.period)));
            // setPeriods(uniquePeriods);
            
            setLoading(false);
        }

        if(league) func();
    }, [league])

    /* Filter Logic */
    useEffect(() => {
        const {matches, players, projections} = popularPropsFilter;

        if(!loading){
            let newPopularProps = popularProps;

            if(matches.length > 0){
                newPopularProps  = popularProps.filter(prop => {
                    return matches.find(pickedMatchUp => isSameMatchup(pickedMatchUp, prop.matchUp));
                });
            }
            
            // //Filter by player serach
            // if(search.trim().length > 0){
            //     const propsFilteredBySearch = newPopularProps.filter(prop => {
            //         const name = prop.propRef.player.name;
            //         const firstName = prop.propRef.player.name.split(' ')[0];
            //         const lastName = prop.propRef.player.name.split(' ')[1];

            //         return (
            //             firstName && firstName.toLowerCase().startsWith(search) ||
            //             lastName && lastName.toLowerCase().startsWith(search) ||
            //             name.toLowerCase().startsWith(search)
            //         )
            //     });
            //     newPopularProps = propsFilteredBySearch;
            // }

            // Filter by player
            if(players.length > 0){
                newPopularProps = newPopularProps.filter(prop => 
                    players.find(player =>
                        player.playerId === prop.propRef.player.playerId
                    )
                )
            }

            // Filter by player
            if(projections.length > 0){
                newPopularProps = newPopularProps.filter(prop => 
                    projections.includes(prop.propRef.name)
                )
            }

            // if(search.trim().length === 0 && matches.length === 0){
            //     const prettyProps = prettierPopularProps(popularProps);
            //     setShownPopularProps(prettyProps);
            // } else {
            setShownPopularProps(newPopularProps);
            // }
        }
    }, [
        popularPropsFilter.matches, 
        popularPropsFilter.players,
        popularPropsFilter.projections,
        search
    ])

    /* League */
    useEffect(() => {
        const newPopularProps = popularProps.filter(prop => 
            prop.propRef.league === popularPropsFilter.league
        )

        setShownPopularProps(newPopularProps)
    }, [popularPropsFilter.league])

    return (
        <div style={{display: "flex", width: "100%", background: "#000" }}>
            <SideBar />

            <div style={{width: isMobile ? '100%' : '80%', height:'100%'}}>
                {loading ? 
                    <div style={{display:'flex', width:'100%', justifyContent:'center', marginTop:'100px'}}>
                        <Loading />
                    </div>
                        :
                    <>
                        <Header 
                            search={search} setSearch={setSearch}
                        />

                        <Body 
                            teams={teams}
                            loading={loading}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default Index;