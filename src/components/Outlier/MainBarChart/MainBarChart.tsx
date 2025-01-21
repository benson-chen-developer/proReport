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
    setFilter: Dispatch<SetStateAction<Filter>>,
    matchUp: MatchUp | undefined
    mainBarData: BarData[],
    setMainBarData: Dispatch<SetStateAction<BarData[]>>
    pGames: PGame[],
    projections: Projection[]
    pickedProjection:Projection | null
    setPickedProjection: Dispatch<SetStateAction<Projection | null>>
}
export const MainBarChart: React.FC<Props> = ({
    player, filter, matchUp, setMainBarData, mainBarData, setFilter,
    pGames, projections, pickedProjection, setPickedProjection
}) => {
    const [avg, setAvg] = useState<number>(-1);
    const [seasonAvg, setSeasonAvg] = useState<number>(-1);

    /* This is the projection value */
    const [refLineOn, setRefLineOn] = useState<boolean>(true);

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

    /* BarDat useEffect */
    const { isAway, isHome, lastGame, period, stat, withOutPlayers, daysRested, minutes, over } = filter;
    useEffect(() => {
        const newData = parseBarData(pGames, filter, player, pickedProjection, matchUp);
        setMainBarData(newData);
    }, [isAway, isHome, lastGame, period, stat, withOutPlayers, daysRested, minutes, over, pickedProjection])

    return (
        <div style={{width:'100%'}}>
            <BarInfo 
                pickedProjection={pickedProjection}
                setPickedProjection={setPickedProjection}
                projections={projections}
                avg={avg} 
                seasonAvg={seasonAvg}
                filter={filter} setFilter={setFilter}
                mainBarData={mainBarData}
            />

            <Bars
                lineValue={pickedProjection ? pickedProjection.values[pickedProjection.values.length-1] : null}
                refLineOn={refLineOn}
                seasonAvg={seasonAvg}
                barData={mainBarData}
                player={player} 
                chartType="main"
            />
        </div>
    )
}
