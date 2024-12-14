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

/* Param: 0 = short, 1 = med, 2 = long */
export const convertNBATeamName = (teamName: string, param: number): string => {
    let str = teamName.toLowerCase();
    
    if(str.includes('detroit') || str.includes('pistons')){
        if(param === 0) return "DET";
        else if(param === 1) return "Detroit";
        else if(param === 2) return "Detroit Pistons";
    }
    else if(str.includes('indiana') || str.includes('pacers')){
        if(param === 0) return "IND";
        else if(param === 1) return "Indiana";
        else if(param === 2) return "Indiana Pacers";
    }

    return '';
}