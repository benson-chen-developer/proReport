import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { PPlayer } from '../../../../Context/Types/PlayerTypes';
import { useGlobalContext } from '../../../../Context/store';
import { SearchingBar } from './SearchingBar';
import { SuggestedPlayers } from './SuggestedPlayers';
import { fetchAllPlayers, fetchPlayers } from '../../../../Context/functions/fetch/players/fetchPlayers';
import { fetchProjections } from '../../../../Context/functions/fetch/fetchProjections';

interface Props {
    length: string, 
    setSidebarVisible?: Dispatch<SetStateAction<boolean>>
}
export const Search: React.FC<Props> = ({length, setSidebarVisible}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [similarPlayers, setSimilarPlayers] = useState<PPlayer[]>([]);
    const [playersToSearch, setPlayersToSearch] = useState<PPlayer[]>([]);

    const [isPopUp, setIsPopUp] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    /* Initial Players to Search Startup */
    useEffect(() => {
        const func = async () => {
            const projections = await fetchProjections();
            const uniqueLeagues = Array.from(
                new Set(projections.map(p => p.player?.sport).filter(Boolean))
            );
            const players = await fetchAllPlayers(uniqueLeagues);
            console.log(players.find(p => p.sport.toLowerCase() === 'mlb'))

            const playersWithProps = players.filter(player =>
                projections.find(prop => {
                    return (prop.player.name === player.name && 
                    prop.league.toLowerCase() === player.sport.toLowerCase())
                })
            )

            setPlayersToSearch(playersWithProps);
        }

        func();
    }, [])

    /* Clicking outside the box closes it */
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
            let query = searchQuery.trim().toLowerCase();
            
            // const similarPlayers = players
            const similarPlayers = playersToSearch
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
