import { NextRouter } from "next/router";
import { Projection } from "../../../../Context/Types/ProjectionTypes";
import { Filter } from "../../Matches";

export const getInitialProjection = (
    projections: Projection[], router: NextRouter
): Projection => {
    let initalPickedProjection = null;
    const {propName, propValue, period} = router.query;
      

    if(propName && propValue && period) {  /* If there is a filter in the url */
        const foundProp = projections.find(p => 
            p.values[p.values.length-1] === Number(propValue) &&
            p.period === period &&
            p.name === propName
        );
        if(foundProp) initalPickedProjection = foundProp;
    } 

    if(!initalPickedProjection){
        initalPickedProjection = projections[0];
    }

    return initalPickedProjection;
}

/* Will return default filter or filter with values if the url has queries */
export const addCustomUrlParams = (initialFilter: Filter, router: NextRouter): Filter => {
    let newFilter = {...initialFilter};

    const {lastGame, isHome, isAway } = router.query;
 
    if(lastGame) initialFilter.lastGame = lastGame as string;
    if(isHome) initialFilter.isHome = true;
    else if(isAway) initialFilter.isHome = true;

    return newFilter
}