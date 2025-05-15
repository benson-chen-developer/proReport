'use client';
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect, ReactNode } from 'react';
import { PGame, PPlayer, Team } from './Types/PlayerTypes';
import { PopularProp, Projection } from './Types/ProjectionTypes';
import { getAllData, saveData } from './functions/cookies';
import { MatchUp } from './Types/Match';
import { dailyCheckIn } from './functions/cookies/dailyCheckIn';
import { fetchTeams } from './functions/fetch/team/fetchTeams';
import { Filter, Filters } from '../components/Outlier/Matches';
import { HomeFilter } from '../pages/home';

const defaultFilter: Filter = {
  isHome: false,
  isAway: false,
  // stat: "", 
  pickedProjection: null,
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
  team: "", sport: "", position: '', picId:''
};

const defaultHomeFilter: HomeFilter = {
  matches: [],
  projections: [],
  players: []
}

interface ContextProps {
  isMobile: boolean,
  setIsMobile: Dispatch<SetStateAction<boolean>>;

  /* This determines whether we should compare player stats to props */
  activeProp: boolean,
  setActiveProp: Dispatch<SetStateAction<boolean>>;

  projections: Projection[];
  setProjections: Dispatch<SetStateAction<Projection[]>>;
  fetchProjections: (playerName?: string) => Promise<Projection[]>;

  popularProps: PopularProp[];
  setPopularProps: Dispatch<SetStateAction<PopularProp[]>>;
  shownPopularProps: PopularProp[];
  setShownPopularProps: Dispatch<SetStateAction<PopularProp[]>>;
  
  // Player Page Props
  pickedProjection: Projection | null,
  setPickedProjection: Dispatch<SetStateAction<Projection | null>>
  filter: Filter
  setFilter: Dispatch<SetStateAction<Filter>>
  setValidatedFilter: (val: Filter) => void;
  
  filters: Filters
  setFilters: Dispatch<SetStateAction<Filters>>
  player: PPlayer
  setPlayer: Dispatch<SetStateAction<PPlayer>>

  homeFilter: HomeFilter
  setHomeFilter: Dispatch<SetStateAction<HomeFilter>>
}

const GlobalContext = createContext<ContextProps>({
  isMobile: false,
  setIsMobile: (): boolean => false,

  activeProp: false,
  setActiveProp: (): boolean => false,

  projections: [],
  setProjections: (): Projection[] => [],
  fetchProjections: async (playerName?: string): Promise<Projection[]> => [],

  //PopularProps
  popularProps: [],
  setPopularProps: (): PopularProp[] => [],
  shownPopularProps: [],
  setShownPopularProps: (): PopularProp[] => [],

  // Player Page Props
  pickedProjection: null,
  setPickedProjection: (): Projection | null => null,
  filter: defaultFilter,
  setFilter: (): Filter => defaultFilter,
  setValidatedFilter: () => {},

  filters: defaultFilters,
  setFilters: (): Filters => defaultFilters,
  player: defaultPlayer,
  setPlayer: (): PPlayer => defaultPlayer,

  homeFilter: defaultHomeFilter,
  setHomeFilter: (): HomeFilter => defaultHomeFilter,
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [nbaTeams, setNbaTeams] = useState<Team[]>([]);
  const [projections, setProjections] = useState<Projection[]>([]);

  /* Player Page Props */
  const [pickedProjection, setPickedProjection] = useState<Projection | null>(null);
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [homeFilter, setHomeFilter] = useState<HomeFilter>(defaultHomeFilter);
  const [activeProp, setActiveProp] = useState<boolean>(false);
  const [player, setPlayer] = useState<PPlayer>({
    name: "", playerId: "", city: "",
    team: "", sport: "", position: '', picId: ''
  });

  /* Popular Props */
  const [popularProps, setPopularProps] = useState<PopularProp[]>([]);
  const [shownPopularProps, setShownPopularProps] = useState<PopularProp[]>([]);

  /* Only call this to set Filters to ensure it is always correct */
  const setValidatedFilter = (newFilter: Filter) => {
    const pickedProjection = newFilter.pickedProjection;

    if (pickedProjection) {
      const sameStatProjections = projections.filter(
          projection =>
              projection.name === pickedProjection.name &&
              projection.odds === pickedProjection.odds
      );
      const periods = Array.from(new Set(sameStatProjections.map(proj => proj.period)));

      /* Set the values of period via pickedProjection */
      newFilter.period = pickedProjection.period;
      
      if (periods.length > 0 && !periods.includes(newFilter.period)) {
          newFilter.period = periods[0];
      }
    }

    setFilter(newFilter);
  };

  /* When the screen size changes (Make Font .7 size of reg) */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const screenSizeCutOff = 1000;
    const handleResize = () => {
        setIsMobile(window.innerWidth <= screenSizeCutOff);
    };

    // Set the initial state after the component mounts
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      activeProp, setActiveProp,

      popularProps, setPopularProps,
      shownPopularProps, setShownPopularProps,
      
      // Player Page Props
      pickedProjection, setPickedProjection,
      filter, setFilter, setValidatedFilter,
      filters, setFilters,
      player, setPlayer,

      homeFilter, setHomeFilter,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

