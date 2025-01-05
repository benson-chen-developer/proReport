import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { parseBarData } from '../../../Context/functions/barchartFuncs'
import { PGame, PlayerType, PPlayer } from '../../../Context/Types/PlayerTypes'
import { Projection } from '../../../Context/Types/ProjectionTypes'
import { Bars } from '../Bars'
import { BarData, Filter, MatchUp } from '../Matches'
import { BarInfo } from './BarInfo'

interface Props {
    player: PPlayer,
    filter: Filter,
    matchUp: MatchUp
    setBarData: Dispatch<SetStateAction<BarData[]>>
    pGames: PGame[],
    projections: Projection[]
}
export const MainBarChart: React.FC<Props> = ({
    player, filter, matchUp, setBarData,
    pGames, projections
}) => {
    const [avg, setAvg] = useState<number>(-1);
    const [seasonAvg, setSeasonAvg] = useState<number>(-1);
    const [mainBarData, setMainBarData] = useState<BarData[]>([]);

    /* This is the projection value */
    const [refLineOn, setRefLineOn] = useState<boolean>(true);
    const [refLine, setRefLine] = useState<number>();

    useEffect(() => {
        // console.log('mainbarcahr', projections)
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
                    const val = foundP?.periods[p][pickedStatSegment]!;
                    // foundP?.periods[p].find(stat => stat.name === pickedStatSegment)?.value!;
                    seasonTotal += val === -1 ? 0 : val
                })
            }
        })

        setAvg(totalStat/mainBarData.length)
        // console.log('useffect seaosnacvg',seasonTotal/pGames.length )
        setSeasonAvg(seasonTotal/pGames.length)

    }, [mainBarData])

    const { isAway, isHome, lastGame, period, stat, withOutPlayers, daysRested, minutes } = filter;
    useEffect(() => {
        // console.log('mainbarcahr', projections)
        const newData = parseBarData(pGames, filter, player, matchUp, filter.stat, projections);
        setMainBarData(newData);
    }, [isAway, isHome, lastGame, period, stat, withOutPlayers, daysRested, minutes])

    return (
        <div style={{width:'100%'}}>
            <BarInfo 
                projections={projections}
                avg={avg} 
                seasonAvg={seasonAvg}
                filter={filter}
                mainBarData={mainBarData}
            />

            <Bars
                refLineOn={refLineOn}
                seasonAvg={seasonAvg}
                foundProjection={projections.find(p => p.name === filter.stat && p.period === filter.period)}
                barData={mainBarData}
                player={player} 
                chartType="main"
            />
        </div>
    )
}
