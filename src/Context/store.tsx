'use client';
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect, ReactNode } from 'react';
import { PGame, PPlayer, Team } from './Types/PlayerTypes';
import { PopularProp, Projection } from './Types/ProjectionTypes';
import { getAllData, saveData } from './functions/cookies';
import { MatchUp } from './Types/Match';
import { fetchCachedNBAPlayers } from './functions/cookies/fetchNBAPlayers';
import { cacheMatchups, getCurrentMatchups } from './functions/cookies/matchUps';
import { dailyCheckIn } from './functions/cookies/dailyCheckIn';
import { Filter, Filters } from '../components/Outlier/Matches';
import { fetchTeams } from './functions/fetch/team/fetchTeams';

const defaultFilter: Filter = {
  isHome: false,
  isAway: false,
  stat: "PTS", 
  lastGame: "L10", 
  period: "All",
  withOutPlayers: [],
  supportingStat: "Minutes", 
  daysRested: -1,
  minutes: [0, 50],
  minutesChecked: false,
  over: true
}
const defaultFilters: Filters = {
  stats: [],
  supportingStats: ["Minutes", "Fouls"],
  lastGames: ["L5", "L10", "L20"],
  periods: [],
  minutes: [0, 50],
}
const defaultPlayer: PPlayer = {
  name: "", playerId: "", city: "",
  team: "", sport: "", position: ''
};

interface ContextProps {
  isMobile: boolean,
  setIsMobile: Dispatch<SetStateAction<boolean>>;

  projections: Projection[];
  setProjections: Dispatch<SetStateAction<Projection[]>>;
  fetchProjections: (playerName?: string) => Promise<Projection[]>;
  
  fetchMatchUps: (league: string, props?: Projection[]) => Promise<MatchUp[]>
  
  // Player Page Props
  pickedProjection: Projection | null,
  setPickedProjection: Dispatch<SetStateAction<Projection | null>>
  filter: Filter
  setFilter: Dispatch<SetStateAction<Filter>>
  filters: Filters
  setFilters: Dispatch<SetStateAction<Filters>>
  player: PPlayer
  setPlayer: Dispatch<SetStateAction<PPlayer>>
}

const GlobalContext = createContext<ContextProps>({
  isMobile: false,
  setIsMobile: (): boolean => false,

  projections: [],
  setProjections: (): Projection[] => [],
  fetchProjections: async (playerName?: string): Promise<Projection[]> => [],

  fetchMatchUps: async (league: string, props?: Projection[]): Promise<MatchUp[]> => [],

  // Player Page Props
  pickedProjection: null,
  setPickedProjection: (): Projection | null => null,
  filter: defaultFilter,
  setFilter: (): Filter => defaultFilter,
  filters: defaultFilters,
  setFilters: (): Filters => defaultFilters,
  player: defaultPlayer,
  setPlayer: (): PPlayer => defaultPlayer
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [nbaTeams, setNbaTeams] = useState<Team[]>([]);
  const [projections, setProjections] = useState<Projection[]>([]);

  /* Player Page Props */
  const [pickedProjection, setPickedProjection] = useState<Projection | null>(null);
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [player, setPlayer] = useState<PPlayer>({
    name: "", playerId: "", city: "",
    team: "", sport: "", position: ''
  });

  const [matchUps, setMatchUps] = useState<Record<string, MatchUp[]>>({ 
    'nba': []
  });

  /* When the screen size changes (Make Font .7 size of reg) */
  const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set the initial state after the component mounts
        handleResize();

        // Add resize event listener
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

  const fetchMatchUps = async (league: string, props?: Projection[]): Promise<MatchUp[]> => {
    const cachedMatchUps = localStorage.getItem('matchUps');
    let matchUps: MatchUp[] = cachedMatchUps ? JSON.parse(cachedMatchUps) : [];

    if(matchUps.length > 0){
      // console.log('matchup is cached')
    } else {
      try {
        // console.log('matchUps is not cached')

        const teams = await fetchTeams(league);
        matchUps = await cacheMatchups(teams);
        localStorage.setItem('matchUps', JSON.stringify(matchUps));
      } catch (error) {
        console.error('Error fetching matchUps', error);
        return [];
      }
    }

    const currentMatchups = getCurrentMatchups(matchUps, props);

    if (process.env.NODE_ENV === "development") {
      // console.log('currentMatchups', currentMatchups)
    }
    return currentMatchups;
  }
  const fetchProjections = async (playerName?: string): Promise<Projection[]> => {
    let newProjections: Projection[] = [];

    /* Grab Projections */
    if(projections.length > 0){
      newProjections = projections;
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/projections`);
        if (!response.ok) throw new Error('Failed to fetch Projections');
        const data = await response.json();
        setProjections(data);
        newProjections = data;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
      }
    }

    console.log('newProjections', newProjections)
    console.log(playerName)
    /* Return them */
    if(playerName) {
      return newProjections.filter(p => p.player.name === playerName);
    } else {
      return newProjections;
    }
  }
  
  return (
    <GlobalContext.Provider value={{ 
      projections, setProjections, fetchProjections,
      isMobile, setIsMobile,
      
      fetchMatchUps,

      // Player Page Props
      pickedProjection, setPickedProjection,
      filter, setFilter,
      filters, setFilters,
      player, setPlayer
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

