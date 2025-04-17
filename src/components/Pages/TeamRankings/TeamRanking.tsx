import React, { useEffect, useState } from 'react'
import { fetchTeams } from '../../../Context/functions/fetch/team/fetchTeams';
import { useGlobalContext } from '../../../Context/store';
import { Team } from '../../../Context/Types/PlayerTypes';
import { MlbStats, NbaStats } from '../../../Context/Types/Stats';
import { getRank, getRankColor, Ranking } from '../../Outlier/Ranking/Ranking';
import { TeamCircle } from '../../Outlier/Hero/TeamsMatchUp';
import { useRouter } from 'next/router';

/*
    allRankings => {
        stat: 'PTS',
        rankingsByPosition: {
            name: 'PTS'
            position: 'G', 
            rank: 28,
            teamName: 'Boston'
        }[]
    }[]

    shownRanking => {
        stat: 'PTS',
        rankingsByPosition: {
            name: 'PTS'
            position: 'G', 
            rank: 28,
            teamName: 'Boston'
        }
    }[]
*/

export const TeamRanking = () => {
    const router = useRouter();
    const { paramLeague } = router.query;
    const league = paramLeague as string;

    const [pickedStat, setPickedStat] = useState<string>("");
    const [ascending, setAscending] = useState<boolean>(false);

    const [pickedPosition, setPickedPosition] = useState<string>("All");
    const [teams, setTeams] = useState<Team[]>([]);
    const [shownRankings, setShownRankings] = useState<{name: string, ranking: Ranking[]}[]>([]);

    const {isMobile} = useGlobalContext();

    const getPositons = (): string[] => {
        if(league){
            if(league.toLocaleLowerCase() === "nba") return ["All", "G", "F", "C"];
            else if(league.toLocaleLowerCase() === "mlb") return ["All"]
        } 

        return [];
    }

    const getStatKeys = () => {
        const lowerCaseLeage = league.toLowerCase();

        if(lowerCaseLeage === 'nba'){
            return Object.keys({
                PTS: 0, REB: 0, AST: 0, BLK: 0, STL: 0, PF: 0, TOV: 0,
                FGA: 0, FGM: 0, "3PA": 0, "3PM": 0, 
                FTA: 0, FTM: 0, DRB: 0, ORB: 0, 
            }) as (keyof NbaStats)[];
        } else if (lowerCaseLeage === 'mlb'){
            return Object.keys({
                HR: 0, H:0, TB: 0, AB: 0, R:0, RBI: 0, BB: 0, SO: 0, SB:0,
                '1B': 0, '2B': 0, '3B': 0, K:0, RA:0, ER:0, HA:0
            }) as (keyof MlbStats)[];
        } else {
            return [];
        }
    }
    
    useEffect(() => {
        const func = async () => {
            /* Get all the stats for this league: Ex nba is [PTS, REB, etc] */
            const statKeys = getStatKeys();
            const newTeams = await fetchTeams(league);
            setTeams(newTeams);

            /* Set Initial Picked Stat */
            let currentPickedStat = pickedStat;
            if(pickedStat === "") {
                currentPickedStat = statKeys[0];
                setPickedStat(currentPickedStat);
            }
    
            const newAllRankings: { name: string, ranking: Ranking[] }[] = [];
            statKeys.forEach(stat => {
                const allRankingsForStat = newTeams.map(team => {
                    const newRankings = getRank(newTeams, stat, team.name, pickedPosition);
                    
                    if(pickedPosition === "All") return newRankings[0];
                    else return newRankings[1];
                });
                
                newAllRankings.push({ name: stat, ranking: allRankingsForStat });
            });

            /* Sort the stat column in order */
            let rankingsByStat = newAllRankings.find(r => r.name === currentPickedStat);
            const sortedRankingsByStat = rankingsByStat!.ranking.sort((a, b) => 
                ascending ? b.rank - a.rank : a.rank - b.rank
            );
            rankingsByStat!.ranking = sortedRankingsByStat;

            /* 
                Will have to go through all the other stat columns to and align 
                their teams to the one in the sorted column 
                    - (Since all the stats are seperated into their own arrays)
            */
            const sortedTeamOrder = sortedRankingsByStat.map(r => r.teamName);

            /* Align all other stat columns to match the sorted team order */
            const otherStatsAligned = newAllRankings.map((ranking) => {
                if (ranking.name === currentPickedStat) return ranking; // Keep the sorted stat as is
                
                return {
                    ...ranking,
                    ranking: sortedTeamOrder.map(teamName => 
                        ranking.ranking.find(r => r.teamName === teamName)!
                    )
                };
            });
            
            setShownRankings(otherStatsAligned)
        }

        if(league) func();
    }, [pickedPosition, ascending, pickedStat, league])

    const entryWidth = isMobile ? "60px" : "100px";
    const entryHeight = isMobile ? "30px" : "40px";
    const upDownIconSize = isMobile ? "12" : "15";

    const teamWidth = isMobile ? '125px' : "200px";
    const borderEdgeColor = "#2B2B2B";
    // A2A2A2 2B2B2B

    if(teams.length === 0) return null;

    if(!league) return null;

    return (
        <div style={{ height: '100%', width: isMobile ? "100%" : "80%" }}>
            <div style={{margin: isMobile ? '50px 0px 15px 20px' : '40px 0px 20px 20px'}}>
                <h1 style={{color:'#fff', fontSize: isMobile ? '14px' : '20px'}}>
                    Teams Ranked By How Many Stats Are Given Up (per game)
                </h1>

                <h4 style={{color:'#B1B1B1', fontSize: isMobile ? '10px' : '12px', margin: 0}}>
                    A lower number means the team gives up more points compared to others
                </h4>
                <h4 style={{fontSize: isMobile ? '10px' : '12px', margin: '10px 0px 0px 0px' }}>
                    <span style={{color:'#FF3556', marginRight:'5px'}}>Worse Matchup</span>
                    <span style={{color:'#ede515', marginRight:'5px'}}>Average Matchup</span>
                    <span style={{color:'#18ED9D'}}>Better Matchup</span>
                </h4>
            </div>

            {/* Position Selectors */}
            <div style={{width:'100%', borderTop:'1px solid #808080', background:'#151515'}}>
                <div style={{padding: isMobile ? '10px 0px 10px 20px' : '20px 0px 20px 20px'}}>
                    <p style={{
                        margin: '0px 0px 10px 0px', fontWeight:'bold', 
                        fontSize: isMobile ? '10px' : '14px', 
                        color:'#B1B1B1'
                    }}>
                        Defense against position
                    </p>

                    <div style={{display:'flex',}}>
                        {getPositons().map((position) => <div 
                                key={position}
                                style={{
                                    fontWeight:'bold', 
                                    width: isMobile ? '40px' : '50px', 
                                    height: isMobile ? '25px' : '30px',
                                    display:'flex', justifyContent:'center', alignItems:'center',
                                    borderRadius:'25px', fontSize: isMobile ? '10px' : '13px', 
                                    marginRight:'10px',
                                    background: position === pickedPosition ? '#fff' : '#000',
                                    color: position === pickedPosition ? '' : '#fff', cursor:'pointer'
                                }}
                                onClick={() => setPickedPosition(position)}
                            >
                                {position}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div style={{display:'flex', width:'100%', overflow:'scroll'}}>
                {/* Left Table: Team Names (Fixed) */}
                <div style={{ flex: '0 0 auto', overflow: 'hidden' }}>
                    <table style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{
                                    textAlign: 'center', height:entryHeight, fontSize: isMobile ? '10px' : '14px', 
                                    width: teamWidth, color:'#EAEAEA',
                                    position: 'sticky', left: 0, zIndex: 2,
                                    borderBottom: '2px solid #2B2B2B', borderRight: '2px solid #2B2B2B',
                                    borderTop: '2px solid #2B2B2B',
                                }}>
                                    Team
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {shownRankings[0]?.ranking.map((ranking, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td style={{
                                        display: 'flex', alignItems:'center', 
                                        height: entryHeight, color:'#A2A2A2',
                                        fontWeight: 'bold', position: 'sticky', 
                                        borderRight: `1px solid ${borderEdgeColor}`, borderBottom: `1px solid ${borderEdgeColor}`,
                                        left: 0, zIndex: 1, 
                                        fontSize: isMobile ? '10px' : '12px', 
                                        background: "#151515",
                                    }}>
                                        <div style={{width: '15%', display:'flex', justifyContent:'flex-end'}}>
                                            <TeamCircle team={teams.find(team => team.name === ranking.teamName)}/>
                                        </div>

                                        <div style={{
                                            width:'85%', display:'flex', justifyContent:'center',
                                            fontSize: isMobile ? '10px' : '12px', textAlign:'center'
                                        }}>
                                            {shownRankings[0]?.ranking[rowIndex]?.teamName ?? '-'}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Right Table: Stats (Scrollable) */}
                <div style={{ overflowX: 'auto', flex: '1' }}>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr style={{ 
                                fontWeight: 'bold', color: '#EAEAEA', fontSize: isMobile ? '10px' : '14px', 
                                borderBottom: `2px solid ${borderEdgeColor}`,
                                cursor:'pointer'
                            }}>
                                {shownRankings.map((shownRanking, i) => (
                                    <th key={i} style={{ 
                                        height:entryHeight, minWidth: entryWidth, borderTop: '2px solid #2B2B2B',
                                        borderRight: `2px solid ${borderEdgeColor}` 
                                    }} onClick={() => {
                                        const currentStat = shownRanking.name;

                                        if(pickedStat === currentStat) setAscending(p => !p);
                                        else {
                                            setAscending(false);
                                            setPickedStat(shownRanking.name);
                                        }
                                    }}>
                                        <div style={{
                                            display:'flex', width:'100%', height:'100%',
                                            justifyContent:'center', alignItems:'center',
                                            userSelect: 'none'
                                        }}>
                                            <p style={{margin:0}}>{shownRanking.name}</p>

                                            {pickedStat === shownRanking.name ?
                                               <div style={{marginLeft: '5px', marginTop:'5px'}}>
                                                    {ascending ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={upDownIconSize} height={upDownIconSize} viewBox="0 0 24 24" style={{ transform: "rotate(180deg)" }}>
                                                            <path fill="currentColor" d="M12.53 7.97a.75.75 0 0 0-1.06 0l-7 7A.75.75 0 0 0 5 16.25h14a.75.75 0 0 0 .53-1.28z"/>
                                                        </svg>
                                                            :
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={upDownIconSize} height={upDownIconSize} viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M12.53 7.97a.75.75 0 0 0-1.06 0l-7 7A.75.75 0 0 0 5 16.25h14a.75.75 0 0 0 .53-1.28z"/>
                                                        </svg>
                                                    }
                                                </div>
                                                    :
                                                null
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        
                        <tbody>
                            {shownRankings[0]?.ranking.map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {shownRankings.map((shownRanking, colIndex) => (
                                        <td key={colIndex} style={{ 
                                            color: getRankColor(shownRanking.ranking[rowIndex], teams), 
                                            textAlign: 'center', height: entryHeight, 
                                            minWidth: entryWidth,
                                            borderRight: `1px solid ${borderEdgeColor}`, 
                                            borderBottom: `1px solid ${borderEdgeColor}`,
                                            fontWeight:'bold', fontSize: isMobile ? '10px' : '14px', 
                                        }}>
                                            {shownRanking.ranking[rowIndex]?.rank ?? '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
