import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TeamsMatchUp } from '../../../Outlier/Hero/TeamsMatchUp';
import { useGlobalContext } from '../../../../Context/store';
import { MatchUp } from '../../../../Context/Types/Match';

interface Props {
    pickedMatchUps: MatchUp[],
    setPickedMatchUps: Dispatch<SetStateAction<MatchUp[]>>
}

export const Header: React.FC<Props> = ({pickedMatchUps, setPickedMatchUps}) => {
    const [matchUps, setMatchUps] = useState<MatchUp[]>([]);
    const {fetchMatchUps, isMobile} = useGlobalContext();

    useEffect(() => {
        const func = async () => {
            const matchUps = await fetchMatchUps();
            setMatchUps(matchUps);
        }

        func();
    }, [])

    const matchPicked = pickedMatchUps.length > 0;

    return (
        <div style={{
            width:'100%', height:'20vh', background:'#151515', borderBottom:'1px solid #fff',
            display:'flex', flexDirection:'column'
        }}>
            <p style={{
                color:'#fff', fontSize: isMobile ? '18px' : "22px", fontWeight:'bold',
                margin: isMobile ? '40px 0px 0px 10px' : '30px 0px 0px 20px', 
            }}>
                Home
            </p>

            {/* Matches */}
            <div style={{display:'flex', width:' 100%', marginTop:'auto', marginBottom:'10px'}}>
                <div style={{
                    color:'#fff', fontWeight:'bold', margin:0, width: isMobile ? "15%" : '10%',
                    display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                    <div style={{
                        height: isMobile ? '30px' : '40px', borderRadius:'5px', width:'80%',
                        marginLeft:'10%',
                        background: matchPicked ? '#fff' : '#2B2B2B', 
                        fontSize: isMobile ? '10px' : '14px',
                        border:'1px solid grey',
                        display:'flex', alignItems:'center', justifyContent:'center'
                    }}>
                        {matchPicked ?
                            <div style={{color:'#000', display:'flex', alignItems:'center'}}>
                                {pickedMatchUps.length} GP

                                <div 
                                    onClick={() => setPickedMatchUps([])}
                                    style={{height:'100%', display:'flex', alignItems:'center', marginLeft:'5px', cursor:'pointer'}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m4.207 12.793l-1.414 1.414L12 13.414l-2.793 2.793l-1.414-1.414L10.586 12L7.793 9.207l1.414-1.414L12 10.586l2.793-2.793l1.414 1.414L13.414 12z"/></svg>
                                </div>
                            </div>
                                :
                            <div>
                                Matches 
                            </div>
                        }
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex', width: isMobile ? '85%' : '90%', overflowX: 'auto', 
                        whiteSpace: 'nowrap'
                    }}
                >
                    {matchUps.map((matchUp, i) => 
                        <TeamsMatchUp 
                            matchUp={matchUp} 
                            key={i} index={i}
                            setPickedMatchUps={setPickedMatchUps}
                            picked={pickedMatchUps.find(m => m.teams[0] === matchUp.teams[0] && m.time === matchUp.time) ? true : false}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
