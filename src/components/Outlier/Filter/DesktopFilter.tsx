import React, { Dispatch, SetStateAction } from 'react'
import { DaysOfRest } from '../Stats/DaysOfRest'
import { HomeSwitches } from '../Stats/HomeSwitches'
import { MinutesSlider } from '../Stats/MinutesSlider'
import { PeriodStatsHeader } from '../Stats/PeriodStatsHeader'
import { SecondStatsHeader } from '../Stats/SecondStatHeader'
import { WithOutPlayers } from '../Stats/WithoutPlayers'
import { MatchUp } from '../../../Context/Types/Match'

interface Props {
    matchUp: MatchUp | undefined
}

export const DesktopFilter: React.FC<Props> = ({matchUp}) => {
    return (
        <div style={{height:'auto', display:'flex', flexDirection:'column', marginLeft:'5%'}}>
            <SecondStatsHeader
            />
            <PeriodStatsHeader
            />

            {matchUp ?
                <HomeSwitches
                    matchUp={matchUp}
                /> : null
            }

            <div style={{width:'95%', display:'flex', alignItems:'center'}}>
                <WithOutPlayers />
                
                <DaysOfRest />
            </div>
            <div style={{width:'95%'}}>
                <MinutesSlider
                />
            </div>
        </div>
    )
}
