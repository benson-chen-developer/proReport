import React, { Dispatch, SetStateAction } from 'react'
import { DaysOfRest } from '../Stats/DaysOfRest'
import { HomeSwitches } from '../Stats/HomeSwitches'
import { MinutesSlider } from '../Stats/MinutesSlider'
import { PeriodStatsHeader } from '../Stats/PeriodStatsHeader'
import { SecondStatsHeader } from '../Stats/SecondStatHeader'
import { WithOutPlayers } from '../Stats/WithoutPlayers'

interface Props {
    homeGame: boolean,
}

export const DesktopFilter: React.FC<Props> = ({homeGame}) => {
    return (
        <div style={{height:'auto', display:'flex', flexDirection:'column', marginLeft:'5%'}}>
            <SecondStatsHeader
            />
            <PeriodStatsHeader
            />

            <HomeSwitches
                homeGame={homeGame}
            />

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
