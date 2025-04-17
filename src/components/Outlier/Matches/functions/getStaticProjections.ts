import { PPlayer } from "../../../../Context/Types/PlayerTypes";
import { Projection } from "../../../../Context/Types/ProjectionTypes";
import { PSport } from "../../../Player/SportClass/Psport";

export const getStaticProjections = (leagueStr: string, player: PPlayer): Projection[] => {
    const league = leagueStr.toLowerCase();
    const staticProjections: Projection[] = [];
    const defaultProjection = {
        sportsbook: 'ProReport',
        name: '',
        period: "All",
        player: player,
        values: [0],
        updated_ats: [],
        start_time: "",
        odds: 100,
        overUnder: 3,
        popularGameFilter: {},
        popularHits: [], 
    }

    // if(league === "nba"){
        // }
        // else if(league === "mlb"){
            
        // }
    const stats = PSport.getAllPickedStats(league);
    const periods = PSport.getAllPeriods(league);

    periods.forEach((period) => {
        stats.forEach((stat) => (
            staticProjections.push({
                ...defaultProjection, name: stat, period: period
            })
        ))
    })
        
    return staticProjections;
}