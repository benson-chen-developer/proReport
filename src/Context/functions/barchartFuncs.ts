import { BarData, Filter, Filters, MatchUp } from "../../components/Outlier/Matches";
import { PGame, PPlayer } from "../PlayerTypes";

/*
    Takes 5.55 (5:55) + 6.21 (6:21) and spits out 12.17(12:17)
*/
export const timeAdd = (t1: number, t2: number): number => {
    const t1Min = Math.floor(t1);
    const t1Sec = t1 - t1Min;
    const t2Min = Math.floor(t2);
    const t2Sec = t2 - t2Min;

    const t3Min = t1Min + t2Min;
    
    const totalSec = t1Sec + t2Sec;
    const minutesFromSeconds = Math.floor(totalSec / 60);
    const remainingSeconds = totalSec % 60;

    return (minutesFromSeconds+t3Min) + remainingSeconds;
}

/*
    Our MIN field is stored as seconds (300 = 5 minutes)
*/
export const convertSecondsToMinutes = (totalSeconds: number): number => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return minutes + (seconds/100);
}

export const parseBarData = (games: PGame[], filter: Filter, player: PPlayer, matchUp: MatchUp, pickedStat: string): BarData[] => {
    let oppTeam = '';
    if(matchUp.teams.length > 0){
        player.city.toLowerCase() === matchUp.teams[0].toLowerCase() 
            ? matchUp.teams[1].toLowerCase() 
            : matchUp.teams[0].toLowerCase();
    }

    /* Here we filter the games from the game criteria */
    const displayedGames = getDisplayGames(games, filter, oppTeam, player);

    /* Here we get the stats from the game via criteria */
    const data = displayedGames.map((game, index) => { 
        const date = new Date(game.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
        const opp: string = game.team1 === player.team ? game.team2 : game.team1;
        const against: string = game.team1 === player.team ? '@' : 'vs';
        const foundPlayer = game.players.find(p => p.name.toLowerCase() === player.name.toLowerCase());
        
        /* If we have multiple stats to display in one bar (PTS+REB are an example) */
        let statTotal: number = 0;
        let stats: number[] = [0, 0, 0];
        
        let periods = Array.from({ length: game.periodsPlayed }, (_, index) => index);
        if(filter.period === "H1") periods = [0, 1];
        else if(filter.period === "H2") periods = periods.slice(2);
        else if(filter.period === "Q1") periods = [0];
        else if(filter.period === "Q2") periods = [1];
        else if(filter.period === "Q3") periods = [2];
        else if(filter.period === "Q4") periods = periods.slice(3);

        for (let period of periods){
            let pickedStats = pickedStat.split('+');
            // console.log(pickedStat, 'pickedStat')

            pickedStats.forEach((pickedStatSegment, index) => {
                let val = foundPlayer?.periods[period][pickedStatSegment]!;

                if(val)
                statTotal += val;
                stats[index] += val;
            })
        }
        // console.log("statTotal", statTotal)
        // console.log("parseFloat(statTotal.toFixed(1))", parseFloat(statTotal.toFixed(1)))
    
        /* 
            Convert the values to minutes if needed 
                - else just round the numbers
        */
        if(pickedStat === "MIN"){
            statTotal = convertSecondsToMinutes(statTotal);
            stats = stats.map(stat => convertSecondsToMinutes(stat));
        } else {
            statTotal = parseFloat(statTotal.toFixed(1));
            stats = stats.map(stat => Number(stat.toFixed(1)));
        }

        let pickedStatSplit = pickedStat.split('+');
        return {
            name: pickedStat, 
            statTotal: statTotal,
            stat1: stats[0], 
            stat2: stats[1],
            stat3: stats[2],
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

/* Filter the aviable games to get stats from */
export const getDisplayGames = (allGames: PGame[], filter: Filter, oppTeam: string, player: PPlayer): PGame[] => {
    let displayedGames: PGame[] = [];

    /* Get all games without these players */
    displayedGames = allGames.filter(game => 
        !game.players.some(p => filter.withOutPlayers.includes(p.name))
    );

    /* Get all games with this much rest */
    let gamesWithCorrectFilter: PGame[] = [];
    let lastDate: Date;
    displayedGames.forEach((game, i) => {
        const date = new Date(game.date);
        const dateWithTimeAsZero = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
        if (lastDate) {
            const daysRested = (lastDate.getTime() - dateWithTimeAsZero.getTime()) / (1000 * 60 * 60 * 24);
            // console.log('LAST TWO DATES', lastDate, dateWithTimeAsZero, 'daysRested', daysRested,)
            
            /* Back to back will be one day apart so -1 */
            if (daysRested-1 === filter.daysRested) {
                /* This is for making sure the inital day (Day 0) is also added */
                if(gamesWithCorrectFilter.length === 0) {
                    gamesWithCorrectFilter.push(displayedGames[i-1]);
                }
                gamesWithCorrectFilter.push(game);
                
            }
        }
    
        lastDate = dateWithTimeAsZero;
    });
    // console.log('games with days rested', gamesWithCorrectFilter)
    displayedGames = gamesWithCorrectFilter;

    /* Get all games with at least this range of minutes played */
    displayedGames = displayedGames.filter((game, index) => {
        const foundPlayer = game.players.find(p => p.name === player.name);

        if(foundPlayer){
            let totalMinutes = 0;
            foundPlayer.periods.forEach(period => {
                totalMinutes += period['MIN'];
            })
            totalMinutes = convertSecondsToMinutes(totalMinutes);

            const lower = filter.minutes[0];
            const upper = filter.minutes[1];

            return (totalMinutes >= lower && totalMinutes <= upper)
        } else {
            return false;
        }
    })
    
    /* Get all home or away games */
    if(filter.isHome && !filter.isAway) displayedGames = displayedGames.filter(game => game.team1 === player.city);
    else if(filter.isAway && !filter.isHome) displayedGames.filter(game => game.team2 === player.city);
    
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
// export const getBarChartTicks = (data: BarData[], refLineAmt: number): number[] => {
//     const roundToEven = (num: number, direction: 'ceil' | 'floor') => {
//         const rounded = direction === 'ceil' ? Math.ceil(num) : Math.floor(num);
//         return rounded % 2 === 0 ? rounded : rounded + (direction === 'ceil' ? 1 : -1);
//     };

//     const maxData = Math.max(...data.map(d => d.statTotal));
//     const minData = Math.min(...data.map(d => d.statTotal));

//     const middlePart = Math.round(Math.max(maxData, refLineAmt));
//     const yAxisMax = roundToEven(middlePart * 1.2, 'ceil');
//     const yAxisMin = roundToEven(minData * 0.8, 'floor');

//     const minMaxDifference = yAxisMax - yAxisMin;
//     const tickAmount = minMaxDifference !== 0 ? Math.round(minMaxDifference / 4) : 1;
//     const ticks = [];
//     for (let value = yAxisMin; value <= yAxisMax; value += tickAmount) {
//         ticks.push(value);
//     }

//     return ticks.length > 1 ? ticks : [0, 1, 2];
// }
const roundToEven = (num: number, direction: 'ceil' | 'floor') => {
    const rounded = direction === 'ceil' ? Math.ceil(num) : Math.floor(num);
    return rounded % 2 === 0 ? rounded : rounded + (direction === 'ceil' ? 1 : -1);
};

export const getBarChartTicks = (data: BarData[], refLineAmt: number): number[] => {
    const maxData = Math.max(...data.map(d => d.statTotal));
    const yAxisMax = roundToEven(maxData * 1.2, 'ceil');

    // Generate ticks
    const ticks: number[] = [];
    const increment = yAxisMax > 5 ? 1 : 0.5; // Use smaller increments for small ranges

    for (let tick = 0; tick <= yAxisMax; tick += increment) {
        ticks.push(tick);
    }

    return ticks.length > 1 ? ticks : [0, 1, 2];
};

export const getYAxisMax = (barData: BarData[]): number => {
    const maxData = Math.max(...barData.map(d => d.statTotal));
    const rounded = roundToEven(maxData * 1.2, 'ceil');

    if(rounded === 0) return 1;
    return rounded;
}