import { Filter } from "../../../components/Outlier/Matches";
import { Projection } from "../../../Context/Types/ProjectionTypes";

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
        minutes: [15, 45],
        supportingStat: 'Minute'
    };

    const minProj = projections.find(p => p.name === "MIN");
    let projectedMinutes = minProj ? minProj.values[minProj.values.length-1] : -1;

    if(league === 'nba'){
        filters = [ 
            defaultFilter,
            {
                ...defaultFilter,
                isHome: isHome,
                isAway: !isHome,
            },
            {...defaultFilter, lastGame:'H2H'}
        ];

        if(projectedMinutes !== -1) filters.push({
            ...defaultFilter, minutes: [projectedMinutes-2, projectedMinutes+2]
        });
    }

    return filters;
}