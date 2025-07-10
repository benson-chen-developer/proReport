import { PPlayer, Team } from "../../Types/PlayerTypes";

export const getHeadshotUrl = (player: PPlayer): string => {
    let league = player.sport.toLowerCase();
    console.log(player)

    if(league === 'nba'){
        return `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`;
    } else if(league === 'mlb'){
        if(player.picId.includes("https://a.espncdn.com")){
            return player.picId;
        }
        // return `https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/${player.picId}.png`
    }

    return '/placeholder/placeHolderHeadshot.svg';
}

export const getTeamUrl = (team: Team): string => {
    if(team.league === 'nba') 
        return `https://cdn.nba.com/logos/nba/${team.id}/primary/L/logo.svg`;
    else if(team.league === 'mlb'){
        return `//www.mlbstatic.com/team-logos/team-cap-on-dark/${team.id}.svg`;
    }
    return '';
}