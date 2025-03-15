import { BarData, Filter, Filters } from "../../components/Outlier/Matches";
import { MatchUp } from "../Types/Match";
import { PGame, PPlayer } from "../Types/PlayerTypes";
import { Projection } from "../Types/ProjectionTypes";
import { convertNBATeamName } from "./convertNbaName";
import { convertSupportName } from "./convertStatName";

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

const getFantasyMap = (league: string): Record<string, number> => {
    if(league === 'nba') return {
        'PTS' : 1,
        'REB' : 1.2,
        "AST" : 1.5,
        "STL" : 3,
        "BLK" : 3,
        "TOV" : -1
    }

    return {};
}

export const parseBarData = (
    games: PGame[], filter: Filter, player: PPlayer, 
    pickedProjection?: Projection | null, matchUp?: MatchUp,
): BarData[] => {
    /* Here we filter the games from the game criteria */
    const displayedGames = getDisplayGames(games, filter, player, matchUp);
    
    /* Here we get the stats from the game via criteria */
    const data = displayedGames.map((game, index) => { 
        const unFormattedDate: Date = new Date(game.date);
        const date = `${unFormattedDate.getUTCMonth() + 1}/${unFormattedDate.getUTCDate()}`;
        
        const foundPlayer = game.players.find(p => p.name.toLowerCase() === player.name.toLowerCase());
        const playerTeam: string = foundPlayer!.team;
        const opp: string = game.team1.toLowerCase() === playerTeam.toLowerCase() ? game.team2 : game.team1;
        const isHome: boolean = game.team1 === player.team;
        
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
            let pickedStats = filter.stat.split('+');

            if(filter.stat !== "FAN"){
                pickedStats.forEach((pickedStatSegment, index) => {
                    let currPeriod = foundPlayer?.periods[period];
                    let val = currPeriod ? currPeriod[pickedStatSegment] : null;
    
                    if(val){
                        statTotal += val;
                        stats[index] += val;
                    }
                })
            } else {
                const map = getFantasyMap('nba');
                pickedStats = Object.keys(map);

                pickedStats.forEach((pickedStatSegment) => {
                    let currPeriod = foundPlayer?.periods[period];
                    let val = currPeriod ? currPeriod[pickedStatSegment] : null;

                    if(val){
                        statTotal += val * map[pickedStatSegment];
                        stats[0] += val * map[pickedStatSegment];
                    }
                })
            }
        }
    
        /* 
            Convert the values to minutes if needed 
                - else just round the numbers
        */
        if(filter.stat === "MIN"){
            statTotal = convertSecondsToMinutes(statTotal);
            stats = stats.map(stat => convertSecondsToMinutes(stat));
        } else {
            statTotal = parseFloat(statTotal.toFixed(1));
            stats = stats.map(stat => Number(stat.toFixed(1)));
        }

        let pickedStatSplit = filter.stat.split('+');
        let hit = false;
        let lineValue = -1;
        if(pickedProjection){
            lineValue = pickedProjection.values[pickedProjection.values.length-1];

            if(filter.over){
                if(statTotal >= lineValue) hit = true;
            } else {
                if(statTotal <= lineValue) hit = true;
            }
        }
        return {
            name: filter.stat, 
            statTotal: statTotal,
            stat1: stats[0], 
            stat2: stats[1],
            stat3: stats[2],
            stat1Text: pickedStatSplit[0] ? `${pickedStatSplit[0]}` : '',
            stat2Text: pickedStatSplit[1] ? `${pickedStatSplit[1]}` : '',
            stat3Text: pickedStatSplit[2] ? `${pickedStatSplit[2]}` : '',
            date: date, 
            score: game.score,
            isHome: isHome,
            playerTeam: playerTeam,
            opp: opp,
            tie: lineValue !== -1 ? statTotal === lineValue : false,
            hit: hit,
            underText: `${date}\n ${convertNBATeamName(opp, 0)}`
        };
    }).reverse();

    return data;
}

