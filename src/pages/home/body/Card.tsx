import Image from 'next/image'
import React from 'react'
import { PopularProp } from './Body'

interface Props {
    prop: PopularProp,
}
export const Card: React.FC<Props>  = ({prop}) => {
    // const teamId = prop.team

    return (
        <div style={{
            width:'100%', height:'185px', borderRadius:'10px', border: '1px solid #2B2B2B',
            background:'#151515', display:'flex', justifyContent:'center', marginTop: '15px'
        }}>
            <div style={{width:'95%'}}>

                {/* PFP and Description */}
                <div style={{height:'70%', width:'100%', display:'flex'}}>
                    <div style={{width:'40%', margin:"10px 0px 0px 0px"}}>
                        <div style={{ position: 'relative', width: '100px', height: '75px'}}>
                            {/* Player Picture */}
                            <Image
                                src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${prop.player.id}.png`}
                                height={70}
                                width={95}
                                alt="Player Picture"
                            />

                            {/* Team Logo */}
                            <Image
                                src={`https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg`}
                                height={30}
                                width={30}
                                alt="Team Logo"
                                style={{
                                    position: 'absolute',
                                    bottom: 0, left: '-5px',
                                }}
                            />
                        </div>
                        <p style={{color:'#fff', fontWeight:'bold', margin:'5px 0px 0px 0px', fontSize:'16px'}}>
                            {prop.player.name}
                        </p>
                        <p style={{color:'#A2A2A2', fontWeight:'bold', margin:'5px 0px 0px 0px', fontSize:'12px'}}>
                            {prop.game}
                        </p>
                    </div>

                    <div style={{color:'#fff', width:'60%', marginTop:'10px', fontWeight:'bold'}}>
                        <p style={{fontSize:'14px'}}>
                            {prop.description}
                        </p>
                        
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div style={{width:'25px', height:'20px', background:'#000', marginRight:'10px'}}>
                                {prop.rank}th 
                            </div>
                            <p style={{color:'#A2A2A2',fontSize:'13px', margin:0}}>
                                OKL PTS Allowed
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div style={{
                    height:'30%', width:'100%', display:'flex', justifyContent:'flex-end', 
                    flexDirection:'column',
                }}>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'5px'}}>
                        <p style={{color:'#79F4F4', fontSize:'14px', fontWeight:'bold', margin:0}}>
                            {Math.round(prop.hits.filter(hit => hit).length / prop.hits.length * 100)}%
                        </p>

                        <p style={{color:'#fff', fontWeight:'bold', fontSize:'22px', margin:0}}>
                            {prop.over ? "O" : "U"} {prop.value}
                            <span style={{color:'#A2A2A2', fontSize:'14px'}}> {prop.stat}</span>
                        </p>
                    </div>

                    <div style={{width:'100%', display:'flex', gap: '3px', marginBottom:'7px', alignItems:'center'}}>
                        {prop.hits.map((hit, i) => 
                            <div 
                                style={{
                                    background: hit ? '#79F4F4' : '#A2A2A2',
                                    width:'100px', height:'4px', borderRadius:'10px'
                                }} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
