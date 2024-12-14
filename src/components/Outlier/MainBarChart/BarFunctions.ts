import { PGame, PlayerType, PPlayer } from "../../../Context/PlayerTypes";
import { BarData, Filter, Filters, MatchUp } from "../Matches";

export const parseBarData = (games: PGame[], filter: Filter, player: PPlayer, matchUp: MatchUp): BarData[] => {
    const oppTeam = player.city.toLowerCase() === matchUp.teams[0].toLowerCase() ? matchUp.teams[1].toLowerCase() : matchUp.teams[0].toLowerCase();

    const displayedGames = getDisplayGames(games, filter, oppTeam, player.city);
    const data = displayedGames.map((game, index) => { 
        const date = new Date(game.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
        const opp: string = game.team1 === player.team ? game.team2 : game.team1;
        const against = game.team1 === player.team ? '@' : 'vs';
        const foundPlayer = game.players.find(p => p.name.toLowerCase() === player.name.toLowerCase());
        let stat = 0;
        
        let periods = [0, 1, 2, 3];
        if(filter.period === "H1") periods = [0, 1];
        else if(filter.period === "H2") periods = [2, 3];
        else if(filter.period === "Q1") periods = [0];
        else if(filter.period === "Q2") periods = [1];
        else if(filter.period === "Q3") periods = [2];
        else if(filter.period === "Q4") periods = [3];

        for (let period of periods){
            let pickedStats = filter.stat.split('+');
            pickedStats.forEach((pickedStatSegment) => {
                const val = foundPlayer?.periods[period].find(stat => stat.name === pickedStatSegment)?.value || 0;
                stat += val === -1 ? 0 : val
            })
        }
    
        return {
            name: filter.stat, 
            stat1: stat, 
            stat2: -1,
            stat3: -1,
            date: date, 
            score: game.score,
            against: against,
            opp: opp,
            hit: stat >= 25.5,
            underText: `${date}\n ${against} ${opp}`
        };
    }).reverse();

    return data;
}

export const getDisplayGames = (allGames: PGame[], filter: Filter, oppTeam: string, playerCity: string): PGame[] => {
    let displayedGames: PGame[] = [];
    
    let homeGames = allGames.filter(game => game.team1 === playerCity);
    let awayGames = allGames.filter(game => game.team2 === playerCity);
    if(filter.isHome) displayedGames.push(...homeGames);
    if(filter.isAway) displayedGames.push(...awayGames);
    
    if(filter.lastGame[0] === "L"){
        let length = Number(filter.lastGame.slice(1, filter.lastGame.length));
        displayedGames = displayedGames.slice(-length);
    }
    else if(filter.lastGame === "H2H"){
        displayedGames = displayedGames.filter(game => game.team1 === oppTeam || game.team2 === oppTeam);
    }

    return displayedGames;
}

export const updateFilters = (filters: Filters, filter: Filter): Filters => {
    let updatedFilters = {
        ...filters, 
        supportingStats: ["Minutes", "Fouls"],
    };
    if(filter.stat.includes("PTS")){
        updatedFilters.supportingStats.push(...["Field Goals Att."])
    }
    else if(filter.stat.includes("REB")){
        updatedFilters.supportingStats.push(...["Potential Rebound", "OFF/DEF Rebounds"])
    }
    else if(filter.stat.includes("AST")){
        updatedFilters.supportingStats.push(...["Potential Assists"])
    }

    return updatedFilters;
}