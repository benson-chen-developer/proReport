
/* Will turn AST into Asist */
export const convertStatName = (shortName:string):string => {
    let stats = shortName.split('+');

    let longStats = stats.map((s) => {
        if(s === 'PTS') return 'Points';
        else if(s === "FAN") return "Fantasy Score";
        else if(s === 'REB') return 'Rebounds';
        else if(s === 'ORB') return 'Offensive Rebounds';
        else if(s === 'DRB') return 'Defensive Rebounds';
        else if(s === 'AST') return 'Asissts';
        else if(s === 'BLK') return 'Blocks';
        else if(s === 'STL') return 'Steals';
        else if(s === 'PF') return 'Fouls';
        else if(s === 'TOV') return 'Turnovers';
        else if(s === 'FGM') return 'Field Goals Made';
        else if(s === '3PM') return '3 Pointers Made';
        else if(s === 'FTM') return 'Free Throws Made';
        else if(s === 'FGA') return 'Field Goals Attempted';
        else if(s === '3PA') return '3 Pointers Attempted';
        else if(s === 'FTA') return 'Free Throws Attempted';
    })

    
    return longStats.join('+');
}

/* 
    Converting the long name stat to short 

    - full is for returning values that have other values in it
    ex) Reb => ORB+DRB
*/
export const convertSupportName = (stat: string, full?: boolean): string => {
    if(stat === 'Minutes') return 'MIN'
    else if(stat === 'Fouls') return 'PF'
    else if(stat === 'Field Goals Att.') return 'FGA'
    else if('OFF/DEF Rebounds') return 'REB';

    // if(full){
    //     else return '';
    // } else {
    //     return stat;
    // }
    return '';
}