export const parseSupportBarData = (
    mainBarData: BarData[], allGames: PGame[],
    filter: Filter, player: PPlayer, 
): BarData[] => {   
    const supportBarData = mainBarData.map((barData, index) => {
        const foundGame = allGames.find((game) => {
            const dateStr = game.date;
            const date = new Date(dateStr);
            const formattedDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
            const bothTeams = [game.team1, game.team2];

            return formattedDate === barData.date && bothTeams.includes(barData.opp);
        });

        /* Getting inner stats (REB => ORB + DRB) */
        let ignoreAddingFirst = false; /* This is for REB+ORB+DRB in which case we ignore adding the REB and only the OFF/DEF to total */
        const statsThatComesWithSupportingStat = (supportingStat: string): string[] => {
            let allStatsToBeParsed: string[] = [supportingStat];
            
            if(supportingStat === 'REB'){
                allStatsToBeParsed = ['ORB', 'DRB'];
                // ignoreAddingFirst = true;
            }
            
            return allStatsToBeParsed;
        }
        const barStat = convertSupportName(filter.supportingStat);
        const allStatsToBeParsed = statsThatComesWithSupportingStat(barStat);

        let statTotal: number = 0;
        let stats: number[] = [0, 0, 0];

        /* Get which periods to parse */
        const foundPlayer = foundGame!.players.find(p => p.name.toLowerCase() === player.name.toLowerCase());
        let periods = Array.from({ length: foundGame!.periodsPlayed }, (_, index) => index);
        if(filter.period === "H1") periods = [0, 1];
        else if(filter.period === "H2") periods = periods.slice(2);
        else if(filter.period === "Q1") periods = [0];
        else if(filter.period === "Q2") periods = [1];
        else if(filter.period === "Q3") periods = [2];
        else if(filter.period === "Q4") periods = periods.slice(3);

        /* Adding up the STATS by looping through each period */
        for (let period of periods){
            allStatsToBeParsed.forEach((stat, index) => {
                let currPeriod = foundPlayer?.periods[period];
                let val = currPeriod ? currPeriod[stat] : null;

                if(val){
                    stats[index] += val;
                    // if(index === 0 && ignoreAddingFirst){
                    //     /* This is REB+ORB+DRB case */
                    // } else {
                        statTotal += val;
                    // }
                }
            })
        }

        /* Edge Case (MINUTES) convert to a number */
        if(barStat === "MIN"){
            statTotal = Math.trunc(convertSecondsToMinutes(statTotal) * 10) / 10;
            stats = stats.map(stat => convertSecondsToMinutes(stat));
        } else {
            statTotal = parseFloat(statTotal.toFixed(1));
            stats = stats.map(stat => Number(stat.toFixed(1)));
        }

        let pickedStatSplit = allStatsToBeParsed;
        return ({
            name: filter.supportingStat, 
            statTotal: statTotal,
            stat1: stats[0], 
            stat2: stats[1],
            stat3: stats[2],
            stat1Text: allStatsToBeParsed[0] ? `${allStatsToBeParsed[0]}` : '',
            stat2Text: allStatsToBeParsed[1]? `${pickedStatSplit[1]}` : '',
            stat3Text: allStatsToBeParsed[2] ? `${pickedStatSplit[2]}` : '',
            date: barData.date, 
            score: barData.score,
            isHome: barData.isHome,
            opp: barData.opp,
            playerTeam: barData.playerTeam,
            hit: barData.hit,
            tie: false,
            underText: barData.underText
        })
    });

    return supportBarData;
}

/* Filter the aviable games to get stats from */
export const getDisplayGames = (allGames: PGame[], filter: Filter, player: PPlayer, matchUp: MatchUp | undefined): PGame[] => {
    let displayedGames: PGame[] = [];

    /* Get all games without these players */
    displayedGames = allGames.filter(game => 
        !game.players.some(p => filter.withOutPlayers.includes(p.name))
    );
    /* Get all games with this much rest */
    let gamesWithCorrectFilter: PGame[] = [];
    let lastDate: Date;

    if(filter.daysRested !== -1){
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
        displayedGames = gamesWithCorrectFilter;
    }

    /* Get all games with at least this range of minutes played */
    if(!filter.minutesChecked || filter.minutes[0] > filter.minutes[1]){
        /* Skip the minutes parsing if no time is selected */
    } else {
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
    }
    
    /* Get home or away games */
    if(filter.isHome) displayedGames = displayedGames.filter(game => game.team1 === player.city);
    else if(filter.isAway) displayedGames = displayedGames.filter(game => game.team2 === player.city);

    /* Get L(*) or H2H */
    if(filter.lastGame[0] === "L"){
        let length = Number(filter.lastGame.slice(1, filter.lastGame.length));
        displayedGames = displayedGames.reverse().slice(-length).reverse();
    }
    else if(filter.lastGame === "H2H"){
        const oppTeamName = matchUp?.teams.find(team => team.name !== player.city)?.name;
        displayedGames = displayedGames.filter(game => {
            const playerTeamInThisMatch = game.players.find(p => p.name === player.name)?.team;
            const team1 = game.team1; 
            const team2 = game.team2;

            return (
                (playerTeamInThisMatch && oppTeamName) &&
                (
                    (team1 === oppTeamName && playerTeamInThisMatch !== team1) ||
                    (team2 === oppTeamName && playerTeamInThisMatch !== team2)
                )
            )
        });
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
        updatedFilters.supportingStats.push(...[/*"Potential Rebound", */"OFF/DEF Rebounds"])
    }
    else if(filter.stat.includes("AST")){
        // updatedFilters.supportingStats.push(...["Potential Assists"])
    }

    return updatedFilters;
}