
/* Will turn AST into Asist */
export const convertStatName = (league: string, shortName?: string): string => {
    if(!shortName) return '';
    
    const stats = shortName.split('+');
  
    const statMap: Record<string, Record<string, string>> = {
      nba: {
        PTS: 'Points',
        FAN: 'Fantasy Score',
        REB: 'Rebounds',
        ORB: 'Offensive Rebounds',
        DRB: 'Defensive Rebounds',
        AST: 'Assists',
        BLK: 'Blocks',
        STL: 'Steals',
        PF: 'Fouls',
        TOV: 'Turnovers',
        FGM: 'Field Goals Made',
        '3PM': '3 Pointers Made',
        FTM: 'Free Throws Made',
        FGA: 'Field Goals Attempted',
        '3PA': '3 Pointers Attempted',
        FTA: 'Free Throws Attempted',
      },
      mlb: {
        HR: 'Home Runs',
        H: 'Hits',
        TB: 'Total Bases',
        AB: 'At Bats',
        R: 'Runs',
        RBI: 'Runs Batted In',
        BB: 'Walk',
        SO: 'Strikeouts',
        SB: 'Stolen Bases',
        '1B': 'Single',
        '2B': 'Double',
        '3B': 'Triple',
        K: 'Strikeouts',
        RA: 'Runs Allowed',
        ER: 'Earned Runs',
        HA: 'Hits Allowed',
      },
    };
  
    const map = statMap[league.toLowerCase()] || {};
  
    const longStats = stats.map((s) => map[s] || s); // fallback to original if not found
  
    return longStats.join(' + ');
  };
  

/* 
    Converting the long name stat to short 

    - full is for returning values that have other values in it
    ex) Reb => ORB+DRB
*/
export const convertSupportName = (stat: string, full?: boolean): string => {
    if(stat === 'Minutes') return 'MIN'
    else if(stat === 'Fouls') return 'PF'
    else if(stat === 'Field Goals Att.') return 'FGA'
    else if(stat === 'OFF/DEF Rebounds') return 'REB';

    // if(full){
    //     else return '';
    // } else {
    //     return stat;
    // }
    return '';
}