import React, { useEffect } from 'react'
import { Filter, MatchUp } from '../../../components/Outlier/Matches';
import { parseBarData } from '../../../Context/functions/barchartFuncs';
import { useGlobalContext } from '../../../Context/store';
import { PGame, PPlayer } from '../../../Context/Types/PlayerTypes';
import { Projection } from '../../../Context/Types/ProjectionTypes';
import { Card } from './Card';
import { allDifferentFunctions } from './functions';

export type PopularProp = {
    player: {name: string, id: string},
    team: string,
    hits: boolean[],
    game: string,
    over: boolean,
    value: number,
    stat: string,
    description: string,
    rank: number,
    rankText: string
}

export const Body = () => {
    const props: PopularProp[] = [
        {
            player: {name: 'Trae Young', id:'1629027'},
            team: 'Atlanta',
            hits: [true, true, true, false, true],
            game: 'ATL vs OKL - Today 8:15',
            over: true,
            value: 21.5,
            stat: 'Points',
            description:'Trae Young has hit Over 21.5 PTS in the last 5 games at Home',
            rank: 5,
            rankText: 'OKL PTS allowed'
        },
        {
            player: {name: 'Trae Young', id:'1629027'},
            team: 'Atlanta',
            hits: [true, true, true, false, true],
            game: 'ATL vs OKL - Today 8:15',
            over: true,
            value: 21.5,
            stat: 'Points',
            description:'Trae Young has hit Over 21.5 PTS in the last 5 games at Home',
            rank: 5,
            rankText: 'OKL PTS allowed'
        },
        {
            player: {name: 'Trae Young', id:'1629027'},
            team: 'Atlanta',
            hits: [true, true, true, false, true],
            game: 'ATL vs OKL - Today 8:15',
            over: true,
            value: 21.5,
            stat: 'Points',
            description:'Trae Young has hit Over 21.5 PTS in the last 5 games at Home',
            rank: 5,
            rankText: 'OKL PTS allowed'
        },
        {
            player: {name: 'Trae Young', id:'1629027'},
            team: 'Atlanta',
            hits: [true, true, true, false, true],
            game: 'ATL vs OKL - Today 8:15',
            over: true,
            value: 21.5,
            stat: 'Points',
            description:'Trae Young has hit Over 21.5 PTS in the last 5 games at Home',
            rank: 5,
            rankText: 'OKL PTS allowed'
        },
        
    ];

    const {fetchMatchUps, fetchProjections, fetchNbaMatches, fetchNbaPlayers} = useGlobalContext();
    useEffect(() => {
        const func = async () => {
            const props = await fetchProjections();
            const games = await fetchNbaMatches();
            const players = await fetchNbaPlayers();
            const matchUps = await fetchMatchUps('nba');

            const popularProps = await getPopularProps(props, games, players, matchUps);
        }

        func();
    }, [])

    return (
        <div style={{
            width:'100%', minHeight:'80vh', background:'#1E1E1E', 
        }}>
            <div style={{width:'100%', display:'flex'}}>

            </div>

            <div
                style={{
                    display: 'grid', justifyContent:'center',
                    gridTemplateColumns: 'repeat(auto-fit, 31%)',
                    gap: '2%',
                    width: '100%',
                }}
            >
                {props.map((prop, i) => (
                    <Card key={i} prop={prop} />
                ))}
            </div>
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
    const playerMap = allPropsGroupedByPlayer.map((propGroup, i) => {
        let player = players.find(p => p.name === propGroup[0].playerName);
        const currentMatch = todayMatches.find(match => match.teams.includes(player!.city));
        
        let isHome = currentMatch!.teams[0] === player!.city;
        let oppTeam = isHome ? currentMatch!.teams[1] : currentMatch!.teams[0]
       
        const ourGames = games.filter((game) => {
            const foundPlayer = game.players.find(p => p.name.toLowerCase() === propGroup[0].playerName.toLowerCase());
            return foundPlayer?.periods.some(period => period['MIN'] > 0);
        });

        const hits: boolean[][] = [];
        const filtersForHits: Filter[] = [];
        propGroup.forEach(prop => {
            const filters = allDifferentFunctions('nba', isHome, propGroup, prop);

            filters.forEach((filter) => {
                const barData = parseBarData(ourGames, filter, player!, prop, currentMatch);
                const hitsArray: boolean[] = barData.map(data => data.hit);
                const hitCount = hitsArray.filter(h => h).length;
                const totalCount = hitsArray.length || 1;
                const hitPercent = (hitCount / totalCount) * 100;
                const missPercent = 100 - hitPercent;
                
                console.log('barData', barData)
                console.log('hits', hitPercent)
                
                if(prop.overUnder === 3 && missPercent >= 80){
                    hits.push(hitsArray)
                    filtersForHits.push({...filter, over: false});
                }
                if(hitPercent >= 80){
                    console.log('amdeit')
                    hits.push(hitsArray)
                    filtersForHits.push(filter);
                }
            })
        })

        return {
            [player!.name]: {
                hits,
                filtersForHits
            }
        }
    })

    console.log("playerMap", playerMap);

    return popularProp;
}