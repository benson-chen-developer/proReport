
const nbaColors: Record<string, string> = {
    "boston celtics": "#3E7A58",
    "brooklyn nets": "#FFFFFF",
    "new york knicks": "#F48328",
    "philadelphia 76ers": "#0369B4",
    "toronto raptors": "#F00A3F",
  
    "chicago bulls": "#F00A3F",
    "cleveland cavaliers": "#CC9659",
    "detroit pistons": "#00408D",
    "indiana pacers": "#FFBC0E",
    "milwaukee bucks": "#004C26",
  
    "denver nuggets": "#FFC600",
    "minnesota timberwolves": "#266092",
    "oklahoma city thunder": "#FF381C",
    "portland trail blazers": "#FF373C",
    "utah jazz": "#FBE123",
  
    "golden state warriors": "#E4AE12",
    "los angeles lakers": "#512683",
    "la clippers": "#3F0F6C",
    "phoenix suns": "#FF6011",
    "sacramento kings": "#6D348A",
  
    "atlanta hawks": "#E9082A",
    "charlotte hornets": "#01798D",
    "miami heat": "#B3012B",
    "washington wizards": "#01275D",
    "orlando magic": "#0078C4",
  
    "dallas mavericks": "#0063B5",
    "memphis grizzlies": "#4F77AC",
    "houston rockets": "#000000",
    "new orleans pelicans": "#B18A54",
    "san antonio spurs": "#C1CFD5",
};
  
const mlbColors: Record<string, string> = {
    "arizona diamondbacks": "#A71930", // Sedona Red
    "atlanta braves": "#CE1141",       // Scarlet Red
    "baltimore orioles": "#DF4601",    // Orange
    "boston red sox": "#BD3039",       // Red
    "chicago cubs": "#0E3386",         // Blue
    "chicago white sox": "#27251F",    // Black
    "cincinnati reds": "#C6011F",      // Red
    "cleveland guardians": "#E31937",  // Red
    "colorado rockies": "#33006F",     // Purple
    "detroit tigers": "#0C2340",       // Navy Blue
    "houston astros": "#EB6E1F",       // Orange
    "kansas city royals": "#004687",   // Royal Blue
    "los angeles angels": "#BA0021",   // Red
    "los angeles dodgers": "#005A9C",  // Dodger Blue
    "miami marlins": "#00A3E0",        // Blue
    "milwaukee brewers": "#12284B",    // Navy Blue
    "minnesota twins": "#002B5C",      // Navy Blue
    "new york mets": "#002D72",        // Blue
    "new york yankees": "#132448",     // Navy Blue
    "oakland athletics": "#003831",    // Green
    "philadelphia phillies": "#E81828",// Red
    "pittsburgh pirates": "#000000",   
    "san diego padres": "#2F241D",     // Brown
    "san francisco giants": "#FD5A1E", // Orange
    "seattle mariners": "#005C5C",     // Teal
    "st. louis cardinals": "#C41E3A",  // Red
    "tampa bay rays": "#092C5C",       // Navy Blue
    "texas rangers": "#003278",        // Blue
    "toronto blue jays": "#134A8E",    // Blue
    "washington nationals": "#AB0003"  // Red
};
  
const leagueColorMap: Record<string, Record<string, string>> = {
    nba: nbaColors,
    mlb: mlbColors
};
  
export const teamColors = (league: string, name: string): string => {
    const lowerName = name.toLowerCase();
    
    return leagueColorMap[league]?.[lowerName] ?? "#000000"; // default to black
};
