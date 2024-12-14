type Game = {
    team1: string,
    team2: string,
    date: string,
    url: string,
    league: string,
}

export type EGame2 = Game & {
    maps: EGameMap[]
}
export type EGameMap = {
    players: EGamePlayer[],
    score: string,
    didPlay: boolean,
    map: string,
}
export type EGamePlayer = {
    name: string,
    team: string,
    stats: Record<string, number>
}