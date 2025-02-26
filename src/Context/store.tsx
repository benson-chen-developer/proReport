'use client';
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect, ReactNode } from 'react';
import { CSPlayer, LolPlayer, PGame, PlayerType, PPlayer, RainbowPlayer, Team, ValorantPlayer } from './Types/PlayerTypes';
import { Projection } from './Types/ProjectionTypes';
import { getAllData, saveData } from './functions/cookies';
import { MatchUp } from './Types/Match';
import { fetchCachedNBAPlayers } from './functions/cookies/fetchNBAPlayers';
import { cacheMatchups, getCurrentMatchups } from './functions/cookies/matchUps';


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

  valorantPlayers: ValorantPlayer[];
  setValorantPlayers:  Dispatch<SetStateAction<ValorantPlayer[]>>;
  fetchValorantPlayers: () => Promise<ValorantPlayer[]>;
  lolPlayers: LolPlayer[],
  setLolPlayers: Dispatch<SetStateAction<LolPlayer[]>>,
  fetchLolPlayers: () => Promise<LolPlayer[]>,
  csPlayers: CSPlayer[],
  setCSPlayers: Dispatch<SetStateAction<CSPlayer[]>>,
  fetchCSPlayers: () => Promise<CSPlayer[]>,
  rainbowPlayers: RainbowPlayer[],
  setRainbowPlayers: Dispatch<SetStateAction<RainbowPlayer[]>>,
  fetchRainbowPlayers: () => Promise<RainbowPlayer[]>,
  comboPopUp: boolean,
  setComboPopUp: Dispatch<SetStateAction<boolean>>,
  playersInCombo: PlayerType[],
  setPlayersInCombo: Dispatch<SetStateAction<PlayerType[]>>,
  fetchMatchUps: (league?: string) => Promise<MatchUp[]>
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

  valorantPlayers: [],
  setValorantPlayers:  (): ValorantPlayer[] => [],
  fetchValorantPlayers: async (): Promise<ValorantPlayer[]> => [],
  lolPlayers: [],
  setLolPlayers:  (): LolPlayer[] => [],
  fetchLolPlayers: async (): Promise<LolPlayer[]> => [] ,
  csPlayers: [],
  setCSPlayers: (): CSPlayer[] => [],
  fetchCSPlayers: async (): Promise<CSPlayer[]> => [] ,
  rainbowPlayers: [],
  setRainbowPlayers: (): CSPlayer[] => [],
  fetchRainbowPlayers: async (): Promise<CSPlayer[]> => [] ,
  comboPopUp: false,
  setComboPopUp: (): boolean => false,
  playersInCombo: [],
  setPlayersInCombo: (): PlayerType[] => [],
  fetchMatchUps: async (league?: string): Promise<MatchUp[]> => [],
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [nbaPlayers, setNbaPlayers] = useState<PPlayer[]>([]);
  const [nbaMatches, setNbaMatches] = useState<PGame[]>([]);
  const [nbaTeams, setNbaTeams] = useState<Team[]>([]);
  const [valorantPlayers, setValorantPlayers] = useState<ValorantPlayer[]>([]);
  const [lolPlayers, setLolPlayers] = useState<LolPlayer[]>([]);
  const [csPlayers, setCSPlayers] = useState<CSPlayer[]>([]);
  const [rainbowPlayers, setRainbowPlayers] = useState<RainbowPlayer[]>([]);
  const [comboPopUp, setComboPopUp] = useState<boolean>(false);
  const [playersInCombo, setPlayersInCombo] = useState<PlayerType[]>([]);
  const [projections, setProjections] = useState<Projection[]>([]);

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


  const fetchValorantPlayers = async (): Promise<ValorantPlayer[]> => {
    if(valorantPlayers.length > 0){
      return valorantPlayers;
    } else {
      try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/valorant/dummy/players`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/valorant/players`);
        if (!response.ok) throw new Error('Failed to fetch Valorant players');
        const data = await response.json();
        setValorantPlayers(data);
        return data;
      } catch (error) {
        console.error('Error fetching Valorant players:', error);
        return [];
      }
    }
  };
  const fetchLolPlayers = async (): Promise<LolPlayer[]> => {
    if(lolPlayers.length > 0){
      console.log("Cached Lol");
      return lolPlayers;
    } else {
      try {
        console.log("Not Cached Lol");
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/lol/allPlayers`);
        if (!response.ok) throw new Error('Failed to fetch Lol players');

        const data = await response.json();
        setLolPlayers(data);
        return data;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
        return [];
      }
    }
  };
  const fetchCSPlayers = async (): Promise<CSPlayer[]> => {
    if(csPlayers.length > 0){
      return csPlayers;
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/cs/players`);
        if (!response.ok) throw new Error('Failed to fetch CS players');

        const data = await response.json();
        setCSPlayers(data);
        return data;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
        return [];
      }
    }
  };
  const fetchRainbowPlayers = async (): Promise<CSPlayer[]> => {
    if(rainbowPlayers.length > 0){
      return rainbowPlayers;
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/rainbow/players`);
        if (!response.ok) throw new Error('Failed to fetch R6 players');
        const data = await response.json();
        console.log(data)
        setRainbowPlayers(data);
        return data;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
        return [];
      }
    }
  };
  const fetchNbaPlayers = async (): Promise<PPlayer[]> => {
    const storedPlayers = localStorage.getItem('nbaplayers');
    const nbaPlayers: PPlayer[] = storedPlayers ? JSON.parse(storedPlayers) : [];

    if(nbaPlayers.length > 0){
      console.log('player is cached')
      return nbaPlayers;
    } else {
      try {
        console.log('player is not cached')
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
  const fetchMatchUps = async (league?: string): Promise<MatchUp[]> => {
    const cachedMatchUps = localStorage.getItem('matchUps');
    let matchUps: MatchUp[] = cachedMatchUps ? JSON.parse(cachedMatchUps) : [];

    if(matchUps.length > 0){
      console.log('matchup is cached')
    } else {
      try {
        console.log('matchUps is not cached')

        const teams = await fetchNbaTeams();
        matchUps = await cacheMatchups(teams);
        localStorage.setItem('matchUps', JSON.stringify(matchUps));
      } catch (error) {
        console.error('Error fetching matchUps', error);
        return [];
      }
    }

    const currentMatchups = getCurrentMatchups(matchUps);

    if (process.env.NODE_ENV === "development") {
      console.log('currentMatchups', currentMatchups)
    }
    return currentMatchups;
    // localStorage.setItem('matchUps', JSON.stringify([]));
    // console.log('cleared cache')
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
  // const fetchNbaMatches = async (playerName?: string): Promise<PGame[]> => {
  //   const cachedGames = await getAllData();
  //   let allGames: PGame[] = [];

  //   if(cachedGames.length === 0){
  //     console.log('empty cahce')
  //     let url = `${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matches/nba`;
  //     const response = await fetch(url);

  //     if (!response.ok) throw new Error('Failed to fetch NBA Match');
  //     const data = await response.json();
  //     allGames = data;
  //     saveData(data);
  //   } else {
  //     console.log('full cahce')
  //     allGames = cachedGames;
  //   }

  //   if(playerName){
  //     const gamesPlayed = allGames.filter((game: PGame) => {
  //         const foundPlayer = game.players.find(p => p.name.toLowerCase() === playerName.toLowerCase());
  //         return foundPlayer?.periods.some(period => period['MIN'] > 0);
  //     });
  //     const sortedGames = gamesPlayed.sort((a: { date: string }, b: { date: string }) => {
  //         return new Date(b.date).getTime() - new Date(a.date).getTime();
  //     });

  //     return sortedGames;
  //   } 

  //   return allGames;;
  // }

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

    if(nbaTeams.length > 0){
      console.log('nbaTeams is cached')
      return nbaTeams;
    } else {
      try {
        console.log('nbaTeams is not cached')
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

    // if(nbaTeams.length > 0){
    //   return nbaTeams;
    // } else {
    //   try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/teams/nba`);
    //     if (!response.ok) throw new Error('Failed to fetch nba teams');
    //     const data = await response.json();
    //     setNbaTeams(data);
    //     return data;
    //   } catch (error) {
    //     console.error('Error fetching Lol players:', error);
    //     return [];
    //   }
    // }
  }
  
  return (
    <GlobalContext.Provider value={{ 
      projections, setProjections, fetchProjections,
      nbaPlayers, setNbaPlayers, fetchNbaPlayers,
      nbaMatches, setNbaMatches, fetchNbaMatches,
      nbaTeams, setNbaTeams, fetchNbaTeams,
      isMobile, setIsMobile,
      
      valorantPlayers, setValorantPlayers, fetchValorantPlayers,
      lolPlayers, setLolPlayers, fetchLolPlayers,
      csPlayers, setCSPlayers, fetchCSPlayers,
      rainbowPlayers, setRainbowPlayers, fetchRainbowPlayers,
      comboPopUp, setComboPopUp,
      playersInCombo, setPlayersInCombo,
      fetchMatchUps
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
