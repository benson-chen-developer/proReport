import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PGame, PlayerType, PPlayer } from '../../../Context/PlayerTypes';
import { Bars } from '../Bars';
import { BarData, Filter, Filters, MatchUp } from '../Matches';
import { StatsHeader } from '../Stats/StatsHeader';
import { SupportBars } from '../SupportBars';
import Checkbox from '@mui/material/Checkbox';
import { parseBarData } from '../../../Context/functions/barchartFuncs';

interface Props {
    filter: Filter, setFilter: Dispatch<SetStateAction<Filter>>,
    filters: Filters, 
    matchUp: MatchUp,
    pGames: PGame[],
    player: PPlayer,
    barData: BarData[]
}
export const SupportCard: React.FC<Props> = ({
    filter, setFilter, pGames, player,
    filters, matchUp
}) => {
    const [barData, setBarData] = useState<BarData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refLineOn, setRefLineOn] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        // const foundBet = matchUp.bets.find(bet => 
        //     Object.keys(filter).every(key => 
        //         key === 'supportingStat' || 
        //         key === 'lastGame' ||
        //         key === 'isAway' ||
        //         key === 'isHome' ||
        //         bet.filter[key as keyof Filter] === filter[key as keyof Filter]
        //     )
        // )

        const supportStatsKey = (stat: string): string => {
            if(stat === 'Minutes') return 'MIN'
            else if(stat === 'Fouls') return 'PF'
            else if(stat === 'Field Goals Att.') return 'FGA'
            else return '';
        }

        const newBarData = parseBarData(pGames, filter, player, matchUp, supportStatsKey(filter.supportingStat));
        setBarData(newBarData);

        setLoading(false);
    }, [pGames, filter.supportingStat])

    return (
        <div style={{
            width:'705px', background:'#1E1E1E', display:'flex',
            justifyContent:'center', flexDirection:'column', alignItems:'center',
            boxShadow: '0px 0px 20px 5px #fff', borderRadius:'20px', marginTop:'20px'
        }}>
            <div style={{width:'95%', marginBottom:'30px'}}>
                {/* Supportin Stats and Averages */}
                <div style={{fontSize:'14px', display:'flex', justifyContent:'space-between', fontWeight:'bold', alignItems:'flex-end', marginTop:'20px'}}>
                    <p style={{color:'#fff', fontSize:'18px', margin:0}}>Supporting Stats</p>

                    <div>
                        <span style={{color:'#808080'}}>
                            Avg: <span style={{color:'#fff', fontSize:'13px'}}>
                                {barData.length > 0 
                                    ? (barData.reduce((sum, val) => sum + val.stat1, 0) / barData.length).toFixed(1) 
                                    : 'NA'
                                }
                            </span>
                        </span>
                        <span style={{color:'#14EE9D', marginLeft:'10px'}}>
                            Hits Avg: <span style={{color:'#fff', fontSize:'13px'}}>
                                {barData.filter(d => d.hit).length > 0 
                                    ? (barData.filter(ogBar => ogBar.hit)
                                        .reduce((sum, d, index) => sum + barData[index].stat1, 0) / barData.filter(ogBar => ogBar.hit).length)
                                        .toFixed(1) 
                                    : 'NA'
                                }
                            </span>
                        </span>
                        <span style={{color:'#FF3556', marginLeft:'10px'}}>
                            Miss Avg: <span style={{color:'#fff', fontSize:'13px'}}>{ 
                                barData.filter(d => !d.hit).length > 0 
                                    ? (barData.filter(d => !d.hit)
                                        .reduce((sum, d) => sum + d.stat1, 0) / barData.filter(d => !d.hit).length)
                                        .toFixed(1) 
                                : 'NA'
                            }</span>
                        </span>
                    </div>
                </div>

                <div style={{width:'100%', marginTop:'10px', display:'flex'}}>
                    <StatsHeader 
                        filter={filter} filters={filters}
                        setFilter={setFilter}
                    />

                    <div 
                        style={{
                            color:'#fff', display:'flex', fontSize:'15px', fontWeight:'bold',
                            alignItems:'center', cursor:'pointer', userSelect:'none'
                        }}
                        onClick={() => setRefLineOn(p => !p)}
                    >
                        Line
                        <Checkbox 
                            style={{padding: '5px 0px 5px 5px'}}
                            checked={refLineOn} 
                            sx={{
                                color: '#8FC9F9', // Default color
                                '&.Mui-checked': {
                                color: '#8FC9F9', // Color when checked
                                },
                            }}
                        />
                    </div>
                </div>

            </div>

            {!loading ?
                <Bars
                    filter={filter}
                    matchUp={matchUp}
                    barData={barData}
                    player={player} 
                    refLineOn={refLineOn}
                    seasonAvg={barData.reduce((sum, item) => sum + item.stat1, 0) / barData.length}
                    chartType="support"
                /> : null
            }
        </div>
    )
}
