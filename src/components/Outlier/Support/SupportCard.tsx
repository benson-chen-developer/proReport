import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PGame, PlayerType, PPlayer } from '../../../Context/Types/PlayerTypes';
import { Bars } from '../Bars';
import { BarData, Filter, Filters, MatchUp } from '../Matches';
import { StatsHeader } from '../Stats/StatsHeader';
import Checkbox from '@mui/material/Checkbox';
import { parseBarData, parseSupportBarData } from '../../../Context/functions/barchartFuncs';
import { Projection } from '../../../Context/Types/ProjectionTypes';
import { useGlobalContext } from '../../../Context/store';

interface Props {
    filter: Filter, setFilter: Dispatch<SetStateAction<Filter>>,
    filters: Filters, 
    matchUp: MatchUp | undefined, 
    pGames: PGame[],
    player: PPlayer,
    mainBarData: BarData[],
    pickedProjection: Projection | null
}
export const SupportCard: React.FC<Props> = ({
    filter, setFilter, pGames, player,
    filters, matchUp, pickedProjection, mainBarData
}) => {
    const [barData, setBarData] = useState<BarData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refLineOn, setRefLineOn] = useState<boolean>(false);

    const {isMobile} = useGlobalContext();

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

        const newBarData = parseSupportBarData(mainBarData, pGames, filter, player);
        setBarData(newBarData);

        setLoading(false);
    }, [filter.supportingStat, mainBarData])

    return (
        <div style={{
            width:'100%', background:'#1E1E1E', display:'flex',
            justifyContent:'center', flexDirection:'column', alignItems:'center',
        }}>
            <div style={{width:'95%', marginBottom:'30px'}}>
                {/* Supportin Stats and Averages */}
                <div style={{fontSize: isMobile ? '10px' : '14px', display:'flex', justifyContent:'space-between', fontWeight:'bold', alignItems:'flex-end', marginTop:'20px'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="#fff" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z"/></svg>
                        <p style={{color:'#fff', fontSize:'18px', margin: '0px 0px 0px 5px'}}>Supporting Stats</p>
                    </div>

                    <div style={{marginBottom: '2px'}}>
                        <span style={{color:'#808080'}}>
                            Avg: <span style={{color:'#fff', fontSize: isMobile ? '9px' : '13px',}}>
                                {barData.length > 0 
                                    ? (barData.reduce((sum, val) => sum + val.stat1, 0) / barData.length).toFixed(1) 
                                    : 'NA'
                                }
                            </span>
                        </span>
                        <span style={{color:'#14EE9D', marginLeft:'10px'}}>
                            Hits Avg: <span style={{color:'#fff', fontSize: isMobile ? '9px' : '13px'}}>
                                {barData.filter(d => !d.hit).length > 0 && pickedProjection ? 
                                    (barData.filter(ogBar => ogBar.hit)
                                        .reduce((sum, d, index) => sum + barData[index].stat1, 0) / barData.filter(ogBar => ogBar.hit).length)
                                        .toFixed(1) 
                                        : 
                                    'NA'
                                }
                            </span>
                        </span>
                        <span style={{color:'#FF3556', marginLeft:'10px'}}>
                            Miss Avg: <span style={{color:'#fff', fontSize: isMobile ? '9px' : '13px'}}>
                                {barData.filter(d => !d.hit).length > 0 && pickedProjection ? 
                                    (barData.filter(d => !d.hit)
                                        .reduce((sum, d) => sum + d.stat1, 0) / barData.filter(d => !d.hit).length)
                                        .toFixed(1) 
                                        : 
                                    'NA'
                                }
                            </span>
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
                    lineValue={pickedProjection ? pickedProjection.values[pickedProjection.values.length-1] : null}
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
