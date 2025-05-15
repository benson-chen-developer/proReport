import { Filter } from "../../components/Outlier/Matches"
import { MatchUp } from "./Match"
import { PPlayer } from "./PlayerTypes"

export type Projection = {
    sportsbook: string,
    name: string,
    period: string,
    player: PPlayer,
    values: number[],
    league: string,
    discount?: number, 
    updated_ats: string[],
    start_time: string,
    odds: number,
    overUnder: number,
    popularGameFilter?: Filter,
    popularHits?: string[], /* 'hit' | 'miss' | 'tie' */
}

export type PopularProp = {
    matchUp: MatchUp,
    propRef: Projection,
    start_time: Date,
    popularGameFilter: {
        stat: string,
        over: boolean,
        isHome: boolean,
        isAway: boolean,
        period: string,
        lastGame: string, 
        withOutPlayers: string[],
        daysRested: number,
        minutes: [number, number],
        supportingStat: string
    },
    popularHits: string[],
}