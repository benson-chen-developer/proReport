import React, { useEffect, useState } from 'react'
import { MatchUp } from '../../components/Outlier/Matches';
import { SideBar } from '../../components/Outlier/Sidebar/SideBar';
import { useGlobalContext } from '../../Context/store';
import { Team } from '../../Context/Types/PlayerTypes';
import { Body, PopularProp } from '../popular/body/Body';
import { getPopularProps } from '../popular/body/functions';
import { Header } from '../popular/header/Header';

export const Index = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const [popularProps, setPopularProps] = useState<PopularProp[]>([]);
    const [shownPopularProps, setShownPopularProps] = useState<PopularProp[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    const [periods, setPeriods] = useState<string[]>([]);
    const [pickedMatchUps, setPickedMatchUps] = useState<MatchUp[]>([]);

    const {fetchMatchUps, fetchProjections, fetchNbaMatches, fetchNbaPlayers, fetchNbaTeams, isMobile} = useGlobalContext();
    useEffect(() => {
        const func = async () => {
            setLoading(true);
            const props = await fetchProjections();
            const games = await fetchNbaMatches();
            const players = await fetchNbaPlayers();
            const matchUps = await fetchMatchUps('nba');
            const teams = await fetchNbaTeams();

            const popularProps = await getPopularProps(props, games, players, matchUps);
            setPopularProps(popularProps);
            setShownPopularProps(popularProps);
            setTeams(teams);

            /* Set all the filter options */
            const uniquePeriods = Array.from(new Set(popularProps.flatMap(prop => prop.filter.period)));
            setPeriods(uniquePeriods);

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
                        m.teams[0] === prop.matchUp.teams[0] && m.time === prop.matchUp.time
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
                <Header 
                    pickedMatchUps={pickedMatchUps}
                    setPickedMatchUps={setPickedMatchUps}
                />

                <Body 
                    teams={teams}
                    loading={loading}
                    popularProps={shownPopularProps}
                />
            </div>
        </div>
    )
}

export default Index;