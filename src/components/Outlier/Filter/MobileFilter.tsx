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
import { ExtraSideSelection } from '../Stats/ExtraSideSelection'
import { WithOutPlayers } from '../Stats/WithoutPlayers'
import { PropHistory } from '../PropHistory/PropHistory'
import { useGlobalContext } from '../../../Context/store'

interface Props {
    extraInfo: string,
    setExtraInfo: Dispatch<SetStateAction<string>>
    projections: Projection[],
    showAllStats: boolean, setShowAllStats: Dispatch<SetStateAction<boolean>>
    matchUp?: MatchUp
}

export const MobileFilter: React.FC<Props> = ({ 
    extraInfo, setExtraInfo,
    projections, showAllStats, setShowAllStats,
    matchUp
}) => {
    const {player} = useGlobalContext();
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

    return (
        <div style={{
            height:'auto', display:'flex', flexDirection:'column', width:'100%',
            overflowY: 'auto',
        }}>
            
            {/* Header */}
            <div style={{width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                <ExtraSideSelection 
                    hasProjections={projections.length > 0}
                    extraInfo={extraInfo}
                    setExtraInfo={setExtraInfo}
                />
            </div>
            
            {extraInfo === "Stats Filter" ?
                <>
                    <div 
                        style={{
                            display:'flex', alignItems:'center', 
                            margin:'0px 0px 5px 5%'
                        }}
                        onClick={() => setShowAdvanced(p => !p)}
                    >
                        <p style={{
                            fontWeight:'bold', fontSize:'12px', color:'#a2a2a2', 
                            marginRight:'5px'
                        }}>
                            Advanced
                        </p>
                        <IOSSwitch checked={showAdvanced} />
                    </div>
                    {showAdvanced ? 
                        <div style={{marginLeft:'5%'}}>
                            <div style={{width:'95%', display:'flex', alignItems:'center'}}>
                                <WithOutPlayers />
                                <DaysOfRest />
                            </div>

                            <div style={{width:'95%', display:'flex', alignItems:'center', height:'125px'}}>
                                <MinutesSlider />
                            </div> 
                        </div>
                            :
                        <div style={{marginLeft:'5%'}}>
                            <SecondStatsHeader />

                            <PeriodStatsHeader />
                            
                            <div style={{width:'100%',margin: '0px 0px 10px 0px'}}>
                                <HomeSwitches 
                                    homeGame={matchUp?.teams[0].name === player.city}
                                />
                            </div>
                        </div>
                    }
                </> : null
            }

            {matchUp && extraInfo === "MatchUp Given" ?
                <div style={{marginTop:'20px'}}>
                    <Rankings
                        matchUp={matchUp} 
                    /> 
                </div> : null
            }

            {extraInfo === "Prop History" ?
                <PropHistory /> : null
            }
        </div>
    )
}
