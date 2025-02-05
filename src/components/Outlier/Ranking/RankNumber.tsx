import React from 'react'
import { Team } from '../../../Context/Types/PlayerTypes';
import { Ranking } from './Ranking';

interface Props {
    rankings: Ranking[]
    teams: Team[],
    selectedOption: string /* "vs C" */
}
export const RankNumber: React.FC<Props> = ({rankings, teams, selectedOption}) => {
    return (
        <div>
            {rankings.map((ranking, index) => {
                let color = '';
                const percent = (ranking.rank / teams.length);
                
                if(percent <= .33) color = '#18ED9D';
                else if (percent <= .60) color = '#ede515';
                else color = '#FF3556';

                return (
                    <div key={index} style={{width:'100%', display:'flex', marginBottom:'15px'}}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff', width:'60%' }}> 
                            {ranking.name} 
                            {index !== 0 ? 
                                <span style={{color:'#808080'}}> ({selectedOption}) </span> : null
                            }
                        </div>

                        <div style={{display:'flex', width:'40%'}}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#B1B1B1', width:'50%', textAlign:'center' }}>
                                {/* {ranking.value} */}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', color: color, width:'50%', textAlign:'center' }}>
                                {ranking.rank}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
