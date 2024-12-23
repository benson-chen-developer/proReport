import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { PlayerType } from '../../../Context/PlayerTypes';
import { useGlobalContext } from '../../../Context/store';
import { findSimilarNamesNew } from '../../Player/Componenets/NotFound';
import { SearchingBar } from './SearchingBar';
import { SuggestedPlayers } from './SuggestedPlayers';

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [similarPlayers, setSimilarPlayers] = useState<PlayerType[]>([]);
    const {fetchNbaPlayers} = useGlobalContext();

    const [isPopUp, setIsPopUp] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if(
            searchRef.current && !searchRef.current.contains(event.target as Node) &&
            popupRef.current && !popupRef.current.contains(event.target as Node)
          ){
            setIsPopUp(false);
          } 
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const searchForPlayer = async () => {
            const players = await fetchNbaPlayers();
            const playerNames = players;
            
            const similarPlayers = findSimilarNamesNew(playerNames, searchQuery)
            setSimilarPlayers(similarPlayers);
        }

        searchForPlayer();
    }, [searchQuery])

    return (
        <div style={{ 
            width: "300px", display:'flex', flexDirection:'column'
        }}>
            <SearchingBar 
                ref={searchRef}
                setIsPopUp={setIsPopUp}
                searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
            />
            
            {isPopUp ? 
                <SuggestedPlayers
                    ref={popupRef} 
                    similarPlayers={similarPlayers}
                />
                    :
                null
            }
        </div>
    )
}
