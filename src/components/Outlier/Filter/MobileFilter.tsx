import React, { Dispatch, SetStateAction, useState } from 'react'
import { MatchUp } from '../../../Context/Types/Match'
import { PPlayer } from '../../../Context/Types/PlayerTypes'
import { Projection } from '../../../Context/Types/ProjectionTypes'
import { Filter, Filters } from '../Matches'
import { Rankings } from '../Ranking/Ranking'
import { DaysOfRest } from '../Stats/DaysOfRest'
import { HomeSwitches, IOSSwitch } from '../Stats/HomeSwitches'
import { MinutesSlider } from '../Stats/MinutesSlider'
import { PeriodStatsHeader } from '../Stats/PeriodStatsHeader'
import { SecondStatsHeader } from '../Stats/SecondStatHeader'
import { StatsFilterHeader } from '../Stats/StatsFilterHeader'
import { WithOutPlayers } from '../Stats/WithoutPlayers'

interface Props {
    projections: Projection[],
    showAllStats: boolean, setShowAllStats: Dispatch<SetStateAction<boolean>>
    filter: Filter, setFilter: Dispatch<SetStateAction<Filter>>
    filters: Filters,
    player: PPlayer,
    matchUp?: MatchUp
}

export const MobileFilter: React.FC<Props> = ({ 
    projections, showAllStats, setShowAllStats,
    filter, filters, setFilter, player, matchUp
}) => {
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

    return (
        <div style={{marginLeft:'5%', height:'auto', display:'flex', flexDirection:'column', width:'100%'}}>
            
            {/* Header */}
            <div style={{width:'95%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{display:'flex', height:'auto', alignItems:'center'}}>
                    <p style={{fontWeight:'bold', fontSize:'18px', color:'#fff'}}>
                        Stats Filter
                    </p>

                    <div 
                        style={{display:'flex', alignItems:'center'}}
                        onClick={() => setShowAdvanced(p => !p)}
                    >
                        <p style={{
                            fontWeight:'bold', fontSize:'10px', color:'#a2a2a2', 
                            margin:'0px 5px 0px 10px'
                        }}>
                            Advanced
                        </p>
                        <IOSSwitch checked={showAdvanced} />
                    </div>
                </div>
            </div>

            {showAdvanced ? 
                <>
                    <div style={{width:'95%', display:'flex', alignItems:'center'}}>
                        <WithOutPlayers
                            ourPlayer={player}
                            setFilter={setFilter} filter={filter}
                        />
                        <DaysOfRest
                            setFilter={setFilter} filter={filter}
                        />
                    </div>

                    <div style={{width:'95%', display:'flex', alignItems:'center', height:'125px'}}>
                        <MinutesSlider
                            filter={filter} setFilter={setFilter}
                            filters={filters}
                        />
                    </div> 
                </>
                    :
                <>
                    <SecondStatsHeader 
                        filter={filter} filters={filters} setFilter={setFilter}
                    />
                    <PeriodStatsHeader
                        setFilter={setFilter} filter={filter}
                        filters={filters}
                    />
                    
                    <div style={{width:'100%',margin: '0px 0px 10px 0px'}}>
                        <HomeSwitches 
                            filter={filter} setFilter={setFilter} 
                            homeGame={matchUp?.teams[0].name === player.city}
                        />
                    </div>
                    {matchUp ? 
                        <Rankings
                            filter={filter} matchUp={matchUp} player={player}
                        /> : null
                    }
                </>
            }
        </div>
    )
}
