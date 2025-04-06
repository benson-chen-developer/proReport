
/*
    Return if the user checked in or not
        - Check in is every 1:15 AM (That's when we grab new games and players)

    - dailyCheckIn looks like
        {
            "league": "time"
        }

    - Add leagues to it depending on the league param so it won't off the bat have every league only 
    the ones neeeded
*/

export const dailyCheckIn = (league: string): boolean => {
    const checkInTimeUnParsed = localStorage.getItem("dailyCheckIn");
    const now = new Date();
    const oneAM = new Date(now);
    oneAM.setHours(1, 0, 0, 0); // Set to 1 AM today

    let checkInData: Record<string, string> = {};

    /* No check-in found, set new one */
    if (!checkInTimeUnParsed || typeof checkInTimeUnParsed === "string") {
        localStorage.setItem("dailyCheckIn", JSON.stringify({
            [league] : now.toISOString()
        }));
        return false;
    }

    const checkInTime = JSON.parse(checkInTimeUnParsed);
    const lastCheckIn = new Date(checkInTime[league]);
    
    /* This specific league has never checked in */
    if(!lastCheckIn){
        checkInData[league] = now.toISOString();
        localStorage.setItem("dailyCheckIn", JSON.stringify(checkInData));
        return false;
    }

    // If past 1 AM and last check-in was over 24 hours ago, reset check-in
    const diffHours = (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);
    if (now >= oneAM && diffHours >= 24) {
        checkInData[league] = now.toISOString();
        localStorage.setItem("dailyCheckIn", JSON.stringify(checkInData));

        return false; // We haven't checked in today
    }

    return true;
}