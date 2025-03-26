import React, { Dispatch, SetStateAction } from 'react'
import { PPlayer } from '../../../Context/Types/PlayerTypes'
import { Filter, Filters } from '../Matches'
import { DaysOfRest } from '../Stats/DaysOfRest'
import { HomeSwitches } from '../Stats/HomeSwitches'
import { MinutesSlider } from '../Stats/MinutesSlider'
import { PeriodStatsHeader } from '../Stats/PeriodStatsHeader'
import { SecondStatsHeader } from '../Stats/SecondStatHeader'
import { WithOutPlayers } from '../Stats/WithoutPlayers'

interface Props {
    filter: Filter, 
    setFilter: Dispatch<SetStateAction<Filter>>,
    filters: Filters,
    homeGame: boolean,
    player: PPlayer
}

export const DesktopFilter: React.FC<Props> = ({filter, filters, setFilter, homeGame, player}) => {
    return (
        <div style={{height:'auto', display:'flex', flexDirection:'column', marginLeft:'5%'}}>
            <SecondStatsHeader
                filter={filter} filters={filters} setFilter={setFilter}
            />
            <PeriodStatsHeader
                setFilter={setFilter} filter={filter}
                filters={filters}
            />

            <HomeSwitches
                filter={filter} setFilter={setFilter} 
                homeGame={homeGame}
            />

            <div style={{width:'95%', display:'flex', alignItems:'center'}}>
                <WithOutPlayers
                    ourPlayer={player}
                    setFilter={setFilter} filter={filter}
                />
                <DaysOfRest
                    setFilter={setFilter} filter={filter}
                />
            </div>
            <div style={{width:'95%'}}>
                <MinutesSlider
                    filter={filter} setFilter={setFilter}
                    filters={filters}
                />
            </div>
        </div>
    )
}
