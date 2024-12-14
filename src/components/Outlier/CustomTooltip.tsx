import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { PlayerType } from '../../Context/PlayerTypes';
import { convertNBATeamName, getNBATeamEmoji } from '../../data/getEmoji';

type CustomTooltipProps = TooltipProps<ValueType, NameType> & { player: PlayerType };

const CustomTooltip = ({ active, payload, label, player }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const team1Score = payload[0].payload.score.split('-')[0];
        const team2Score = payload[0].payload.score.split('-')[1];

        return (
            <div style={{
                width: '200px', height: '100px', background: '#000', borderRadius: '10px'
            }}>

                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <div>
                        <img 
                            src={getNBATeamEmoji(payload[0].payload.opp)}
                            style={{ width: '25px', height: '25px' }}
                        />
                        <b style={{ color: '#fff' }}>{convertNBATeamName(payload[0].payload.opp, 0)}</b>
                        {team2Score > team1Score ? <b style={{ color: '#fff' }}>{team2Score}</b> : <p style={{ color: '#fff' }}>{team2Score}</p>}
                    </div>

                    <div style={{ color: '#fff' }}>
                        {payload[0].payload.date}
                    </div>

                    <div>
                        <img 
                            src={getNBATeamEmoji(player.team)}
                            style={{ width: '25px', height: '25px' }}
                        />
                        <b style={{ color: '#fff' }}>{convertNBATeamName(player.team, 0)}</b>
                        {team1Score > team2Score ? <b style={{ color: '#fff' }}>{team1Score}</b> : <p style={{ color: '#fff' }}>{team1Score}</p>}
                    </div>
                </div>

            </div>
        );
    }

    return null;
};

export default CustomTooltip;
