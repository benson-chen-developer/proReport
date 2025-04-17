export type NbaStats = {
    PTS: number,
    FGA: number,
    FGM: number,
    "3PA": number,
    "3PM": number,
    FTA: number,
    FTM: number,
    REB: number,
    DRB: number,
    ORB: number,
    AST: number,
    BLK: number,
    STL: number,
    PF: number,
    TOV: number,
    MIN: number
}

export type MlbStats = {
    HR: number, //HomeRuns
    H: number, //Hits
    TB: number, //Total Bases
    AB: number, //At Bats
    R: number, // Runs
    RBI: number, //Runs Batted In (How many runs for team as well)
    BB: number, //Walk 
    SO: number, //Strikeout
    SB: number, //Stolen Base
    '1B': number, //Single
    '2B': number, //Double (2 bases on hit)
    '3B': number, //Triple (3 bases on hit)

    //Pitchers
    K: number, //Strikouts
    RA: number, //Runs Allowed
    ER: number, //Eared Runs
    HA: number, //Hits allowed
}