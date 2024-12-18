import { BarData, Filter, Filters, MatchUp } from "../../components/Outlier/Matches";
import { PGame, PPlayer } from "../PlayerTypes";

export const parseBarData = (games: PGame[], filter: Filter, player: PPlayer, matchUp: MatchUp, pickedStat: string): BarData[] => {
    let oppTeam = '';
    if(matchUp.teams.length > 0){
        player.city.toLowerCase() === matchUp.teams[0].toLowerCase() 
            ? matchUp.teams[1].toLowerCase() 
            : matchUp.teams[0].toLowerCase();
    }

    const displayedGames = getDisplayGames(games, filter, oppTeam, player.city);
    const data = displayedGames.map((game, index) => { 
        const date = new Date(game.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
        const opp: string = game.team1 === player.team ? game.team2 : game.team1;
        const against = game.team1 === player.team ? '@' : 'vs';
        const foundPlayer = game.players.find(p => p.name.toLowerCase() === player.name.toLowerCase());
        
        /* If we have multiple stats to display in one bar (PTS+REB are an example) */
        let statTotal: number = 0;
        let stats: number[] = [0, 0, 0];
        
        let periods = [0, 1, 2, 3];
        if(filter.period === "H1") periods = [0, 1];
        else if(filter.period === "H2") periods = [2, 3];
        else if(filter.period === "Q1") periods = [0];
        else if(filter.period === "Q2") periods = [1];
        else if(filter.period === "Q3") periods = [2];
        else if(filter.period === "Q4") periods = [3];

        for (let period of periods){
            let pickedStats = pickedStat.split('+');

            pickedStats.forEach((pickedStatSegment, index) => {
                const val = foundPlayer?.periods[period].find(stat => stat.name === pickedStatSegment)?.value || 0;
                let statVal = val === -1 ? 0 : val;

                statTotal += statVal;
                stats[index] += statVal;
            })
        }
    
        let pickedStatSplit = pickedStat.split('+');
        return {
            name: pickedStat, 
            statTotal: parseFloat(statTotal.toFixed(1)),
            stat1: parseFloat(stats[0].toFixed(1)), 
            stat2: parseFloat(stats[1].toFixed(1)),
            stat3: parseFloat(stats[2].toFixed(1)),
            stat1Text: stats[0] > 0 ? `${pickedStatSplit[0]} ${stats[0]}` : '',
            stat2Text: stats[1] > 0 ? `${pickedStatSplit[1]} ${stats[1]}` : '',
            stat3Text: stats[2] > 0 ? `${pickedStatSplit[2]} ${stats[2]}` : '',
            date: date, 
            score: game.score,
            against: against,
            opp: opp,
            hit: stats[0] >= 25.5, /* What is this hit thing */
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

/*
    We find the min and max valeus (tallest and shortest bars) and gave it some space
        - Make sure these two numbers get turned to an even number so the ticks in
        between will be whole numbers and not decimals
        - Since the max and min are even values we can split them up evenly into 4 parts
*/
export const getBarChartTicks = (data: BarData[], refLineAmt: number): number[] => {
    const roundToEven = (num: number, direction: 'ceil' | 'floor') => {
        const rounded = direction === 'ceil' ? Math.ceil(num) : Math.floor(num);
        return rounded % 2 === 0 ? rounded : rounded + (direction === 'ceil' ? 1 : -1);
    };

    const maxData = Math.max(...data.map(d => d.statTotal));
    const minData = Math.min(...data.map(d => d.statTotal));

    const middlePart = Math.round(Math.max(maxData, refLineAmt));
    const yAxisMax = roundToEven(middlePart * 1.2, 'ceil');
    const yAxisMin = roundToEven(minData * 0.8, 'floor');

    const minMaxDifference = yAxisMax - yAxisMin;
    const tickAmount = minMaxDifference !== 0 ? Math.round(minMaxDifference / 4) : 1;
    const ticks = [];
    for (let value = yAxisMin; value <= yAxisMax; value += tickAmount) {
        ticks.push(value);
    }

    return ticks.length > 1 ? ticks : [0, 1, 2];
}