import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import { getRank, getRankColor, Ranking } from '../../../Outlier/Ranking/Ranking'
import { convertTeamName, convertTime } from '../../../../../Context/functions/convertTeamName'
import { Team } from '../../../../../Context/Types/PlayerTypes'
import { PopularProp, Projection } from '../../../../../Context/Types/ProjectionTypes'
import { TeamCircle } from '../../../../Outlier/Hero/TeamsMatchUp'
import { Filter } from '../../../../Outlier/Matches'
import { getHeadshotUrl } from '../../../../../Context/functions/urls/getUrls'
import { Headshot } from './Headshot'
import { NameAndMatchData } from './NameAndMatchData'
import { CardHitsAndMisses } from './CardHitsAndMisses'
import { CardRanking } from './CardRanking'
import { CardOdds } from './CardOdds'

interface Props {
    popularProp: PopularProp,
    teams: Team[]
}
export const Card: React.FC<Props>  = ({popularProp, teams}) => {
    const prop: Projection = popularProp.propRef;
    const getFiltersText = (filter: Filter): string[] => {
        let strArr: string[] = [];

        if(filter.isAway && !filter.isHome) strArr.push('At Away')
        if(filter.isHome && !filter.isAway) strArr.push('At Home')
        if(filter.lastGame === "H2H") strArr.push('H2H')

        return strArr;
    }

    const hits = popularProp.popularHits.filter(hit => hit === "hit" || hit === "tie").length;
    const historyLen = popularProp.popularHits.length;
    const hitMissPercent = Math.round(hits / historyLen * 100);
    const overUnder = popularProp.popularGameFilter.over ? "Over" : "Under";
    const statName = popularProp.propRef.name;
    const statValue = popularProp.propRef.values[popularProp.propRef.values.length-1];

    const team: Team = teams.find(t => t.name === popularProp.propRef.player.team)!;
    const oppTeam = popularProp.matchUp.teams.find(team => team.name !== popularProp.propRef.player.city);

    // const [rankings, setRankings] = useState<Ranking[]>([]);

    useEffect(() => {
        const func = async () => {
            // const rankings = getRank(teams, popularProp.prop.popularGameFilter.stat, oppTeam?.name!, `${popularProp.prop.player.position}`)
            // setRankings(rankings);
        } 

        func();
    }, [popularProp])

    // if(rankings.length === 0) return null;

    // return null;
    return (
        <Link
            href={{
                pathname: `/player/nba/${prop.player.name.replace(" ", "_")}`,
                // query: { paramFilter: JSON.stringify(popularProp.popularGameFilter), paramPropValue: popularProp.prop.values[popularProp.prop.values.length-1] }, 
            }}
            target="_blank"  
            rel="noopener noreferrer"
            className='hoverBgDarker' 
            style={{
                width:'99%',
                // height:'60px', 
                borderRadius:'10px', border: '1px solid #2B2B2B',
                // background:'#151515',
                display:'flex', flexDirection:'column',
                padding: '.5rem 0',
                textDecoration:'none', marginBottom:'2px', alignItems:'center'
            }}
        >
            {/* Top Part */}
            <div style={{width:'100%', display:'flex', alignItems:'center', height:'3rem'}}>
                {/* Headshot */}
                <Headshot popularProp={popularProp}/>
                
                {/* Player Name + Match (LeBron James /n LAL vs BOS - Today 4:05PM) */}
                <NameAndMatchData popularProp={popularProp} />
                
                {/* Stats */}
                <div style={{width:'100px'}}>
                    <p style={{color:'#fff', fontWeight:'bold', margin:'0px', fontSize:'14px'}}>
                        {overUnder} {statValue} 
                    </p>
                    <p style={{color:'#A2A2A2', fontWeight:'bold', margin:'0.25rem 0px 0px 0px', fontSize:'12px'}}>
                        {statName} 
                    </p>
                </div>

                {/* Rankings */}
                <CardRanking popularProp={popularProp} />

                {/* Odds (-114) */}
                <CardOdds popularProp={popularProp} />
            </div>


            {/* Bottom Part */}
            <div style={{width:'100%', display:'flex'}}>

                {/* Projection */}
                <CardHitsAndMisses popularProp={popularProp}/>

            </div>
        </Link>
    )
}


        {/* {getFiltersText(popularProp.prop.popularGameFilter).length !== 0 ?
            <div style={{fontSize:'12px', color:'#A2A2A2', marginTop:'15px'}}>
                <div style={{display:'flex'}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#fff"
                            d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2z"
                        />
                    </svg>
                    <span style={{color:'#fff', marginLeft:'5px'}}>
                        Game Conditions
                    </span>
                </div>

                {getFiltersText(popularProp.prop.popularGameFilter).map((str, i) => 
                    <p style={{margin: '5px 0px 0px 0px'}} key={i}>
                        - {str}
                    </p>
                )}
            </div> : null
        } */}
    {/* </div> */}

{/* </div> */}