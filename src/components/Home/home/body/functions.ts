import { Filter } from "../../../Outlier/Matches";
import { parseBarData } from "../../../../Context/functions/barchartFuncs";
import { MatchUp } from "../../../../Context/Types/Match";
import { PGame, PPlayer } from "../../../../Context/Types/PlayerTypes";
import { Projection } from "../../../../Context/Types/ProjectionTypes";
import { PopularProp } from "./Body";

export const getPopularProps = async (
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

    // console.log("allPropsGroupedByPlayer", allPropsGroupedByPlayer)
    /* 
        Do game's match percentage 
            - maybe match from most specific to least
    */
    for(let propGroup of allPropsGroupedByPlayer){
        let player: PPlayer = players.find(p => p.name === propGroup[0].playerName)!;
        if(!player) continue;

        const currentMatch = todayMatches.find(match => match.teams.some(t => t.name === player.city));
        let isHome = currentMatch!.teams[0].name === player!.city;
        const ourGames = games.filter((game) => {
            const foundPlayer = game.players.find(p => p.name.toLowerCase() === propGroup[0].playerName.toLowerCase());
            return foundPlayer?.periods.some(period => period['MIN'] > 0);
        }).reverse();

        propGroup.forEach(prop => {
            const filters = allDifferentFunctions('nba', isHome, propGroup, prop);
            
            /* Only keep the most specific filter, with each further filter getting more specific */
            filters.forEach((filter, filterIndex) => {
                let currFilter = {...filter};
                let isGoodPick = false; 

                const barData = parseBarData(ourGames, filter, player!, prop, currentMatch);
                let hitsArray: boolean[] = barData.map(data => data.hit);
                const hitCount = hitsArray.filter(h => h).length;
                const totalCount = hitsArray.length || 1;
                const hitPercent = (hitCount / totalCount) * 100;
                const missPercent = 100 - hitPercent;
                
                if(prop.overUnder === 3 && missPercent >= 80 && hitsArray.length > 2){
                    currFilter.over = false;
                    isGoodPick = true;
                    barData.forEach(data => data.hit = !data.hit);
                }
                else if(hitPercent >= 80 && hitsArray.length > 2){
                    isGoodPick = true;
                }

                if(isGoodPick){
                    const newPopularProp = {
                        player: player,
                        data: barData,
                        matchUp: currentMatch!,
                        filter: currFilter,
                        value: prop.values[prop.values.length-1],
                        odds: prop.odds
                    };

                    if(filterIndex > 0){
                        popularProp[popularProp.length-1] = newPopularProp;
                    } else {
                        popularProp.push(newPopularProp)
                    }
                }
            })
        })
    }

    return popularProp;
}

export const allDifferentFunctions = (
    league: string, isHome: boolean, projections: Projection[], prop: Projection
): Filter[] => {
    const periods = ["L20", "L10", "L5"];
    let filters: Filter[] = [];

    const defaultFilter: Filter = {  
        stat: prop.name,
        over: true,
        isHome: true,
        isAway: true,
        period: prop.period,
        lastGame: "L10", 
        withOutPlayers: [],
        daysRested: -1,
        minutes: [0, 45],
        supportingStat: 'Minute'
    };

    const minProj = projections.find(p => p.name === "MIN");
    let projectedMinutes = minProj ? minProj.values[minProj.values.length-1] : -1;

    if(league === 'nba'){
        filters = [ 
            defaultFilter, //Defaut
            {...defaultFilter, isHome: isHome, isAway: !isHome}, //Home or Away
            {...defaultFilter, lastGame:'H2H'} //H2H
        ];

        if(projectedMinutes !== -1) filters.push({
            ...defaultFilter, minutes: [projectedMinutes-2, projectedMinutes+2]
        });
    }

    return filters;
}