import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { ReferenceLine } from 'recharts';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PGame, PPlayer } from '../../Context/Types/PlayerTypes';
import { BarData, Filter } from './Matches';
import { getBarChartTicks, getYAxisMax } from '../../Context/functions/barchartFuncs';
import CustomTooltip from './CustomTooltip';
import { Projection } from '../../Context/Types/ProjectionTypes';

interface Props {
    player: PPlayer,
    barData: BarData[],

    refLineOn: boolean,
    foundProjection: Projection | undefined,
    seasonAvg: number,
    chartType: 'support' | 'main',
}

export const Bars: React.FC<Props> = ({ 
    player, barData, chartType, seasonAvg, refLineOn,
    foundProjection
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [ticks, setTicks] = useState<number[]>([]);
    const [yAxisMax, setYAxisMax] = useState<number>(0);

    const [refLineAmt, setRefLineAmt] = useState<number>(-1); /* The number the referelnce line will be at */
    // const [seasonAvg, setSeasonAvg] = useState<number>(-1);

    const [barKey, setBarKey] = useState<number>(0);
    
    const [barRadiusArr, setBarRadiusArr] = useState<[number, number, number, number][]>([
        [5, 5, 5, 5], [0, 0, 0, 0], [0, 0, 0, 0]
    ])
    const [barColorArr, setBarColorArr] = useState<string[]>([]);

    useEffect(() => {
        setLoading(true);
        /* 
            Change the radius of the bars based if we have multiple stats displayed 
                - PTS+REB ex

            - The [0] (top) is always at least [5, 5, x, x] as it is up top
            - The [2] (bottom) is always at least [x, x, 5, 5] as it is on bottom

            [x,x,x,x] = topR topL botR botL

            dataOverZero => This tells us how many diff stacked bars we have 
        */
        let dataPoint = barData[0];
        if(dataPoint){
            let dataOverZero = [dataPoint.stat1 > 0, dataPoint.stat2 > 0, dataPoint.stat3 > 0]
                .filter(isTrue => isTrue)
                .length; 

            if(dataOverZero === 1){
                setBarRadiusArr([[5, 5, 5, 5], [0, 0, 0, 0], [0, 0, 0, 0]]);
                setBarColorArr(["#79F4F4", '#79F4F4', '#79F4F4'])
            } 
            else if(dataOverZero === 2) setBarRadiusArr([[0, 0, 5, 5], [5, 5, 0, 0], [0, 0, 0, 0]])
            else {
                setBarRadiusArr([[0, 0, 5, 5], [0, 0, 0, 0], [5, 5, 0, 0]])
                setBarColorArr(['#529b9b', '#65c7c7', "#79F4F4"])
            }
        }

        /* Set the y where the reference line will be */
        let refLineAmt = -1;
        if(foundProjection) refLineAmt = foundProjection.value;
        else refLineAmt = seasonAvg
        // console.log('seasonAvg;,',seasonAvg)
        // console.log('reflie;,',refLineAmt)
        setRefLineAmt(refLineAmt);

        /* Size of the chart */
        setYAxisMax(getYAxisMax(barData))
        setTicks(getBarChartTicks(barData, refLineAmt));
        
        setLoading(false);
    }, [barData])
    // }, [seasonAvg, isAway, isHome, lastGame, period, stat])

    useEffect(() => {
        // console.log('barData', barData)
        setBarKey(prev => prev + 1);
    }, [barData]);

    interface CustomLabelProps {
        x?: number;
        y?: number;
        value?: number | string;
    }
    const CustomLabel: React.FC<CustomLabelProps> = ({ x = 0, y = 0, value }) => (
        <svg>
            <rect
                x={35}
                y={100}
                width="50"
                height="25"
                rx="12"
                strokeWidth="2"
                // fill="#8FC9F9"
            />
            <text
                x={35 + 50 / 2} // x + width
                y={100 + 25 / 2} // y + height
                fill="#fff"
                fontSize="15px"
                textAnchor="middle" // Center text horizontally
                dominantBaseline="middle" // Center text vertically
                fontWeight="bold"
            >
                {value}
            </text>
        </svg>
    );

    const AvgLabel = ({ viewBox }: any) => {
        const { x, y, width } = viewBox; // Extract coordinates and width of the chart
        return (
            <>
                {/* Avg on the left */}
                <text
                    x={x - 30} y={y + 3} 
                    fill="#fff"
                    fontSize={14}
                    fontWeight="bold"
                    textAnchor="start" 
                >
                    {refLineAmt.toFixed(1)}
                </text>
    
                {/* Avg on the right */}
                <text
                    x={width + x + 25} y={y + 3} 
                    fill="#fff"
                    fontSize={14}
                    fontWeight="bold"
                    textAnchor="end" 
                >
                    Avg
                </text>
            </>
        );
    };
    
    if(loading) return <div>Loading</div>

    if(barData.length === 0){
        return <div style={{
            color:'#fff', display:'flex', width:'100%',
            alignItems:'center', flexDirection:'column', height:'300px'
        }}>
            <p style={{fontSize:'25px', fontWeight:'bold'}}>No Games</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m-1.832 13.445a1 1 0 0 0 1.664 1.11c.799-1.199 2.391-1.969 3.925-1.585a1 1 0 1 0 .486-1.94c-2.466-.616-4.874.614-6.075 2.415M9.5 8a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m6-1a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/></g></svg>
        </div>
    }

    return (
        <div style={{ width: '100%', height:'300px'}}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    key={barKey}
                    barCategoryGap="2%"
                    width={500}
                    height={300}
                    data={barData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
                >
                    {/* Background */}
                    <rect width="100%" height="100%" fill={'#1F1F1F'} /> 

                    {/* The lines in the backgrond */}
                    <CartesianGrid strokeDasharray="0 0" vertical={false} stroke={chartType === "support" ? "#535353" : "#245d66"}/>
                    <XAxis dataKey="underText" tick={{ fill: '#B1B1B1', fontWeight:'bold', fontSize:'12px' }} tickLine={false} axisLine={false}/>
                    <YAxis 
                        domain={[0, yAxisMax]} 
                        // domain={[0, Math.max(...ticks) + 5]}
                        tick={{ fill: 'grey', fontWeight:'bold', fontSize:'14px' }} 
                        tickLine={false} 
                        // ticks={ticks}
                        axisLine={false}
                    />

                    {/* Hovering ToolTip */}
                    <Tooltip content={<CustomTooltip player={player} />} />

                    {/* Bars */}
                    <Bar dataKey="stat1" stackId="a" radius={barRadiusArr[0]} animationDuration={200}>
                        {barData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={foundProjection && chartType === 'main' ? entry.statTotal > foundProjection.value ? barColorArr[0] : '#A2A2A2' : '#fff'}
                            />
                        ))}
                        {barData[0].name.includes('+') ?
                            <LabelList
                                dataKey="stat1Text"
                                position="center"
                                style={{fill: 'black', fontSize: '12px', fontWeight: 'bold'}}
                            /> : null
                        }
                    </Bar>
                    <Bar dataKey="stat2" stackId="a" radius={barRadiusArr[1]} animationDuration={200}>
                        {barData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={foundProjection && chartType === 'main' ? entry.statTotal > foundProjection.value ? barColorArr[1] : '#A2A2A2' : '#EEEEEE'}
                            />
                        ))}
                        <LabelList
                            dataKey="stat2Text"
                            position="center"
                            style={{
                                fill: 'black', fontSize: '12px', fontWeight: 'bold',
                            }}
                        />
                    </Bar>
                    <Bar dataKey="stat3" stackId="a" radius={barRadiusArr[2]} animationDuration={200}>
                        {barData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={foundProjection && chartType === 'main' ? entry.statTotal > foundProjection.value ? barColorArr[2] : '#A2A2A2' : '#BDBDBD'}
                            />
                        ))}
                        <LabelList
                            dataKey="stat3Text"
                            position="center"
                            style={{ fill: 'black', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <LabelList
                            dataKey="statTotal"  // Number floating up top
                            position="top"
                            style={{fontSize: '15px', fontWeight: 'bold'}}
                        />
                    </Bar>

                    {/* The reference lines */}
                    {/* {refLineOn && barData.length > 0 && (
                        foundBet ? (
                            <ReferenceLine
                                y={refLineAmt} 
                                stroke="grey" 
                                strokeDasharray="4 4" 
                                strokeWidth={1}
                                label={<CustomLabel value={refLineAmt} />}
                            />
                        ) : (
                            <ReferenceLine 
                                y={refLineAmt} 
                                stroke="#E9E9E9" 
                                strokeDasharray="3 3" 
                                label={<AvgLabel />}
                            />
                        )
                    )} */}

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
