import { Game2, Stats } from "../functions/players";
import { mlbParsing } from "./mlbParsing";
import { wnbaParsing } from "./wnbaParsing";

export const apiUrl = "bettingnext-hioa.vercel.app";
export const gameLinks = [
    {
        name: 'WNBA', 
        link: 'https://cdn.wnba.com/static/json/liveData/playbyplay/playbyplay_urlMe.json',
        gameIds: []
    },
    {
        name: 'MLB', 
        link: 'https://www.espn.com/mlb/boxscore/_/gameId/urlMe',
        gameIds: [

        ]
    }
]

export const getPercentLoaded = async (leagueName: string) => {
    const leagues = [
        {name: 'WNBA', amount: 1.5, start: new Date('May 5th, 2024')}
    ];

}

export const betterLoadGames = async (games: Game2[], leagueName: string, startDate: Date, endDate: Date, paramName: string): Promise<Game2[]> => {
    let newGames: Game2[] = [];

    if(leagueName === 'WNBA'){
        newGames = await wnbaParsing(games, startDate, endDate, paramName);
    }
    else if(leagueName === 'MLB'){
        newGames = await mlbParsing(startDate, endDate, paramName);
    }
    
    return newGames;
}