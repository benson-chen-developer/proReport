import React, { useEffect, useState } from 'react'
import { calcRank, getTeamStatRanking, RankDisplay, Ranking } from '../../../Context/functions/rankFunctins'
import { PGame } from '../../../Context/PlayerTypes'
import { useGlobalContext } from '../../../Context/store'
import { PSport } from '../../Player/SportClass/Psport'
import { Filter } from '../Matches'

interface Props {
    filter: Filter
}
export const Rankings: React.FC<Props> = ({filter}) => {
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [oppRanking, setOppRanking] = useState<Ranking>({team: '', stats: {}, games: 0});
    const [rankedStats, setRankedStats] = useState<Ranking[]>([]);

    const [rankString, setRankString] = useState<string>('');
    const [avgRank, setAvgRank] = useState<number>(0);

    const {fetchNbaPlayers, fetchNbaMatches} = useGlobalContext();
    const bet = {
        oppTeam: 'cleveland',
        stat: 'PTS',
        period: 'All'
    }

    useEffect(() => {
        const func = async () => {
            const allGames = await fetchNbaMatches();
            const players = await fetchNbaPlayers();

            const rankings = getTeamStatRanking(allGames, players);
            setRankings(rankings);

            const foundOppRanking = rankings.find(rank => rank.team.toLowerCase() === bet.oppTeam);
            if(foundOppRanking) setOppRanking(foundOppRanking);
        }

        func();
    }, [])

    return (
        <div>
            {oppRanking.team ?
                <RankCard 
                    rankings={rankings}
                    oppTeam={oppRanking.team}
                    filter={filter}
                    rankString={rankString}
                />
                : null
            }
        </div>
    )
}

interface Props2 {
    rankings: Ranking[]
    oppTeam: string
    filter: Filter,
    rankString: string
}
const RankCard: React.FC<Props2> = ({oppTeam, filter, rankString, rankings}) => {
    // const data = [
    //     {
    //         statAllowed: filter.stat,
    //         rank: rankString,
    //         avg: 44
    //     },
    //     {
    //         statAllowed: `${filter.stat} (Q1)`,
    //         rank: '2nd',
    //         avg: 10.4
    //     }
    // ]
    const [selectedOption, setSelectedOption] = useState('All');
    const [data, setData] = useState<RankDisplay[]>([]);

    useEffect(() => {
        const pickedPosition = selectedOption !== 'All' ? selectedOption.slice(3) : selectedOption;
        const newData: RankDisplay[] = [];

        /* This adds the total stat (So if we picked Q1 PTS this would show PTS allowed) */
        newData.push(calcRank(rankings, 'All', pickedPosition, 'cleveland', filter.stat));

        /* This adds the period stat (So if we picked Q1 PTS this would show Q1 PTS allowed) */
        if(filter.period !== 'All'){
            newData.push(calcRank(rankings, filter.period, pickedPosition, 'cleveland', filter.stat));
        }

        // console.log('newdata', newData)
        setData(newData);
    }, [selectedOption, filter.stat, filter.period])

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    if(data.length < 0) return <div>Loading</div>

    return (
        <div style={{color:'#fff', width:'350px', height: '300px', background:'#2B2B2B', display:'flex', alignItems:'center', borderRadius:'10px', marginTop:'180px', flexDirection:'column'}}>
            <div style={{width:'85%', height:'90%'}}>
                <p>{oppTeam} Points Allowed</p>

                {/* Positions Selection */}
                <div style={{display:'flex'}}>
                    {['All', 'vs G', 'vs F', 'vs C'].map((option) => (
                        <div 
                            style={{
                                cursor:'pointer', color:'#fff', paddingRight:'20px', alignItems:'center',
                                display:'flex', flexDirection:'column', justifyContent:'space-between',
                            }}
                            onClick={() => setSelectedOption(option)}
                        >
                            <div style={{color: option === selectedOption ? '#fff' : 'grey', marginTop:'5px',}}>
                                    <p style={{margin:0, fontWeight:'bold', marginBottom:'15px', fontSize:'14px'}}>
                                        {option}
                                    </p>
                                </div>

                                <div style={{
                                    height:'4px', width:'90%', 
                                    background: option === selectedOption ? '#fff' : '',
                                    borderTopLeftRadius: option === selectedOption ? '8px' : '0', 
                                    borderTopRightRadius: option === selectedOption ? '8px' : '0',
                                }}/>
                        </div>
                    ))}
                </div>

                {/* Headers (Rank + Avg) */}
                <div style={{width:'100%', justifyContent:'space-between', display:'flex', marginBottom:'10px'}}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff', width:'60%' }} />

                    <div style={{display:'flex', width:'40%'}}>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#B1B1B1', width:'50%', textAlign:'center' }}>
                            Rank
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#B1B1B1', width:'50%', textAlign:'center' }}>
                            Avg
                        </p>
                    </div>
                </div>

                {/* Actual Data (Points Allowed     23rd     101.1) */}
                {data.map((d, index) => (
                    <div style={{width:'100%', justifyContent:'space-between', display:'flex', marginBottom:'15px'}}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff', width:'60%' }}> 
                            {d.statAllowed}
                        </div>

                        <div style={{display:'flex', width:'40%'}}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', color: d.color, width:'50%', textAlign:'center' }}>
                                {d.rank}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#B1B1B1', width:'50%', textAlign:'center' }}>
                                {d.avg.toFixed(1)}
                            </div>
                        </div>
                </div>
                ))}
            </div>

            <div style={{fontSize:'12px', fontWeight:'normal', color:'#B1B1B1', marginBottom:'20px', width:'85%'}}>
                {oppTeam} is <span style={{color:'#fff'}}>{data[0].rank} in {data[0].statAllowed}</span>, averaging <span style={{color:'#fff'}}>{data[0].avg} {filter.stat}</span> per game <span style={{color:'#fff'}}>({selectedOption})</span>
            </div>
        </div>
    )
}