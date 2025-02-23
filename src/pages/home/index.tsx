import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { SideBar } from '../../components/Outlier/Sidebar/SideBar';
import { useGlobalContext } from '../../Context/store';
import { MatchUp } from '../../Context/Types/Match';
import { PPlayer, Team } from '../../Context/Types/PlayerTypes';
import { Body } from '../../components/Home/home/body/Body';
import { getPopularProps } from '../../components/Home/home/body/functions';
import { Header } from '../../components/Home/home/header/Header';
import { Loading } from '../../components/Outlier/Loading/Loading';
import { fetchNBAMatchesViaTeams } from '../../Context/functions/fetchNbaMatches';
import { PopularProp, Projection } from '../../Context/Types/ProjectionTypes';
import { fetchPopularProjections } from '../../Context/functions/fetchProjections';

export const Index = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const [popularProps, setPopularProps] = useState<PopularProp[]>([]);
    const [shownPopularProps, setShownPopularProps] = useState<PopularProp[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [players, setPlayers] = useState<PPlayer[]>([]);

    const [periods, setPeriods] = useState<string[]>([]);
    const [pickedMatchUps, setPickedMatchUps] = useState<MatchUp[]>([]);

    const {fetchMatchUps, fetchProjections, fetchNbaMatches, fetchNbaPlayers, fetchNbaTeams, isMobile} = useGlobalContext();
    useEffect(() => {
        const func = async () => {
            setLoading(true);
            /* Cached */
            const matchUps = await fetchMatchUps('nba');
            const teams = await fetchNbaTeams();
            const players = await fetchNbaPlayers();
            setPlayers(players);

            // /* Gotta to be new each time */
            // const props = await fetchProjections();
            const props = await fetchPopularProjections();
            // const games = await fetchNBAMatchesViaTeams(
            //     matchUps.flatMap(match => match.teams.map(team => team.name))
            // );
            // console.log('games', games)

            // const popularProps = await getPopularProps(props, games, players, matchUps);
            // setPopularProps(popularProps);
            // setShownPopularProps(popularProps);
            setTeams(teams);
            const popularProps = props
                .filter(prop => prop.popularHits.length > 0)
                .map(prop => {
                    return ({
                        prop: prop, 
                        matchUp: matchUps.find(matchUp => 
                            matchUp.teams.find(t => t.name === prop.player.city)
                        )!
                    })
                })
            ;
            console.log('popularProps', popularProps)
            setPopularProps(popularProps);
            setShownPopularProps(popularProps);
            
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
                newPopularProps = newPopularProps.filter(prop => {
                    const isSameMatch = pickedMatchUps.find((m) =>
                        m.teams[0].name === prop.matchUp.teams[0].name
                        // && m.time === prop.matchUp.time
                    )
                    
                    return isSameMatch;
                })
            }
    
            setShownPopularProps(newPopularProps);
        }
    }, [pickedMatchUps])

    return (
        <div style={{display: "flex", width: "100%", background: "#000" }}>
            <SideBar 
                sidebarVisible={sidebarVisible} 
                setSidebarVisible={setSidebarVisible}
            />

            <div style={{width: isMobile ? '100%' : '80%', height:'100%'}}>
                {loading ? 
                    <div style={{display:'flex', width:'100%', justifyContent:'center', marginTop:'100px'}}>
                        <Loading />
                    </div>
                        :
                    <>
                        <Header 
                            pickedMatchUps={pickedMatchUps}
                            setPickedMatchUps={setPickedMatchUps}
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