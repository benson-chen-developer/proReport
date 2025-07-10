import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TeamsMatchUp } from '../../../Outlier/Hero/TeamsMatchUp';
import { useGlobalContext } from '../../../../Context/store';
import { isSameMatchup, MatchUp } from '../../../../Context/Types/Match';
import { PopularProp } from '../../../../Context/Types/ProjectionTypes';
import { Search } from './Search';
import { fetchMatchUps } from '../../../../Context/functions/fetch/fetchMatchUps';
import { LeagueBtn } from './LeagueBtn';
import { FilterBtn } from './filters/FilterBtn';
import { ProjectionsFilter } from './filters/Projections/ProjectionsFilter';
import { MatchesFilter } from './filters/Matches/MatchesFilter';
import { PlayersFilter } from './filters/Players/PlayersFilter';

interface Props {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
}

export const Header: React.FC<Props> = ({
    search, setSearch
}) => {
    const [matchUps, setMatchUps] = useState<MatchUp[]>([]);
    const {isMobile, popularProps, popularPropsFilter} = useGlobalContext();

    /* This fills the matchUps to be displayed in filter */
    useEffect(() => {
        const func = async () => {
            const fetchedMatchUps = await fetchMatchUps(
                popularPropsFilter.league,
                popularProps.flatMap(prop => prop.propRef)
            );
        
            // Only keep matches that have props in the header
            const filtered = fetchedMatchUps.filter((matchUp) =>
                popularProps.find((prop) =>
                    isSameMatchup(prop.matchUp, matchUp)
                )
            );
        
            // Keep only unique matchups
            const seen = new Set<string>();
            const uniqueFiltered = filtered.filter((matchUp) => {
                const key = `${matchUp.league}-${matchUp.time}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
        
            setMatchUps(uniqueFiltered);
        };

        func();
    }, [])


    return (
        <div style={{
            width:'100%', height:'auto', background:'#151515', borderBottom:'1px solid #fff',
            display:'flex', flexDirection:'column'
        }}>
            <p style={{
                color:'#fff', fontSize: isMobile ? '18px' : "22px", fontWeight:'bold',
                margin: isMobile ? '40px 0px 0px 10px' : '30px 0px 0px 20px', 
            }}>
                Home
            </p>

            {/* League Selection */}
            <div style={{
                width:'auto', display:'flex', justifyContent: 'flex-start',
                margin: isMobile ? '5px 15px' : '10px 15px 5px 15px'
            }}>
                {["nba", "mlb"].map((currLeague) => <LeagueBtn 
                        key={currLeague}
                        currLeague={currLeague}
                    />
                )}
            </div>

            {/* Search Player Name */}
            {/* <div style={{width:'100%', display:'flex', justifyContent: isMobile ? 'center' : 'flex-start'}}>
                <Search search={search} setSearch={setSearch}/>
            </div> */}

            {/* Filters */}
            <div style={{
                width:'auto', display:'flex', justifyContent: 'flex-start',
                margin:'5px 0px 10px 15px', 
                // overflowX: 'auto', overflowY:'initial'
            }}>
                <FilterBtn />
                
                <MatchesFilter
                    matchUps={matchUps}
                />

                <ProjectionsFilter popularProps={popularProps}/>

                <PlayersFilter 
                    popularProps={popularProps}
                />
            </div>

        </div>
    )
}

            // {/* Matches */}
            // <div style={{display:'flex', width:' 100%', marginBottom:'10px'}}>
                
            //     {/* Match Box */}
            //     <div style={{
            //         color:'#fff', fontWeight:'bold', margin:0, width: isMobile ? "15%" : '10%',
            //         display:'flex', alignItems:'center', justifyContent:'center'
            //     }}>
            //         <div style={{
            //             height: isMobile ? '30px' : '40px', borderRadius:'5px', width:'80%',
            //             marginLeft:'15px',
            //             background: matchPicked ? '#fff' : '#2B2B2B', 
            //             fontSize: isMobile ? '9px' : '14px',
            //             border:'1px solid grey',
            //             display:'flex', alignItems:'center', justifyContent:'center'
            //         }}>
            //             {matchPicked ?
            //                 <div style={{color:'#000', display:'flex', alignItems:'center'}}>
            //                     {pickedMatchUps.length} GP

            //                     <div 
            //                         onClick={() => setPickedMatchUps([])}
            //                         style={{height:'100%', display:'flex', alignItems:'center', marginLeft: isMobile ? "2px" : '5px', cursor:'pointer'}}
            //                     >
            //                         <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 24 24"><path fill="#000" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m4.207 12.793l-1.414 1.414L12 13.414l-2.793 2.793l-1.414-1.414L10.586 12L7.793 9.207l1.414-1.414L12 10.586l2.793-2.793l1.414 1.414L13.414 12z"/></svg>
            //                     </div>
            //                 </div>
            //                     :
            //                 <div>
            //                     Matches 
            //                 </div>
            //             }
            //         </div>
            //     </div>

            //     {/* Selecting MatchUps */}
            //     <div
            //         style={{
            //             display: 'flex', width: isMobile ? '85%' : '90%', overflowX: 'auto', 
            //             whiteSpace: 'nowrap'
            //         }}
            //     >
            //         {matchUps.map((matchUp, i) => 
            //             <TeamsMatchUp 
            //                 matchUp={matchUp} 
            //                 key={i} index={i}
            //                 setPickedMatchUps={setPickedMatchUps}
            //                 picked={pickedMatchUps.find(pickedMatch => 
            //                     pickedMatch.teams.some(m => matchUp.teams.some(n => n.name === m.name)) && 
            //                     pickedMatch.time === matchUp.time
            //                 ) ? true : false}
            //             />
            //         )}
            //     </div>
            // </div>