/* Param: 0 = short, 1 = med, 2 = long */
export const convertNBATeamName = (teamName: string, param: number): string => {
    let str = teamName.toLowerCase();
    
    if(str === 'detroit' || str === 'det'){
        if(param === 0) return "DET";
        else if(param === 1) return "Detroit";
        else if(param === 2) return "Detroit Pistons";
    }
    else if(str === 'indiana' || str === 'ind'){
        if(param === 0) return "IND";
        else if(param === 1) return "Indiana";
        else if(param === 2) return "Indiana Pacers";
    }
    else if(str === 'charlotte' || str === 'cha'){
        if(param === 0) return "CHA";
        else if(param === 1) return "Charlotte";
        else if(param === 2) return "Charlotte Hornets";
    }

    return '';
}