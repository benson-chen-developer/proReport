/* Param: 0 = short, 1 = med, 2 = long */
export const convertNBATeamName = (teamName: string, param: number): string => {
    let str = teamName.toLowerCase();
    
    if (str === 'detroit pistons' || str === 'det') {
        if (param === 0) return "DET";
        else if (param === 1) return "Detroit";
        else if (param === 2) return "Detroit Pistons";
    } else if (str === 'indiana pacers' || str === 'ind') {
        if (param === 0) return "IND";
        else if (param === 1) return "Indiana";
        else if (param === 2) return "Indiana Pacers";
    } else if (str === 'charlotte hornets' || str === 'cha') {
        if (param === 0) return "CHA";
        else if (param === 1) return "Charlotte";
        else if (param === 2) return "Charlotte Hornets";
    } else if (str === 'boston celtics' || str === 'bos') {
        if (param === 0) return "BOS";
        else if (param === 1) return "Boston";
        else if (param === 2) return "Boston Celtics";
    } else if (str === 'new york knicks' || str === 'nyc' || str === 'nyk') {
        if (param === 0) return "NYK";
        else if (param === 1) return "New York";
        else if (param === 2) return "New York Knicks";
    } else if (str === 'atlanta hawks' || str === 'atl') {
        if (param === 0) return "ATL";
        else if (param === 1) return "Atlanta";
        else if (param === 2) return "Atlanta Hawks";
    } else if (str === 'brooklyn nets' || str === 'bkn') {
        if (param === 0) return "BKN";
        else if (param === 1) return "Brooklyn";
        else if (param === 2) return "Brooklyn Nets";
    } else if (str === 'miami heat' || str === 'mia') {
        if (param === 0) return "MIA";
        else if (param === 1) return "Miami";
        else if (param === 2) return "Miami Heat";
    } else if (str === 'orlando magic' || str === 'orl') {
        if (param === 0) return "ORL";
        else if (param === 1) return "Orlando";
        else if (param === 2) return "Orlando Magic";
    } else if (str === 'philadelphia 76ers' || str === 'phi') {
        if (param === 0) return "PHI";
        else if (param === 1) return "Philadelphia";
        else if (param === 2) return "Philadelphia 76ers";
    } else if (str === 'washington wizards' || str === 'was') {
        if (param === 0) return "WAS";
        else if (param === 1) return "Washington";
        else if (param === 2) return "Washington Wizards";
    } else if (str === 'chicago bulls' || str === 'chi') {
        if (param === 0) return "CHI";
        else if (param === 1) return "Chicago";
        else if (param === 2) return "Chicago Bulls";
    } else if (str === 'cleveland cavaliers' || str === 'cle') {
        if (param === 0) return "CLE";
        else if (param === 1) return "Cleveland";
        else if (param === 2) return "Cleveland Cavaliers";
    } else if (str === 'milwaukee bucks' || str === 'mil') {
        if (param === 0) return "MIL";
        else if (param === 1) return "Milwaukee";
        else if (param === 2) return "Milwaukee Bucks";
    } else if (str === 'toronto raptors' || str === 'tor') {
        if (param === 0) return "TOR";
        else if (param === 1) return "Toronto";
        else if (param === 2) return "Toronto Raptors";
    } else if (str === 'dallas mavericks' || str === 'dal') {
        if (param === 0) return "DAL";
        else if (param === 1) return "Dallas";
        else if (param === 2) return "Dallas Mavericks";
    } else if (str === 'denver nuggets' || str === 'den') {
        if (param === 0) return "DEN";
        else if (param === 1) return "Denver";
        else if (param === 2) return "Denver Nuggets";
    } else if (str === 'golden state warriors' || str === 'gsw') {
        if (param === 0) return "GSW";
        else if (param === 1) return "Golden State";
        else if (param === 2) return "Golden State Warriors";
    } else if (str === 'houston rockets' || str === 'hou') {
        if (param === 0) return "HOU";
        else if (param === 1) return "Houston";
        else if (param === 2) return "Houston Rockets";
    } else if (str === 'la clippers' || str === 'lac' || str === 'clippers') {
        if (param === 0) return "LAC";
        else if (param === 1) return "Los Angeles Clippers";
        else if (param === 2) return "Los Angeles Clippers";
    } else if (str === 'los angeles lakers' || str === 'lal' || str === 'lakers') {
        if (param === 0) return "LAL";
        else if (param === 1) return "Los Angeles Lakers";
        else if (param === 2) return "Los Angeles Lakers";
    } else if (str === 'memphis grizzlies' || str === 'mem') {
        if (param === 0) return "MEM";
        else if (param === 1) return "Memphis";
        else if (param === 2) return "Memphis Grizzlies";
    } else if (str === 'minnesota timberwolves' || str === 'min') {
        if (param === 0) return "MIN";
        else if (param === 1) return "Minnesota";
        else if (param === 2) return "Minnesota Timberwolves";
    } else if (str === 'new orleans pelicans' || str === 'nop' || str === 'pelicans') {
        if (param === 0) return "NOP";
        else if (param === 1) return "New Orleans";
        else if (param === 2) return "New Orleans Pelicans";
    } else if (str === 'oklahoma city thunder' || str === 'okc') {
        if (param === 0) return "OKC";
        else if (param === 1) return "Oklahoma City";
        else if (param === 2) return "Oklahoma City Thunder";
    } else if (str === 'phoenix suns' || str === 'phx') {
        if (param === 0) return "PHX";
        else if (param === 1) return "Phoenix";
        else if (param === 2) return "Phoenix Suns";
    } else if (str === 'portland trail blazers' || str === 'por') {
        if (param === 0) return "POR";
        else if (param === 1) return "Portland";
        else if (param === 2) return "Portland Trail Blazers";
    } else if (str === 'sacramento kings' || str === 'sac') {
        if (param === 0) return "SAC";
        else if (param === 1) return "Sacramento";
        else if (param === 2) return "Sacramento Kings";
    } else if (str === 'san antonio spurs' || str === 'sas') {
        if (param === 0) return "SAS";
        else if (param === 1) return "San Antonio";
        else if (param === 2) return "San Antonio Spurs";
    } else if (str === 'utah jazz' || str === 'uta') {
        if (param === 0) return "UTA";
        else if (param === 1) return "Utah";
        else if (param === 2) return "Utah Jazz";
    } 

    return '';
}

export const convertTime = (timeStr: string, option: 'Day' | 'Time'): string => {
    let time = new Date(timeStr);

    if(option === "Day"){
        if (
            time.getFullYear() === time.getFullYear() &&
            time.getMonth() === time.getMonth() &&
            time.getDate() === time.getDate()
        ) {
            return "Today";
        } else {
            return time.toLocaleDateString(undefined, { weekday: 'long' });
        }
        
    } else {
        let formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        formattedTime = formattedTime.replace(/^0/, '');
        return formattedTime;
    }
}