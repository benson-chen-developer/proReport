import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { parseBarData } from '../../../Context/functions/barchartFuncs'
import { PGame, PlayerType, PPlayer } from '../../../Context/PlayerTypes'
import { Bars } from '../Bars'
import { BarData, Filter, MatchUp } from '../Matches'
import { BarInfo } from './BarInfo'

interface Props {
    player: PPlayer,
    filter: Filter,
    matchUp: MatchUp
    setBarData: Dispatch<SetStateAction<BarData[]>>
    pGames: PGame[]
}
export const MainBarChart: React.FC<Props> = ({
    player, filter, matchUp, setBarData,
    pGames
}) => {
    const [avg, setAvg] = useState<number>(-1);
    const [seasonAvg, setSeasonAvg] = useState<number>(-1);
    const [mainBarData, setMainBarData] = useState<BarData[]>([]);
    const [refLineOn, setRefLineOn] = useState<boolean>(true);

    useEffect(() => {
        let periods = [0, 1, 2, 3];
        if(filter.period === "H1") periods = [0, 1];
        else if(filter.period === "H2") periods = [2, 3];
        else if(filter.period === "Q1") periods = [0];
        else if(filter.period === "Q2") periods = [1];
        else if(filter.period === "Q3") periods = [2];
        else if(filter.period === "Q4") periods = [3];
        
        let totalStat = 0;
        mainBarData.forEach((barData) => {
            totalStat += barData.stat1;
        })

        let seasonTotal = 0;
        pGames.forEach((game) => {
            let pickedStats = filter.stat.split('+');
            let foundP = game.players.find(p => p.name === player.name);
            for(const p of periods){
                pickedStats.forEach((pickedStatSegment, index) => {
                    const val = foundP?.periods[p].find(stat => stat.name === pickedStatSegment)?.value!;
                    seasonTotal += val === -1 ? 0 : val
                })
            }
        })

        setAvg(totalStat/mainBarData.length)
        // console.log('useffect seaosnacvg',seasonTotal/pGames.length )
        setSeasonAvg(seasonTotal/pGames.length)

    }, [mainBarData])

    const { isAway, isHome, lastGame, period, stat } = filter;
    useEffect(() => {
        const newData = parseBarData(pGames, filter, player, matchUp, filter.stat);
        setMainBarData(newData);
    }, [isAway, isHome, lastGame, period, stat])

    return (
        <div style={{
            height:'400px', width:'100%', background:'#1F1F1F',
            // borderTopLeftRadius:'25px', borderTopRightRadius:'25px'
            borderRadius:'25px'
        }}>
            <BarInfo 
                avg={avg} 
                seasonAvg={seasonAvg}
                filter={filter}
                mainBarData={mainBarData}
            />

            <Bars
                refLineOn={refLineOn}
                seasonAvg={seasonAvg}
                filter={filter}
                matchUp={matchUp}
                pGames={pGames}
                barData={mainBarData}
                player={player} 
                chartType="main"
            />
        </div>
    )
}
