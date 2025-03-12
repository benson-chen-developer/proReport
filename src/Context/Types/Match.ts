import { Team } from "./PlayerTypes";

export const isSameMatchup = (m1: MatchUp, m2: MatchUp) => {
    return (
        m1.time === m2.time &&
        m1.teams[0].name === m2.teams[0].name &&
        m1.teams[1].name === m2.teams[1].name 
    )
}

export type MatchUp = {
    league: string,
    teams: Team[], 
    time: string, 
}