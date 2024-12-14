/*
    Player
        - Has the pic and avg stats BUT MOST IMPORTANT it has the match ids played

    Game
        - Has the the match data and player stats
        - From these player stats you have to find the player again and return it. Is confusing since this player is a diff
            type from the PlayerType
*/

export type PlayerType = {
    name: string, //Either the gamername or full name
    playerId: string,
    team: string,
    sport: string
}
export type PPlayer = PlayerType & {
    city: string,
    position: string,
}
export type TrendingPlayer = PlayerType & {
    oppTeam: string,
    date: string,
    tournament: string
}

export type Game = {
    team1: string,
    team2: string,
    url: string,
    date: string
}
export type EGame = Game & {
    maps: {
        map: string,
        didPlay: boolean,
        players: {
            name: string,
            team: string,
            stats: {name: string, count: number}[]
        }[]
    }[]
}
export type PGame = Game & {
    score: string,
    players : PGamePlayer[]
}
export type PGamePlayer =  {
    name: string,
    team: string,
    position? :string,
    playerId: string,
    periods: {name: string, value: number}[][]
}

/* */
export type WNBAPlayer = PlayerType & {
    city: string;
    abbr: string;
    position: string;
    number: string;
    ppg: number;
    rpg: number;
    apg: number;
};
export type WNBAGame = {
    url: string,
    date: string,
    team1: string,
    team2: string,
    actions: [],
    id: string,
    players: WNBAGamePlayer[]
};
export type WNBAGamePlayer = {
    playerNameI: string,
    stats: {
        "PTS": number, "REB": number, "AST":number,
        "STL": number, "BLK": number, "TO": number, "PF": number,
        "FGM":  number, "FGA": number,
        "3PM": number, "3PA": number, 
        "FTM": number, "FTA": number,
    }[];
}

export type ValorantPlayer = PlayerType & {
    gameUrls: string[],
    teams: string[],
}
export type ValorantGame = {
    url: string,
    team1: string,
    team2: string,
    date: string,
    maps: ValorantMap[]
}
export type ValorantMap = {
    map: string,
    players: {
        name: string,
        kills: number,
        deaths: number,
        assists: number,
        firstKills: number,
        firstDeaths: number
    }[],
    didPlay: boolean
}

export type LolPlayer = PlayerType & {
    id: string,
    kills: string,
    deaths: string,
    assists: string,
}
export type LolGame = {
    champion: {name: string, number: string},
    url: string,
    scores: string[],
    date: string,
    tournament: string,
    game: string,
}
// champion: { name: 'KSante', number: '162' },
// result: 'Defeat',
// score: ['0/4/3', '3/3/3'],
// date: '2024-06-15',
// game: 'Cloud9 vs Dignitas',
// tournament: 'LCS Summer 2024''

export type CSPlayer = PlayerType & {
    teams: string[]
}
export type CSGame = {
    url: string,
    team1: string,
    team2: string,
    date: string,
    maps: {
        didPlay: boolean,
        map: string,
        players: CSGamePlayer[]
    }[],
}
export type CSGamePlayer = {
    name: string,
    kills: string,
    headshots: string
    deaths: string,
    assists: string,
    teams: string[],
}

export type RainbowPlayer = PlayerType & {
    teams: string[]
}
export type RainbowGame = {
    url: string,
    team1: string,
    team2: string,
    date: string,
    maps: {
        didPlay: boolean,
        players: RainbowGamePlayer[]
    }[],
}
export type RainbowGamePlayer = {
    name: string,
    kills: string,
    deaths: string,
    team: string
}