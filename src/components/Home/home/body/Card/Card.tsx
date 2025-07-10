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
import { useGlobalContext } from '../../../../../Context/store'

interface Props {
    popularProp: PopularProp,
    teams: Team[]
}
export const Card: React.FC<Props>  = ({popularProp, teams}) => {
    const {isMobile} = useGlobalContext();

    const prop: Projection = popularProp.propRef;

    const hits = popularProp.popularHits.filter(hit => hit === "hit" || hit === "tie").length;
    const historyLen = popularProp.popularHits.length;
    const hitMissPercent = Math.round(hits / historyLen * 100);
    const overUnder = popularProp.popularGameFilter.over ? "Over" : "Under";
    const statName = popularProp.propRef.name;
    const statValue = popularProp.propRef.values[popularProp.propRef.values.length-1];

    /* 
        Adds the query to the player page link that auto sets the filter 
            - Ex: If this card is for home games clicking on it will auto
            set the player page to show home games
    */
    const createFilterQuery = (popularProp: PopularProp) => {
        const filter = popularProp.popularGameFilter;
        const prop = popularProp.propRef;
    
        const query: Record<string, string | boolean> = {
            propName: prop.name,
            propValue: prop.values[prop.values.length - 1].toString(),
            lastGame: filter.lastGame,
            period: filter.period,
        };
    
        if (filter.isHome) query.isHome = true;
        else if (filter.isAway) query.isAway = true;
    
        return query;
    };

    return (
        <Link
            href={{
                pathname: `/player/${prop.league}/${prop.player.name.replace(" ", "_")}`,
                query: createFilterQuery(popularProp), 
            }}
            target="_blank"  
            rel="noopener noreferrer"
            className='hoverBgDarker' 
            style={{
                width:'98%',
                // height:'60px', 
                borderRadius:'10px', border: '1px solid #2B2B2B',
                // background:'#151515',
                display:'flex', flexDirection:'column',
                padding: '.5rem 0px',
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
                    <p style={{
                        color:'#fff', fontWeight:'bold', margin:'0px', 
                        fontSize: isMobile ? "10px" : '14px'
                    }}>
                        {overUnder} {statValue} 
                    </p>
                    <p style={{
                        color:'#A2A2A2', fontWeight:'bold', margin:'0.25rem 0px 0px 0px', 
                        fontSize: isMobile ? "10px" : '12px'
                    }}>
                        {statName} 
                    </p>
                </div>

                {/* Rankings */}
                <CardRanking 
                    teams={teams}
                    popularProp={popularProp} 
                />

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