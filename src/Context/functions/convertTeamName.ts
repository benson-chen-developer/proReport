/* Param: 0 = short, 1 = med, 2 = long */
export const convertTeamName = (teamName: string, param: number, leagueParam: string): string => {
    let str = teamName.toLowerCase();
    let league = leagueParam.toLowerCase();
    
    if (league === 'nba') {
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
    }
    else if (league === 'mlb') {
        if (str === 'arizona diamondbacks' || str === 'ari') {
            if (param === 0) return "ARI";
            else if (param === 1) return "Arizona";
            else if (param === 2) return "Arizona Diamondbacks";
        } else if (str === 'atlanta braves' || str === 'atl') {
            if (param === 0) return "ATL";
            else if (param === 1) return "Atlanta";
            else if (param === 2) return "Atlanta Braves";
        } else if (str === 'baltimore orioles' || str === 'bal') {
            if (param === 0) return "BAL";
            else if (param === 1) return "Baltimore";
            else if (param === 2) return "Baltimore Orioles";
        } else if (str === 'boston red sox' || str === 'bos') {
            if (param === 0) return "BOS";
            else if (param === 1) return "Boston";
            else if (param === 2) return "Boston Red Sox";
        } else if (str === 'chicago white sox' || str === 'cws') {
            if (param === 0) return "CWS";
            else if (param === 1) return "Chicago";
            else if (param === 2) return "Chicago White Sox";
        } else if (str === 'chicago cubs' || str === 'chc') {
            if (param === 0) return "CHC";
            else if (param === 1) return "Chicago";
            else if (param === 2) return "Chicago Cubs";
        } else if (str === 'cincinnati reds' || str === 'cin') {
            if (param === 0) return "CIN";
            else if (param === 1) return "Cincinnati";
            else if (param === 2) return "Cincinnati Reds";
        } else if (str === 'cleveland guardians' || str === 'cle') {
            if (param === 0) return "CLE";
            else if (param === 1) return "Cleveland";
            else if (param === 2) return "Cleveland Guardians";
        } else if (str === 'colorado rockies' || str === 'col') {
            if (param === 0) return "COL";
            else if (param === 1) return "Colorado";
            else if (param === 2) return "Colorado Rockies";
        } else if (str === 'detroit tigers' || str === 'det') {
            if (param === 0) return "DET";
            else if (param === 1) return "Detroit";
            else if (param === 2) return "Detroit Tigers";
        } else if (str === 'houston astros' || str === 'hou') {
            if (param === 0) return "HOU";
            else if (param === 1) return "Houston";
            else if (param === 2) return "Houston Astros";
        } else if (str === 'kansas city royals' || str === 'kc') {
            if (param === 0) return "KC";
            else if (param === 1) return "Kansas City";
            else if (param === 2) return "Kansas City Royals";
        } else if (str === 'los angeles angels' || str === 'laa') {
            if (param === 0) return "LAA";
            else if (param === 1) return "Los Angeles";
            else if (param === 2) return "Los Angeles Angels";
        } else if (str === 'los angeles dodgers' || str === 'lad') {
            if (param === 0) return "LAD";
            else if (param === 1) return "Los Angeles";
            else if (param === 2) return "Los Angeles Dodgers";
        } else if (str === 'miami marlins' || str === 'mia') {
            if (param === 0) return "MIA";
            else if (param === 1) return "Miami";
            else if (param === 2) return "Miami Marlins";
        } else if (str === 'milwaukee brewers' || str === 'mil') {
            if (param === 0) return "MIL";
            else if (param === 1) return "Milwaukee";
            else if (param === 2) return "Milwaukee Brewers";
        } else if (str === 'minnesota twins' || str === 'min') {
            if (param === 0) return "MIN";
            else if (param === 1) return "Minnesota";
            else if (param === 2) return "Minnesota Twins";
        } else if (str === 'new york mets' || str === 'nym') {
            if (param === 0) return "NYM";
            else if (param === 1) return "New York";
            else if (param === 2) return "New York Mets";
        } else if (str === 'new york yankees' || str === 'nyy') {
            if (param === 0) return "NYY";
            else if (param === 1) return "New York";
            else if (param === 2) return "New York Yankees";
        } else if (str === 'athletics' || str === 'oak') {
            if (param === 0) return "OAK";
            else if (param === 1) return "Oakland";
            else if (param === 2) return "Oakland Athletics";
        } else if (str === 'philadelphia phillies' || str === 'phi') {
            if (param === 0) return "PHI";
            else if (param === 1) return "Philadelphia";
            else if (param === 2) return "Philadelphia Phillies";
        } else if (str === 'pittsburgh pirates' || str === 'pit') {
            if (param === 0) return "PIT";
            else if (param === 1) return "Pittsburgh";
            else if (param === 2) return "Pittsburgh Pirates";
        } else if (str === 'san diego padres' || str === 'sd') {
            if (param === 0) return "SD";
            else if (param === 1) return "San Diego";
            else if (param === 2) return "San Diego Padres";
        } else if (str === 'san francisco giants' || str === 'sf') {
            if (param === 0) return "SF";
            else if (param === 1) return "San Francisco";
            else if (param === 2) return "San Francisco Giants";
        } else if (str === 'seattle mariners' || str === 'sea') {
            if (param === 0) return "SEA";
            else if (param === 1) return "Seattle";
            else if (param === 2) return "Seattle Mariners";
        } else if (str === 'st. louis cardinals' || str === 'stl') {
            if (param === 0) return "STL";
            else if (param === 1) return "St. Louis";
            else if (param === 2) return "St. Louis Cardinals";
        } else if (str === 'tampa bay rays' || str === 'tb') {
            if (param === 0) return "TB";
            else if (param === 1) return "Tampa Bay";
            else if (param === 2) return "Tampa Bay Rays";
        } else if (str === 'texas rangers' || str === 'tex') {
            if (param === 0) return "TEX";
            else if (param === 1) return "Texas";
            else if (param === 2) return "Texas Rangers";
        } else if (str === 'toronto blue jays' || str === 'tor') {
            if (param === 0) return "TOR";
            else if (param === 1) return "Toronto";
            else if (param === 2) return "Toronto Blue Jays";
        } else if (str === 'washington nationals' || str === 'was') {
            if (param === 0) return "WAS";
            else if (param === 1) return "Washington";
            else if (param === 2) return "Washington Nationals";
        }
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