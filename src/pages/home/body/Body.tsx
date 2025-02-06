import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { BarData, Filter, MatchUp } from '../../../components/Outlier/Matches';
import { parseBarData } from '../../../Context/functions/barchartFuncs';
import { useGlobalContext } from '../../../Context/store';
import { PGame, PPlayer, Team } from '../../../Context/Types/PlayerTypes';
import { Projection } from '../../../Context/Types/ProjectionTypes';
import { Card } from './Card';
import { allDifferentFunctions } from './functions';

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

            const popularProps = await getPopularProps(props, games, players, matchUps);
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
                        gap: '1%',
                        width: '100%',
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

const getPopularProps = async (
    allProps: Projection[], games: PGame[], players: PPlayer[], todayMatches: MatchUp[]
): Promise<PopularProp[]> => {
    const popularProp: PopularProp[] = [];

    const allPropsGroupedByPlayer = Object.values(
        allProps.reduce<Record<string, typeof allProps>>((acc, prop) => {
            if (!acc[prop.playerName]) {
                acc[prop.playerName] = [];
            }
            acc[prop.playerName].push(prop);
            return acc;
        }, {})
    );

    /* 
        Do game's match percentage 
            - maybe match from most specific to least
    */
    allPropsGroupedByPlayer.forEach((propGroup, i) => {
        let player: PPlayer = players.find(p => p.name === propGroup[0].playerName)!;
        const currentMatch = todayMatches.find(match => match.teams.includes(player!.city));
        
        let isHome = currentMatch!.teams[0] === player!.city;
        const ourGames = games.filter((game) => {
            const foundPlayer = game.players.find(p => p.name.toLowerCase() === propGroup[0].playerName.toLowerCase());
            return foundPlayer?.periods.some(period => period['MIN'] > 0);
        }).reverse();

        propGroup.forEach(prop => {
            const filters = allDifferentFunctions('nba', isHome, propGroup, prop);
            
            filters.forEach((filter) => {
                let currFilter = {...filter};
                let isGoodPick = false; 

                let barData = parseBarData(ourGames, filter, player!, prop, currentMatch);
                let hitsArray: boolean[] = barData.map(data => data.hit);
                const hitCount = hitsArray.filter(h => h).length;
                const totalCount = hitsArray.length || 1;
                const hitPercent = (hitCount / totalCount) * 100;
                const missPercent = 100 - hitPercent;
                
                if(prop.overUnder === 3 && missPercent >= 80 && hitsArray.length > 2){
                    currFilter.over = false;
                    isGoodPick = true;
                    barData.forEach(data => data.hit = !data.hit ? true : data.hit);
                }
                if(hitPercent >= 80 && hitsArray.length > 2){
                    isGoodPick = true;
                }

                if(isGoodPick){
                    popularProp.push({
                        player: player,
                        data: barData,
                        matchUp: currentMatch!,
                        filter: currFilter,
                        value: prop.values[prop.values.length-1],
                    })
                }
            })
        })
    })

    return popularProp;
}