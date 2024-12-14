import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PGame, PlayerType, PPlayer } from '../../../Context/PlayerTypes'
import { BarData, Filter, MatchUp } from '../Matches'
import { getDisplayGames } from './BarFunctions'
import { BarInfo } from './BarInfo'
import { Bars } from './Bars'

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
            let foundP = game.players.find(p => p.name === player.name);
            for(const p of periods){
                const val = foundP?.periods[p].find(stat => stat.name === filter.stat)?.value!;
                seasonTotal += val === -1 ? 0 : val
            }
        })

        setAvg(totalStat/mainBarData.length)
        setSeasonAvg(seasonTotal/pGames.length)
    }, [mainBarData])

    return (
        <div style={{
            height:'400px', width:'100%', background:'#1F1F1F',
            // borderTopLeftRadius:'25px', borderTopRightRadius:'25px'
            borderRadius:'25px'
        }}>
            <BarInfo 
                avg={avg} seasonAvg={seasonAvg}
                filter={filter}
                mainBarData={mainBarData}
            />

            <Bars
                pGames={pGames}
                seasonAvg={seasonAvg}
                mainBarData={mainBarData}
                setMainBarData={setMainBarData}
                player={player} 
                filter={filter}
                matchUp={matchUp}
            />
        </div>
    )
}
