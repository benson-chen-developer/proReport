import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { PGame, PlayerType, PPlayer } from '../../../Context/PlayerTypes';
import CustomTooltip from '../CustomTooltip';
import { ReferenceLine } from 'recharts';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { bgColor } from '../../Player/PPlayerPage';
import { BarData, Filter, MatchUp } from '../Matches';
import { parseBarData } from './BarFunctions';
import { getBarChartTicks } from '../../../Context/functions/barchartFuncs';

interface Props {
    player: PPlayer,
    filter: Filter,
    matchUp: MatchUp
    pGames: PGame[],
    mainBarData: BarData[],
    setMainBarData: Dispatch<SetStateAction<BarData[]>>
    seasonAvg: number
}

export const Bars: React.FC<Props> = ({ pGames, player, filter, matchUp, mainBarData, setMainBarData, seasonAvg }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [ticks, setTicks] = useState<number[]>([]);
    const [refLineAmt, setRefLineAmt] = useState<number>(-1); /* The number the referelnce line will be at */
    
    const [foundBet, setFoundBet] = useState();
    const [barKey, setBarKey] = useState<number>(0);

    const { isAway, isHome, lastGame, period, stat } = filter;
    useEffect(() => {
        setLoading(true);
        const foundBet = matchUp.bets.find(bet => 
            Object.keys(filter).every(key => 
                key === 'supportingStat' || 
                key === 'lastGame' ||
                key === 'isAway' ||
                key === 'isHome' ||
                bet.filter[key as keyof Filter] === filter[key as keyof Filter]
            )
        )

        /* Set the y where the reference line will be */
        let refLineAmt = -1;
        if(foundBet) refLineAmt = foundBet.value;
        else refLineAmt = seasonAvg;
        setRefLineAmt(refLineAmt);
        setFoundBet(foundBet as any);

        /* The barData */
        const data = parseBarData(pGames, filter, player, matchUp);
        console.log('mainbar data', data)
        setMainBarData(data);

        /* Size of the chart */
        setTicks(getBarChartTicks(data, refLineAmt));
        
        setLoading(false);
    }, [seasonAvg, isAway, isHome, lastGame, period, stat])
    useEffect(() => {
        setBarKey(prev => prev + 1);
      }, [mainBarData]);

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

    if(mainBarData.length === 0){
        return <div style={{
            color:'#fff', display:'flex', width:'100%', height:'100%',
            alignItems:'center', flexDirection:'column',
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
                    data={mainBarData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <rect width="100%" height="100%" fill={'#1F1F1F'} /> {/* Background */}

                    <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#245d66"/>
                    <XAxis dataKey="underText" tick={{ fill: '#B1B1B1', fontWeight:'bold' }} tickLine={false} axisLine={false}/>
                    <YAxis 
                        domain={[ticks[0], ticks[-1]]} 
                        tick={{ fill: 'grey', fontWeight:'bold', fontSize:'14px' }} 
                        tickLine={false} 
                        ticks={ticks}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip player={player} />} />

                    <Bar 
                        dataKey="stat1" 
                        radius={5} 
                        isAnimationActive={true} 
                        animationDuration={300} 
                        activeBar={<Rectangle fill="gold" stroke="purple" radius={5}/>}
                    >
                        {mainBarData.map((entry, index) => (
                            <React.Fragment key={`cell-${index}`} >
                                <Cell 
                                    fill={entry.stat1 >= refLineAmt && foundBet ? '#79F4F4' : '#fff'} 
                                />
                                <LabelList 
                                    dataKey="stat1" position="top" 
                                    style={{ 
                                        // fill: entry.stat1 >= refLineAmt ? (foundBet ? '#79F4F4' : "#fff") : 'grey',
                                        fill: entry.stat1 >= refLineAmt && foundBet ? '#79F4F4' : '#fff',
                                        fontSize: '15px', fontWeight: 'bold' 
                                    }} 
                                />
                            </React.Fragment>
                        ))}
                    </Bar>

                    {mainBarData.length > 0 && (
                        foundBet ? 
                            <ReferenceLine
                                y={refLineAmt} 
                                stroke="grey" 
                                strokeDasharray="4 4" 
                                strokeWidth={1}
                                label={<CustomLabel value={refLineAmt} />}
                            />
                            :
                            <ReferenceLine 
                                y={refLineAmt} 
                                stroke="#E9E9E9" 
                                strokeDasharray="3 3" 
                                label={<AvgLabel />}
                            />
                    )}

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
