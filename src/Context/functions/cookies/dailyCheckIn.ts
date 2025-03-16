
/*
    Return if the user checked in or not
        - Check in is every 1:15 AM (That's when we grab new games and players)
*/
export const dailyCheckIn = (): boolean => {
    const checkInTime = localStorage.getItem("dailyCheckIn");
    const now = new Date();
    const oneAM = new Date(now);
    oneAM.setHours(1, 0, 0, 0); // Set to 1 AM today

    /* No check-in found, set new one */
    if (!checkInTime) {
        localStorage.setItem("dailyCheckIn", now.toISOString());
        return false;
    }

    const lastCheckIn = new Date(checkInTime);
    const diffHours = (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);

    // If past 1 AM and last check-in was over 24 hours ago, reset check-in
    if (now >= oneAM && diffHours >= 24) {
        localStorage.setItem("dailyCheckIn", now.toISOString());

        return false; // We haven't checked in today
    }

    return true;
}