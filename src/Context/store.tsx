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
  
  nbaPlayers: PPlayer[];
  setNbaPlayers: Dispatch<SetStateAction<PPlayer[]>>;
  fetchNbaPlayers: () => Promise<PPlayer[]>;
  nbaMatches: PGame[];
  setNbaMatches: Dispatch<SetStateAction<PGame[]>>;
  fetchNbaMatches: (playerName?: string) => Promise<PGame[]>;
  nbaTeams: Team[];
  setNbaTeams: Dispatch<SetStateAction<Team[]>>;
  fetchNbaTeams: () => Promise<Team[]>;

  fetchMatchUps: (league?: string, props?: Projection[]) => Promise<MatchUp[]>
  
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

  nbaPlayers: [],
  setNbaPlayers: (): PPlayer[] => [],
  fetchNbaPlayers: async (): Promise<PPlayer[]> => [],
  nbaMatches: [],
  setNbaMatches: (): PGame[] => [],
  fetchNbaMatches: async (playerName?: string): Promise<PGame[]> => [],
  nbaTeams: [],
  setNbaTeams: (): Team[] => [],
  fetchNbaTeams: async (): Promise<Team[]> => [],

  fetchMatchUps: async (league?: string, props?: Projection[]): Promise<MatchUp[]> => [],

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
  const [nbaPlayers, setNbaPlayers] = useState<PPlayer[]>([]);
  const [nbaMatches, setNbaMatches] = useState<PGame[]>([]);
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

  const fetchNbaPlayers = async (): Promise<PPlayer[]> => {
    const storedPlayers = localStorage.getItem('nbaplayers');
    const nbaPlayers: PPlayer[] = storedPlayers ? JSON.parse(storedPlayers) : [];

    if(nbaPlayers.length > 0){
      // console.log('player is cached')
      return nbaPlayers;
    } else {
      try {
        // console.log('player is not cached')
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/players/nba`);
        if (!response.ok) throw new Error('Failed to fetch NBA players');
        const data = await response.json();

        localStorage.setItem('nbaplayers', JSON.stringify(data));
        setNbaPlayers(data);
        return data;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
        return [];
      }
    }
    
    // const nbaPlayers = await fetchCachedNBAPlayers();
    // return nbaPlayers;
  };
  const fetchMatchUps = async (league?: string, props?: Projection[]): Promise<MatchUp[]> => {
    const cachedMatchUps = localStorage.getItem('matchUps');
    let matchUps: MatchUp[] = cachedMatchUps ? JSON.parse(cachedMatchUps) : [];

    if(matchUps.length > 0){
      // console.log('matchup is cached')
    } else {
      try {
        // console.log('matchUps is not cached')

        const teams = await fetchNbaTeams();
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
  const fetchNbaMatches = async (playerName?: string): Promise<PGame[]> => {
    if(nbaMatches.length > 0){
      return nbaMatches;
    } else {
      try {
        let url = `${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matches/nba`;
        if(playerName) url = `${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matches/nba/${playerName}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch NBA players');
        const data = await response.json();

        let retData = data;

        if(playerName){
          const gamesPlayed = data.filter((game: PGame) => {
              const foundPlayer = game.players.find(p => p.name.toLowerCase() === playerName.toLowerCase());
              return foundPlayer?.periods.some(period => period['MIN'] > 0);
          });
          const sortedGames = gamesPlayed.sort((a: { date: string }, b: { date: string }) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          retData = sortedGames;
        } 

        setNbaMatches(retData);
        return retData;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
        return [];
      }
    }
  };
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
  const fetchNbaTeams = async (): Promise<Team[]> => {
    const cachedNbaTeams = localStorage.getItem('nbaTeams');
    const nbaTeams: Team[] = cachedNbaTeams ? JSON.parse(cachedNbaTeams) : [];

    const checkedIn = dailyCheckIn();

    if(checkedIn){
      return nbaTeams;
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/teams/nba`);
        if (!response.ok) throw new Error('Failed to fetch nba teams');
        const data = await response.json();

        localStorage.setItem('nbaTeams', JSON.stringify(data));
        return data;
      } catch (error) {
        console.error('Error fetching matchUps', error);
        return [];
      }
    }
  }
  
  return (
    <GlobalContext.Provider value={{ 
      projections, setProjections, fetchProjections,
      nbaPlayers, setNbaPlayers, fetchNbaPlayers,
      nbaMatches, setNbaMatches, fetchNbaMatches,
      nbaTeams, setNbaTeams, fetchNbaTeams,
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

