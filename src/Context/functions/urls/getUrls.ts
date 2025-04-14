import { PPlayer, Team } from "../../Types/PlayerTypes";

export const getHeadshotUrl = (player: PPlayer): string => {
    if(player.sport === 'nba'){
        return `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`;
    } else if(player.sport === 'mlb'){
        return 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/42409.png&w=350&h=254'
        // return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${player.playerId}/headshot/67/current`;
    }

    return '';
}

export const getTeamUrl = (team: Team): string => {
    if(team.league === 'nba') 
        return `https://cdn.nba.com/logos/nba/${team.id}/primary/L/logo.svg`;
    else if(team.league === 'mlb'){
        return `//www.mlbstatic.com/team-logos/team-cap-on-dark/${team.id}.svg`;
    }
    return '';
}