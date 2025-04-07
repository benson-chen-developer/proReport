import { Projection } from "../../../Context/Types/ProjectionTypes";
import { PSport } from "../../Player/SportClass/Psport";
import { Filter, Filters } from "../Matches";



/* Make sure the filter is valid when changing it */
export const validateFilter = (changedFilter: Filter, filters: Filters): Filter => {
    let foundMainStat = filters.stats.find(option => option === changedFilter.stat);
    let foundSupportStat = filters.supportingStats.find(option => option === changedFilter.supportingStat);
    let foundPeriod = filters.periods.find(p => p === changedFilter.period);
    let validatedFilter = {...changedFilter};
    
    if(!foundMainStat) validatedFilter.stat = filters.stats[0];
    if(!foundSupportStat) validatedFilter.supportingStat = filters.supportingStats[0];
    if(!foundPeriod) validatedFilter.period = filters.periods[0];

    return validatedFilter;
}

/*
    When we select alt projection we have to ensure the correct periods pop up
        - (So if its a demon then then we probably will not have a "Q1")
*/
export const getNewStatsForFilters = (
    showAllStats: boolean, projections: Projection[],
    filter: Filter, filters: Filters, league: string
): Filters => {
    let newFilters = filters;

    if(!showAllStats && projections.length > 0) { /* Game */
        const periods: string[] = Array.from(
            new Set(
                projections
                    .filter((proj) => proj.name === filter.stat)
                    .map((proj) => proj.period)
            )
        );
        
        newFilters.periods = organizePeriods(periods);
        newFilters.stats = getProjectionStats(projections, league);
    } else { /* No Game */
        newFilters.periods = PSport.getAllPeriods('nba');
        newFilters.stats = PSport.getAllPickedStats('nba');
    }

    return newFilters;
}
const organizePeriods = (arr: string[]): string[] => {
    const order = ['All', 'H1', 'H2', 'Q1', 'Q2', 'Q3', 'Q4'];

    return arr.sort((a, b) => {
        return order.indexOf(a) - order.indexOf(b);
    });
}

export const getProjectionStats = (projections:Projection[], league: string): string[] => {
    const statsInProjections: string[] = [];
    const stats = PSport.getAllPickedStats('nba');

    projections.forEach((proj) => {
        const foundProjStat = stats.find(s => s === proj.name);

        if(foundProjStat){
            statsInProjections.push(foundProjStat);
        }
    })

    return PSport.sortStats(league, statsInProjections);
}