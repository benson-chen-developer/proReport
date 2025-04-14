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

export const Index = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const [popularProps, setPopularProps] = useState<PopularProp[]>([]);
    const [shownPopularProps, setShownPopularProps] = useState<PopularProp[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [players, setPlayers] = useState<PPlayer[]>([]);

    const [periods, setPeriods] = useState<string[]>([]);
    const [search, setSearch] = useState<string>("");
    const [pickedMatchUps, setPickedMatchUps] = useState<MatchUp[]>([]);

    const {fetchProjections, isMobile} = useGlobalContext();
    useEffect(() => {
        const league = 'nba';

        const func = async () => {
            setLoading(true);
            /* Cached */
            const teams = await fetchTeams(league);
            const players = await fetchPlayers(league);
            setPlayers(players);
            setTeams(teams);

            // /* Gotta to be new each time */
            // const props = await fetchProjections();
            const props = await fetchPopularProjections();

            const popularPropWithoutMatchUp: Projection[] = props
                .filter(prop => prop.popularHits.length > 0);
            
            const matchUps = await fetchMatchUps('nba', popularPropWithoutMatchUp);

            const popularProps: PopularProp[] = popularPropWithoutMatchUp
                .map(prop => {
                    return ({
                        prop: prop, 
                        matchUp: matchUps.find(matchUp => 
                            matchUp.teams.find(t => t.name === prop.player.city)
                        )!
                    })
                })
                
            setPopularProps(popularProps);
            
            const prettyProps = prettierPopularProps(popularProps);
            setShownPopularProps(prettyProps);
            
            // /* Set all the filter options */
            // const uniquePeriods = Array.from(new Set(popularProps.flatMap(prop => prop.filter.period)));
            // setPeriods(uniquePeriods);
            
            setLoading(false);
        }

        func();
    }, [])

    /* Filter Logic */
    useEffect(() => {
        if(!loading){
            let newPopularProps = popularProps;

            if(pickedMatchUps.length > 0){
                newPopularProps  = popularProps.filter(prop => {
                    return pickedMatchUps.find(pickedMatchUp => isSameMatchup(pickedMatchUp, prop.matchUp));
                });
            }
            
            if(search.trim().length > 0){
                const propsFilteredBySearch = newPopularProps.filter(prop => {
                    const name = prop.prop.player.name;
                    const firstName = prop.prop.player.name.split(' ')[0];
                    const lastName = prop.prop.player.name.split(' ')[1];

                    return (
                        firstName && firstName.toLowerCase().startsWith(search) ||
                        lastName && lastName.toLowerCase().startsWith(search) ||
                        name.toLowerCase().startsWith(search)
                    )
                });
                newPopularProps = propsFilteredBySearch;
            }

            if(search.trim().length === 0 && pickedMatchUps.length === 0){
                const prettyProps = prettierPopularProps(popularProps);
                setShownPopularProps(prettyProps);
            } else {
                setShownPopularProps(newPopularProps);
            }
        }
    }, [pickedMatchUps, search])

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
                            popularProps={popularProps}
                            pickedMatchUps={pickedMatchUps}
                            setPickedMatchUps={setPickedMatchUps}
                            search={search} setSearch={setSearch}
                        />

                        <Body 
                            teams={teams}
                            loading={loading}
                            popularProps={shownPopularProps}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default Index;