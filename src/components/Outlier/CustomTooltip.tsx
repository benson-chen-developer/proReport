import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { convertNBATeamName } from '../../Context/functions/convertNbaName';
import { convertSupportName } from '../../Context/functions/convertStatName';
import { fetchTeams } from '../../Context/functions/fetch/team/fetchTeams';
import { useGlobalContext } from '../../Context/store';
import { PPlayer, Team } from '../../Context/Types/PlayerTypes';
import { NBATeamCircle } from './Hero/TeamsMatchUp';

type CustomTooltipProps = TooltipProps<ValueType, NameType> & { player: PPlayer, chartType: 'support' | 'main' };

const CustomTooltip = ({ active, payload, label, player, chartType }: CustomTooltipProps) => {
    const [nbaTeams, setNbaTeams] = useState<Team[]>([]);

    useEffect(() => {
        const func = async () => {
            const teams = await fetchTeams(player.sport);
            // console.log('teams', teams)
            // console.log('playersport', player.sport)
            setNbaTeams(teams);
        }

        func();
    }, [])

    if (active && payload && payload.length) {
        const team1Score = payload[0].payload.score.split('-')[0];
        const team2Score = payload[0].payload.score.split('-')[1];
        const oppTeam = payload[0].payload.opp;
        const playerTeam = payload[0].payload.playerTeam;
        const stats: number[] = [];
        if (payload[0].payload.stat1Text) stats.push(payload[0].payload.stat1);
        if (payload[0].payload.stat2Text) stats.push(payload[0].payload.stat2);
        if (payload[0].payload.stat3Text) stats.push(payload[0].payload.stat3);

        let statNames: string[] = [payload[0].payload.stat1Text, payload[0].payload.stat2Text, payload[0].payload.stat3Text];
        statNames = statNames.filter(name => name !== "");

        return (
            <div style={{
                width: '180px', height: '130px', background: '#000', borderRadius: '10px', 
                display:'flex', flexDirection:'column', alignItems:'center', fontSize:'14px',
                border:'2px solid #fff'
            }}>
                {/* Row 1 */}
                <div style={{ display: 'flex', width: '90%', justifyContent: 'space-between', marginTop:'10px',alignItems:'center'}}>
                    <div style={{ color: '#fff', fontWeight:'bold', display:'flex', alignItems:'center'}}>
                        <NBATeamCircle 
                            team={nbaTeams.find(t => t.name === oppTeam)}
                        />
                        <b style={{ color: '#fff', marginLeft:'5px' }}>{convertNBATeamName(oppTeam, 0)}</b>
                    </div>

                    <div style={{ color: '#A2A2A2', fontWeight:'bold'}}>
                        {payload[0].payload.date}
                    </div>

                    <div style={{ color: '#fff', fontWeight:'bold', display:'flex', alignItems:'center'}}>
                        <b style={{ color: '#fff', marginRight:'5px' }}>{convertNBATeamName(playerTeam, 0)}</b>
                        <NBATeamCircle 
                            team={nbaTeams.find(t => t.name === playerTeam)}
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
                    <div style={{display:'flex', width:'100%', color:'#fff', textAlign:'center', justifyContent:'center'}}>
                        {statNames.map((stat, i) => 
                            <div style={{width:'33%'}} key={i}>{stats[i]}</div>
                        )}
                    </div>

                    <div style={{display:'flex', width:'100%', textAlign:'center', justifyContent:'center'}}>
                        {statNames.map((stat, i) => 
                            <div style={{width:'33%'}} key={i}>{stat}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
