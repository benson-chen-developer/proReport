import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Filter } from '../../../components/Outlier/Matches'
import { getRank, getRankColor, Ranking } from '../../../components/Outlier/Ranking/Ranking'
import { RankNumber } from '../../../components/Outlier/Ranking/RankNumber'
import { convertNBATeamName, convertTime } from '../../../Context/functions/convertNbaName'
import { Team } from '../../../Context/Types/PlayerTypes'
import { Projection } from '../../../Context/Types/ProjectionTypes'
import { PopularProp } from './Body'

interface Props {
    prop: PopularProp,
    teams: Team[]
}
export const Card: React.FC<Props>  = ({prop, teams}) => {
    const matchUpText = `${convertNBATeamName(prop.matchUp.teams[0], 0)} vs ${convertNBATeamName(prop.matchUp.teams[1], 0)} - ${convertTime(prop.matchUp.time, 'Day')} ${convertTime(prop.matchUp.time, 'Time')}`

    const team = teams.find(t => t.name === prop.player.city);
    const oppTeam = prop.matchUp.teams.find(team => team !== prop.player.city);

    const [rankings, setRankings] = useState<Ranking[]>([]);

    useEffect(() => {
        const func = async () => {
            const rankings = getRank(teams, prop.filter, oppTeam!, `vs ${prop.player.position[prop.player.position.length-1]}`)
            setRankings(rankings);
        } 

        func();
    }, [])

    return (
        <Link
            href={{
                pathname: `/player/nba/${prop.player.name.replace(" ", "_")}`,
                query: { paramFilter: JSON.stringify(prop.filter) }, 
            }}
            target="_blank"  
            rel="noopener noreferrer"
            className='borderHover' 
            style={{
                width:'100%', height:'185px', borderRadius:'10px', border: '1px solid #2B2B2B',
                background:'#151515', display:'flex', justifyContent:'center', marginTop: '15px',
                textDecoration:'none'
            }}
        >
            <div style={{width:'95%'}}>

                {/* PFP and Description */}
                <div style={{height:'70%', width:'100%', display:'flex'}}>
                    <div style={{width:'40%', margin:"5px 0px 0px 0px"}}>
                        <div style={{ position: 'relative', width: '100px', height: '75px'}}>
                            {/* Player Picture */}
                            <Image
                                src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${prop.player.playerId}.png`}
                                height={60}
                                width={80} 
                                alt="Player Picture"
                            />

                            {/* Team Logo */}
                            <Image
                                src={`https://cdn.nba.com/logos/nba/${team?.id}/primary/L/logo.svg`}
                                height={22}
                                width={22}
                                alt="Team Logo"
                                style={{
                                    position: 'absolute',
                                    bottom: '12px', left: '-4px',
                                }}
                            />
                        </div>
                        <p style={{color:'#fff', fontWeight:'bold', margin:'-5px 0px 0px 0px', fontSize:'16px'}}>
                            {prop.player.name}
                        </p>
                        <p style={{color:'#A2A2A2', fontWeight:'bold', margin:'5px 0px 0px 0px', fontSize:'12px'}}>
                            {matchUpText}
                        </p>
                    </div>

                    <div style={{color:'#fff', width:'60%', marginTop:'10px', fontWeight:'bold'}}>
                        <p style={{fontSize:'12px'}}>
                            {createDescription(prop)}
                        </p>
                        
                        <div style={{alignItems:'center'}}>
                            <p style={{color:'#A2A2A2',fontSize:'12px', margin:'auto 0px 0px 0px'}}>
                                <span style={{color:'#fff'}}>{convertNBATeamName(oppTeam!, 0)} </span>
                                {prop.filter.stat} Allowed
                            </p>

                            <div style={{ marginRight:'20px', fontSize:'13px', display:'flex', }}>
                                {rankings.map((rank, i) => 
                                    <div style={{color: "#A2A2A2", marginTop:'5px'}}>

                                        <span style={{marginRight:'5px'}}>
                                            {i === 0 ? 'ALL:' : `${prop.player.position}:`} 
                                        </span>
                                        
                                        <span style={{color: getRankColor(rank, teams), marginRight:'20px'}}>
                                            {rank.rank}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div style={{
                    height:'30%', width:'100%', display:'flex', justifyContent:'flex-end', 
                    flexDirection:'column',
                }}>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'5px'}}>
                        <p style={{color:'#fff', fontWeight:'bold', fontSize:'22px', margin:0}}>
                            {prop.filter.over ? "O" : "U"} {prop.value}
                            <span style={{color:'#A2A2A2', fontSize:'12px'}}> {prop.filter.stat} ({prop.filter.period})</span>
                        </p>

                        <p style={{color:'#79F4F4', fontSize:'14px', fontWeight:'bold', margin:0}}>
                            {Math.round(prop.data.filter(d => d.hit).length / prop.data.length * 100)}%
                        </p>
                    </div>

                    <div style={{width:'100%', display:'flex', gap: '3px', marginBottom:'7px', alignItems:'center'}}>
                        {prop.data.map((data, i) => 
                            <div key={i}
                                style={{
                                    background: data.tie ? "#fff" : data.hit ? '#79F4F4' : '#A2A2A2',
                                    width:'100%', height:'4px', borderRadius:'10px'
                                }} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

const createDescription = (prop: PopularProp): string => {
    let str = `
        ${prop.player.name} has hit 
        ${prop.filter.over ? 'Over' : 'Under'} 
        ${prop.value} ${prop.filter.stat}
        in the last ${prop.data.length} games.
    `;

    const defaultFilter: Filter = {  
        stat: prop.filter.stat,
        over: true,
        isHome: true,
        isAway: true,
        period: 'All',
        lastGame: "L10", 
        withOutPlayers: [],
        daysRested: -1,
        minutes: [15, 45],
        supportingStat: 'Minute'
    };

    return str;
}
