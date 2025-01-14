import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { convertNBATeamName } from '../../Context/functions/convertNbaName';
import { useGlobalContext } from '../../Context/store';
import { PPlayer, Team } from '../../Context/Types/PlayerTypes';

type CustomTooltipProps = TooltipProps<ValueType, NameType> & { player: PPlayer };

const CustomTooltip = ({ active, payload, label, player }: CustomTooltipProps) => {
    const [nbaTeams, setNbaTeams] = useState<Team[]>([]);
    const {fetchNbaTeams} = useGlobalContext();

    useEffect(() => {
        const func = async () => {
            const teams = await fetchNbaTeams();
            setNbaTeams(teams);
        }

        func();
    }, [])

    if (active && payload && payload.length) {
        const team1Score = payload[0].payload.score.split('-')[0];
        const team2Score = payload[0].payload.score.split('-')[1];
        const oppTeam = payload[0].payload.opp;
        const statNames: string[] = payload[0].payload.name.split('+');
        const stats: number[] = [payload[0].payload.stat1, payload[0].payload.stat2, payload[0].payload.stat3];

        return (
            <div style={{
                width: '180px', height: '130px', background: '#000', borderRadius: '10px', 
                display:'flex', flexDirection:'column', alignItems:'center', fontSize:'14px'
            }}>
                {/* Row 1 */}
                <div style={{ display: 'flex', width: '90%', justifyContent: 'space-between', marginTop:'10px',alignItems:'center'}}>
                    <div style={{ color: '#fff', fontWeight:'bold', display:'flex', alignItems:'center'}}>
                        <Image
                            alt={'Team Logo'}
                            src={`https://cdn.nba.com/logos/nba/${nbaTeams.find(t => t.name === oppTeam)!.id}/primary/L/logo.svg`}
                            width={22} height={22}
                            style={{ marginRight:'3px' }}
                        />  
                        <b style={{ color: '#fff' }}>{convertNBATeamName(oppTeam, 0)}</b>
                    </div>

                    <div style={{ color: '#A2A2A2', fontWeight:'bold'}}>
                        {payload[0].payload.date}
                    </div>

                    <div style={{ color: '#fff', fontWeight:'bold', display:'flex', alignItems:'center'}}>
                        <b style={{ color: '#fff' }}>{convertNBATeamName(oppTeam, 0)}</b>
                        <Image
                            alt={'Team Logo'}
                            src={`https://cdn.nba.com/logos/nba/${nbaTeams.find(t => t.name === player.city)!.id}/primary/L/logo.svg`}
                            width={22} height={22}
                            style={{ marginLeft:'3px' }}
                        /> 
                    </div>
                </div>

                {/* Row 2 */}
                <div style={{ 
                    display: 'flex', width: '100%', color:'#fff', margin:'10px 0px',
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
                    display: 'flex', width: '90%', color:'#A2A2A2', margin: '5px 0px 5px 0px',
                    fontWeight:'bold', justifyContent:'space-evenly', borderTop:'1px solid #fff', height:'50%',
                    flexDirection:'column'
                }}>
                    <div style={{display:'flex', width:'100%', color:'#fff', textAlign:'center'}}>
                        {statNames.map((stat, i) => 
                            <div style={{width:'33%'}}>{stats[i]}</div>
                        )}
                    </div>

                    <div style={{display:'flex', width:'100%', textAlign:'center'}}>
                        {statNames.map((stat, i) => 
                            <div style={{width:'33%'}}>{stat}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
