import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { PlayerType } from '../../../../Context/Types/PlayerTypes';
import { useGlobalContext } from '../../../../Context/store';
import { findSimilarNamesNew } from '../../../Player/Componenets/NotFound';
import { SearchingBar } from './SearchingBar';
import { SuggestedPlayers } from './SuggestedPlayers';

interface Props {
    length: string, 
}
export const Search: React.FC<Props> = ({length}) => {
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
            
            // const similarPlayers = findSimilarNamesNew(players, searchQuery)
            const similarPlayers = players
                .filter(p => p.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
                .slice(0, 5);
            setSimilarPlayers(similarPlayers);
        }

        if(searchQuery.trim().length > 0) searchForPlayer();
    }, [searchQuery])

    return (
        <div style={{ width: length, display:'flex', flexDirection:'column'}}>
            <SearchingBar 
                ref={searchRef}
                setIsPopUp={setIsPopUp}
                searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
            />
            
            {isPopUp && searchQuery.trim().length > 0? 
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
