export const getNBATeamEmoji = (teamName: string): string => {
    let str = teamName.toLowerCase();
    
    if(str.includes('detroit') || str.includes('pistons')){
        return 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg';
    }
    else if(str.includes('indiana') || str.includes('pacers')){
        return 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg';
    }

    return '';
}