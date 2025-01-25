import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { PPlayer } from '../../../../Context/Types/PlayerTypes';
import { useGlobalContext } from '../../../../Context/store';
import { SearchingBar } from './SearchingBar';
import { SuggestedPlayers } from './SuggestedPlayers';

interface Props {
    length: string, 
    setSidebarVisible?: Dispatch<SetStateAction<boolean>>
}
export const Search: React.FC<Props> = ({length, setSidebarVisible}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [similarPlayers, setSimilarPlayers] = useState<PPlayer[]>([]);
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
            let query = searchQuery.trim().toLowerCase();
            
            // const similarPlayers = findSimilarNamesNew(players, searchQuery)
            const similarPlayers = players
                .filter(p => {
                    let [firstName, lastName] = p.name.split(' ');

                    return (
                        (firstName && firstName.toLowerCase().startsWith(query)) ||
                        (lastName && lastName.toLowerCase().startsWith(query)) ||
                        (p.name.toLowerCase().startsWith(query))
                    );
                })
                .slice(0, 5);
            setSimilarPlayers(similarPlayers)
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
                    setIsPopUp={setIsPopUp}
                    setSidebarVisible={setSidebarVisible}
                    ref={popupRef} 
                    similarPlayers={similarPlayers}
                />
                    :
                null
            }
        </div>
    )
}
