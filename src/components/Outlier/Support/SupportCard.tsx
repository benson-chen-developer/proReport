import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PGame, PlayerType } from '../../../Context/PlayerTypes';
import { BarData, Filter, Filters, MatchUp } from '../Matches';
import { StatsHeader } from '../Stats/StatsHeader';
import { SupportBars } from '../SupportBars';

interface Props {
    filter: Filter, setFilter: Dispatch<SetStateAction<Filter>>,
    filters: Filters, 
    matchUp: MatchUp,
    displayedGames: PGame[],
    player: PlayerType,
    barData: BarData[]
}
export const SupportCard: React.FC<Props> = ({
    filter, setFilter, displayedGames, player,
    filters, barData, matchUp
}) => {
    const [data, setData] = useState<BarData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

        const data = displayedGames.map(game => { 
            const date = new Date(game.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
            const opp = game.team1 === player.team ? game.team2 : game.team1;
            const against = game.team1 === player.team ? '@' : 'vs';
            const foundPlayer = game.players.find(p => p.name.toLowerCase() === player.name.toLowerCase());
            let stat1 = 0; let stat2 = -1; let stat3 = -1;
            
            let minutes = 0;
            let seconds = 0;
            let fouls = 0;
            let fga = 0; let fgm = 0;
            let offReb = 0; let defReb = 0;

            let periods = [0, 1, 2, 3];
            if(filter.period === "H1") periods = [0, 1];
            else if(filter.period === "H2") periods = [2, 3];
            else if(filter.period === "Q1") periods = [0];
            else if(filter.period === "Q2") periods = [1];
            else if(filter.period === "Q3") periods = [2];
            else if(filter.period === "Q4") periods = [3];

            for (let period of periods){
                let time = foundPlayer?.periods[period].find(stat => stat.name === "MIN")?.value || 0;
                let minute = Math.floor(time); let second = Number((time - minute).toFixed(2));
                minutes += minute;
                seconds += second;
                
                fouls += foundPlayer?.periods[period].find(stat => stat.name === "PF")?.value || 0;
                fga += foundPlayer?.periods[period].find(stat => stat.name === "FGA")?.value || 0;
                fgm += foundPlayer?.periods[period].find(stat => stat.name === "FGM")?.value || 0;
                offReb += foundPlayer?.periods[period].find(stat => stat.name === "ORB")?.value || 0;
                defReb += foundPlayer?.periods[period].find(stat => stat.name === "DRB")?.value || 0;
            }
            if(filter.supportingStat === "Minutes"){
                stat1 = minutes + Math.round((seconds*100)/60);
            }
            else if(filter.supportingStat === "Fouls"){
                stat1 = fouls;
            }
            else if(filter.supportingStat === "Field Goals Att."){
                stat1 = fga-fgm; stat2 = fgm; stat3 = fga;
            }
            else if(filter.supportingStat === "OFF/DEF Rebounds"){
                stat1 = offReb+defReb; stat2 = offReb; stat3 = defReb;
            }
        
            return {
                name: filter.supportingStat, 
                stat1: stat1,
                stat2: stat2,
                stat3: stat3, 
                date: date, 
                score: game.score,
                against: against,
                opp: opp,
                underText: `${date} ${against} ${opp}`,
                hit: false
            };
        }).reverse();
        setData(data);

        setLoading(false);
    }, [displayedGames, filter.supportingStat])

    return (
        <div style={{
            width:'705px', background:'#1E1E1E', display:'flex',
            justifyContent:'center', flexDirection:'column', alignItems:'center',
            boxShadow: '0px 0px 20px 5px #fff', borderRadius:'20px', marginTop:'20px'
        }}>
            <div style={{width:'95%'}}>
                {/* Supportin Stats and Averages */}
                <div style={{fontSize:'14px', display:'flex', justifyContent:'space-between', fontWeight:'bold', alignItems:'flex-end', marginTop:'20px'}}>
                    <p style={{color:'#fff', fontSize:'18px', margin:0}}>Supporting Stats</p>

                    <div>
                        <span style={{color:'#808080'}}>
                            Avg: <span style={{color:'#fff', fontSize:'13px'}}>
                                {barData.length > 0 
                                    ? (data.reduce((sum, val) => sum + val.stat1, 0) / data.length).toFixed(1) 
                                    : 'NA'
                                }
                            </span>
                        </span>
                        <span style={{color:'#14EE9D', marginLeft:'10px'}}>
                            Hits Avg: <span style={{color:'#fff', fontSize:'13px'}}>
                                {barData.filter(d => d.hit).length > 0 
                                    ? (barData.filter(ogBar => ogBar.hit)
                                        .reduce((sum, d, index) => sum + data[index].stat1, 0) / barData.filter(ogBar => ogBar.hit).length)
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

                <StatsHeader 
                    filter={filter} filters={filters}
                    setFilter={setFilter}
                />
            </div>

            {!loading ?
                <SupportBars
                    matchUp={matchUp}
                    barData={barData}
                    data={data}
                    player={player} 
                /> : null
            }
        </div>
    )
}
