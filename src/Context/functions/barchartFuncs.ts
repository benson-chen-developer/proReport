import { BarData } from "../../components/Outlier/Matches";

/*
    We find the min and max valeus (tallest and shortest bars) and gave it some space
        - Make sure these two numbers get turned to an even number so the ticks in
        between will be whole numbers and not decimals
*/
export const getBarChartTicks = (data: BarData[], refLineAmt: number): number[] => {
    const roundToEven = (num: number, direction: 'ceil' | 'floor') => {
        const rounded = direction === 'ceil' ? Math.ceil(num) : Math.floor(num);
        return rounded % 2 === 0 ? rounded : rounded + (direction === 'ceil' ? 1 : -1);
    };

    const middlePart = Math.round(Math.max(...data.map(d => d.stat1), refLineAmt));
    const yAxisMax = roundToEven(middlePart * 1.2, 'ceil');
    const yAxisMin = roundToEven(Math.min(...data.map(d => d.stat1)) * 0.8, 'floor');
    const minMaxDifference = yAxisMax - yAxisMin;
    const tickAmount = minMaxDifference !== 0 ? Math.round(minMaxDifference / 4) : 1;
    const ticks = [];
    for (let value = yAxisMin; value <= yAxisMax; value += tickAmount) {
        ticks.push(value);
    }

    return ticks.length > 1 ? ticks : [0, 1, 2];
}