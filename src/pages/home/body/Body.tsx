import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { BarData, Filter, MatchUp } from '../../../components/Outlier/Matches';
import { parseBarData } from '../../../Context/functions/barchartFuncs';
import { useGlobalContext } from '../../../Context/store';
import { PGame, PPlayer, Team } from '../../../Context/Types/PlayerTypes';
import { Projection } from '../../../Context/Types/ProjectionTypes';
import { Card } from './Card';
import { allDifferentFunctions, getPopularProps } from './functions';

export type PopularProp = {
    player: PPlayer,
    data: BarData[],
    matchUp: MatchUp,
    value: number,
    filter: Filter,
}

export const Body = () => {
    const [popularProps, setPopularProps] = useState<PopularProp[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const {fetchMatchUps, fetchProjections, fetchNbaMatches, fetchNbaPlayers, fetchNbaTeams} = useGlobalContext();
    useEffect(() => {
        const func = async () => {
            setLoading(true);
            const props = await fetchProjections();
            const games = await fetchNbaMatches();
            const players = await fetchNbaPlayers();
            const matchUps = await fetchMatchUps('nba');
            const teams = await fetchNbaTeams();

            // console.log('about')
            const popularProps = await getPopularProps(props, games, players, matchUps);
            console.log(popularProps)
            setPopularProps(popularProps);
            setTeams(teams);

            setLoading(false);
        }

        func();
    }, [])

    return (
        <div style={{
            width:'100%', minHeight:'80vh', background:'#1E1E1E', 
        }}>
            <div style={{width:'100%', display:'flex'}}>

            </div>

            {loading ? 
                <ClipLoader /> 
                    :
                <div
                    style={{
                        display: 'grid', justifyContent:'center',
                        gridTemplateColumns: 'repeat(auto-fit, 32%)',
                        gap: '10px 1%', width: '100%',
                    }}
                >
                    {popularProps.map((prop, i) => (
                        <Card key={i} prop={prop} teams={teams}/>
                    ))}
                </div>
            }
        </div>
    )
}