import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { convertNBATeamName } from '../../Context/functions/convertNbaName';
import { PPlayer } from '../../Context/Types/PlayerTypes';

type CustomTooltipProps = TooltipProps<ValueType, NameType> & { player: PPlayer };

const CustomTooltip = ({ active, payload, label, player }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const team1Score = payload[0].payload.score.split('-')[0];
        const team2Score = payload[0].payload.score.split('-')[1];
        const oppTeam = payload[0].payload.opp;
        // const ourTeam = payload[0].payload;

        return (
            <div style={{
                width: '170px', height: '90px', background: '#000', borderRadius: '10px', 
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly',
                fontSize:'14px'
            }}>
                {/* Row 1 */}
                <div style={{ display: 'flex', width: '90%', justifyContent: 'space-between', marginTop:'5px'}}>
                    <div style={{ color: '#fff', fontWeight:'bold'}}>
                        {/* <img 
                            src={getNBATeamEmoji(payload[0].payload.opp)}
                            style={{ width: '25px', height: '25px' }}
                        /> */}
                        <b style={{ color: '#fff' }}>{convertNBATeamName(player.city, 0)}</b>
                    </div>

                    <div style={{ color: '#A2A2A2', fontWeight:'bold'}}>
                        {payload[0].payload.date}
                    </div>

                    <div>
                        {/* <img 
                            src={getNBATeamEmoji(player.team)}
                            style={{ width: '25px', height: '25px' }}
                        /> */}
                        <b style={{ color: '#fff' }}>{convertNBATeamName(oppTeam, 0)}</b>
                    </div>
                </div>

                {/* Row 2 */}
                <div style={{ 
                    display: 'flex', width: '100%', color:'#fff', margin:'5px 0px',
                    fontWeight:'bold', justifyContent:'center'
                }}>
                    <p style={{ 
                        color: team1Score > team2Score ? '#fff' : '#A2A2A2',
                        margin:'0'
                    }}>
                        {team1Score}
                    </p> 
                    <p style={{margin:'0px 5px'}}> : </p> 
                    <p style={{  
                        color: team2Score > team1Score ? '#fff' : '#A2A2A2',
                        margin:'0'
                    }}>
                        {team2Score}
                    </p>
                </div>

                {/* Row 3 */}
                <div style={{ 
                    display: 'flex', width: '100%', color:'#A2A2A2', margin: '0px 0px 5px 0px',
                    fontWeight:'bold', justifyContent:'center'
                }}>
                    No OT
                </div>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
