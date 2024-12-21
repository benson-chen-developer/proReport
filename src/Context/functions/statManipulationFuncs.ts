import { PGamePlayer } from "../PlayerTypes";

export const addUpStat = (pickedStats: string[], player: PGamePlayer) => {
    pickedStats.forEach((pickedStatSegment, index) => {
        // const val = foundPlayer?.periods[period].find(stat => stat.name === pickedStatSegment)?.value || 0;
        const val = player?.periods[period][pickedStatSegment]!;
        let statVal = val === -1 ? 0 : val;

        statTotal += statVal;
        stats[index] += statVal;
    })
}