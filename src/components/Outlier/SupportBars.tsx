import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { PGame, PlayerType } from '../../Context/PlayerTypes';
import CustomTooltip from '../Outlier/CustomTooltip';
import { ReferenceLine } from 'recharts';
import React, { useEffect, useState } from 'react';
import { bgColor } from '../Player/PPlayerPage';
import { BarData, MatchUp } from './Matches';
import { Bars } from './Bars';

interface Props {
    data: BarData[],
    player: PlayerType,
    barData: BarData[]
    matchUp: MatchUp
}

export const SupportBars: React.FC<Props> = ({data, player, barData, matchUp}) => {
    const [refLineAmt, setRefLineAmt] = useState<number>(-1); /* The number the referelnce line will be at */
    const [foundBet, setFoundBet] = useState();

    // useEffect(() => {
    //     const foundBet = matchUp.bets.find(bet => 
    //         Object.keys(filter).every(key => 
    //             key === 'supportingStat' || 
    //             key === 'lastGame' ||
    //             key === 'isAway' ||
    //             key === 'isHome' ||
    //             bet.filter[key as keyof Filter] === filter[key as keyof Filter]
    //         )
    //     )

    //     /* Set the y where the reference line will be */
    //     let refLineAmt = -1;
    //     if(foundBet) refLineAmt = foundBet.value;
    //     else refLineAmt = seasonAvg;
    //     setRefLineAmt(refLineAmt);
    //     setFoundBet(foundBet as any);

    //     /* The barData */
    //     const data = parseBarData(pGames, filter, player, matchUp);
    //     setBarData(data);
    //     setData(data);

    //     /* Size of the chart */
    //     const middlePart = Math.round(Math.max(...data.map(d => d.stat1), refLineAmt));
    //     const yAxisMax = Math.round(middlePart * 1.4);
    //     const yAxisMin = Math.round(Math.min(...data.map(d => d.stat1)) * .8);
    //     setYAxisMax(yAxisMax)
    //     setYAxisMin(yAxisMin)
        
    // }, [seasonAvg, isAway, isHome])

    if(data.length === 0) return <div style={{color:'#fff'}}>Loading</div>

    return (
        <div style={{ width: '100%', height:'300px', paddingTop:"20px"}}>
            {/* {data[0].stat2 < 0 ?
                <OneStatBarchart data={data} compareNum={compareNum} player={player} barData={barData} />
                    :
                <MoreStatBarchart data={data} compareNum={compareNum} player={player} barData={barData}/>
            } */}
            <Bars 
                player={player}
            />
        </div>
    );
};

interface Props2 {
    data: {
        name: string, 
        stat1: number,
        stat2: number,
        stat3: number, 
        date: string, 
        score: string,
        against: string,
        opp: string,
        underText: string
    }[];
    compareNum: number;
    player: PlayerType
    barData: BarData[]
}

interface BarProps {
    player: PlayerType,
    barData: BarData[],
}
const OneStatBarchart: React.FC<BarProps> = ({ player, barData }) => {
    const max = Math.max(...barData.map(d => d.stat1));
    const min = Math.min(...barData.map(d => d.stat1));
    const adjustedMax = Math.round(max * 1.1);
    const adjustedMin = Math.round(min * 0.6);
    const yAxisMax = Math.ceil(adjustedMax / 10) * 10;
    const yAxisMin = Math.floor(adjustedMin / 10) * 10;
   
    return <ResponsiveContainer width="100%" height="100%">
        <BarChart
            barCategoryGap="2%"
            width={500}
            height={400}
            data={barData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <rect width="100%" height="100%" fill={bgColor} /> {/* Background */}

            <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#245d66"/>
            <XAxis dataKey="underText" tick={{ fill: '#E5E5E5' }} tickLine={false} axisLine={false}/>
            <YAxis 
                domain={[yAxisMin, yAxisMax]} 
                tick={{ fill: 'grey', fontWeight:'bold', fontSize:'14px' }} 
                tickLine={false}
                tickCount={10}
                axisLine={false}
            />
            <Tooltip content={<CustomTooltip player={player} />} />
            
            <Bar 
                dataKey="stat1" 
                radius={5}
                activeBar={
                    <Rectangle 
                        fill="gold" 
                        stroke="purple" 
                        radius={5}
                    />
                }
            >
                {barData.map((entry, index) => (
                    <React.Fragment key={index}>
                        <Cell fill={barData[index].hit ? '#fff' : 'grey'} />
                        <LabelList 
                            dataKey="stat1" 
                            position="top" 
                            style={{ fill: barData[index].hit ? '#fff' : 'grey', fontSize: '16px', fontWeight:'bold' }} 
                        />
                    </React.Fragment>
                ))}
            </Bar>

        </BarChart>
    </ResponsiveContainer>
};

const MoreStatBarchart: React.FC<Props2> = ({ data, compareNum, player, barData }) => {
    const maxAmt = Math.max(...data.map(d => d.stat1));
    const yAxisMax = Math.round(Math.max(compareNum + (maxAmt - compareNum) * 1.4, compareNum * 1.4));
    const yAxisMin = Math.max(Math.round(compareNum - (yAxisMax - compareNum)) ,0);
   
    console.log("barData in sup", barData)

    return <ResponsiveContainer width="100%" height="100%">
        <BarChart
            barCategoryGap="2%"
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <rect width="100%" height="100%" fill={bgColor} /> {/* Background */}

            <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#245d66"/>
            <XAxis dataKey="underText" tick={{ fill: '#E5E5E5' }} tickLine={false} axisLine={false}/>
            <YAxis 
                domain={[yAxisMin, yAxisMax]} 
                tick={{ fill: 'grey', fontWeight:'bold', fontSize:'14px' }} 
                tickLine={false} 
                tickCount={10}
                axisLine={false}
            />
            <Tooltip content={<CustomTooltip player={player} />} />
            
            <Bar 
                stackId={'a'}
                dataKey="stat2" 
                radius={[0, 0, 5, 5]}
                activeBar={
                    <Rectangle 
                        fill="gold" 
                        stroke="purple" 
                        radius={[0, 0, 5, 5]}
                    />
                }
            >
                {data.map((entry, index) => (
                    <React.Fragment key={index}>
                        <Cell fill={'#e2e2e2'} />
                        <LabelList 
                            dataKey="stat2" 
                            position="center" 
                            formatter={(value: number) => `${value} Made`} 
                            style={{ fill: '#000', fontSize: '15px' }} 
                        />
                    </React.Fragment>
                ))}
            </Bar>

            <Bar 
                stackId={'a'}
                dataKey="stat1" 
                radius={[5, 5, 0, 0]}
                activeBar={
                    <Rectangle 
                        fill="gold" 
                        stroke="purple" 
                        radius={[5, 5, 0, 0]}
                    />
                }
            >
                {data.map((entry, index) => (
                    <React.Fragment key={index}>
                        <Cell fill={'#fff'} />
                        <LabelList 
                            dataKey="stat3" 
                            position="top" 
                            style={{ fill: barData[index].hit ? '#fff' : 'grey', fontSize: '16px', fontWeight:'bold' }} 
                        />
                        <LabelList 
                            dataKey="stat1" 
                            position="center" 
                            formatter={(value: number) => `${value} Missed`} 
                            style={{ fill: '#000', fontSize: '15px' }} 
                        />
                    </React.Fragment>
                ))}
            </Bar>

        </BarChart>
    </ResponsiveContainer>
};