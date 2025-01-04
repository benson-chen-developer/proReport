'use client';
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect, ReactNode } from 'react';
import { CSPlayer, LolPlayer, PGame, PlayerType, PPlayer, RainbowPlayer, ValorantPlayer } from './Types/PlayerTypes';
import {apiUrl} from '../data/data';
import { MatchUp } from '../components/Outlier/Matches';
import { checkIfIsNewDay, getMatchUps } from './fetchNextGames';
import { Projection } from './Types/ProjectionTypes';

interface ContextProps {
  projections: Projection[];
  setProjections: Dispatch<SetStateAction<Projection[]>>;
  fetchProjections: () => Promise<Projection[]>;
  
  nbaPlayers: PPlayer[];
  setNbaPlayers: Dispatch<SetStateAction<PPlayer[]>>;
  fetchNbaPlayers: () => Promise<PPlayer[]>;
  nbaMatches: PGame[];
  setNbaMatches: Dispatch<SetStateAction<PGame[]>>;
  fetchNbaMatches: () => Promise<PGame[]>;

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
  fetchMatchUps: (league: string) => Promise<MatchUp[]>
}

const GlobalContext = createContext<ContextProps>({
  projections: [],
  setProjections: (): Projection[] => [],
  fetchProjections: async (): Promise<Projection[]> => [],

  nbaPlayers: [],
  setNbaPlayers: (): PPlayer[] => [],
  fetchNbaPlayers: async (): Promise<PPlayer[]> => [],
  nbaMatches: [],
  setNbaMatches: (): PGame[] => [],
  fetchNbaMatches: async (): Promise<PGame[]> => [],

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
  fetchMatchUps: async (league: string): Promise<MatchUp[]> => [],
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [nbaPlayers, setNbaPlayers] = useState<PPlayer[]>([]);
  const [nbaMatches, setNbaMatches] = useState<PGame[]>([]);
  const [valorantPlayers, setValorantPlayers] = useState<ValorantPlayer[]>([]);
  const [lolPlayers, setLolPlayers] = useState<LolPlayer[]>([]);
  const [csPlayers, setCSPlayers] = useState<CSPlayer[]>([]);
  const [rainbowPlayers, setRainbowPlayers] = useState<RainbowPlayer[]>([]);
  const [comboPopUp, setComboPopUp] = useState<boolean>(false);
  const [playersInCombo, setPlayersInCombo] = useState<PlayerType[]>([]);
  const [projections, setProjections] = useState<Projection[]>([]);

  const [lastDateChecked, setLastDateChecked] = useState<Record<string, Date>>({ 
    'nba': new Date('2024-12-01T00:00:00Z')
  });
  const [matchUps, setMatchUps] = useState<Record<string, MatchUp[]>>({ 
    'nba': []
  });

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
    if(nbaPlayers.length > 0){
      return nbaPlayers;
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/players/nba`);
        if (!response.ok) throw new Error('Failed to fetch NBA players');
        const data = await response.json();
        setNbaPlayers(data);
        return data;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
        return [];
      }
    }
  };
  const fetchNbaMatches = async (): Promise<PGame[]> => {
    if(nbaMatches.length > 0){
      return nbaMatches;
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/matches/nba`);
        if (!response.ok) throw new Error('Failed to fetch NBA players');
        const data = await response.json();
        setNbaMatches(data);
        return data;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
        return [];
      }
    }
  };
  const fetchMatchUps = async (league: string): Promise<MatchUp[]> => {
    let isNewDay = checkIfIsNewDay(lastDateChecked[league]);    

    if(isNewDay){
      console.log('isnewday')
      const currentMatchUps = await getMatchUps(league, matchUps, setMatchUps);
      setLastDateChecked(prev => ({ ...prev, [league]: new Date() }));
      setMatchUps(prev => ({ ...prev, [league]: currentMatchUps }));

      return currentMatchUps;
    } else {
      console.log('is NOT newday')
      return matchUps[league];
    }
  }
  const fetchProjections = async (): Promise<Projection[]> => {
    if(projections.length > 0){
      return projections;
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/projections`);
        if (!response.ok) throw new Error('Failed to fetch Projections');
        const data = await response.json();
        setProjections(data);
        return data;
      } catch (error) {
        console.error('Error fetching Lol players:', error);
        return [];
      }
    }
  }
  
  return (
    <GlobalContext.Provider value={{ 
      projections, setProjections, fetchProjections,
      nbaPlayers, setNbaPlayers, fetchNbaPlayers,
      nbaMatches, setNbaMatches, fetchNbaMatches,
      
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
