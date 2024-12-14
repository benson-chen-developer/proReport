import React from 'react'
import { PGame } from '../../Context/PlayerTypes';

interface Props {
    averages: {name:string, value: number}[]
    pGames: PGame[]
}
export const Averages: React.FC<Props> = ({averages, pGames}) => {
    const fantasy: number = averages.length > 0 ? averages[averages.length-1].value : -1;

    const chunkedStats = []; //Split off the stats into 3 to render 3 on each row
    for (let i = 0; i < averages.slice(0, averages.length-1).length; i += 3) {
        chunkedStats.push(averages.slice(i, i + 3));
    }

    return (
        <div style={{
            width:'280px', height:'110px', borderRadius:'20px', backgroundColor:'#2B2B2B',
            marginLeft:'10px', display:'flex', alignItems:'center', justifyContent:'center'
        }}>
            <div style={{width:'80%', height:'85%'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'5px 0px 5px 0px'}}>
                    <p style={{fontWeight:'bold', fontSize:'14px', color:'#fff', margin:0}}>
                        Averages <span style={{color:'#B1B1B1', fontSize:'12px'}}>2024-2025</span>
                    </p>
                    <p style={{fontWeight:'bold', fontSize:'12px', color:'#fff', margin:0}}>
                        (GP) {pGames.length}
                    </p>
                </div>

                <div>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px',
                    }}>
                        <p style={{ color: '#B1B1B1', fontSize: '13px', margin: '0px', fontWeight:'bold'}}>
                            Fantasy: <span style={{ color: '#fff' }}>{fantasy.toFixed(1)}</span>
                        </p>
                    </div>

                    {chunkedStats.map((chunk, chunkIndex) => (
                        <div
                            key={chunkIndex}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginBottom: '5px',
                            }}
                        >
                            {chunk.map((stat, index) => {
                                let statAvg = (stat.value/pGames.length);
                                statAvg = isNaN(statAvg) ? 0 : statAvg;
                                statAvg = statAvg > 0 ? statAvg : 0;

                                return <p
                                    key={index}
                                    style={{
                                        color: '#B1B1B1',
                                        fontSize: '13px',
                                        margin: '0px',
                                    }}
                                >
                                    {stat.name}: <span style={{ color: '#fff' }}>{(statAvg).toFixed(1)}</span>
                                </p>
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
