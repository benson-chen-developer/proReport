import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { PlayerType } from '../../../Context/PlayerTypes';
import { useGlobalContext } from '../../../Context/store';
import { findSimilarNamesNew } from '../../Player/Componenets/NotFound';
import { SuggestedPlayers } from './SuggestedPlayers';

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [similarPlayers, setSimilarPlayers] = useState<PlayerType[]>([]);
    const {fetchNbaPlayers} = useGlobalContext();

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
            width: "300px", display:'flex', alignItems:'center',flexDirection:'column'
        }}>
            <SearchingBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            <SuggestedPlayers similarPlayers={similarPlayers}/>
        </div>
    )
}

interface Props {
    searchQuery:string, 
    setSearchQuery: Dispatch<SetStateAction<string>>
}
const SearchingBar: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div
            style={{
                width: "100%", height: "50px", marginTop:'10px',
                borderRadius: "10px", display:'flex',
                background: "#2B2B2B", alignItems:'center'
            }}
        >
            {/* Search Part */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for players"
                style={{
                    width: "95%", fontSize: "15px", 
                    height: "100%", borderRadius: "15px",
                    border: "0px solid #ccc", marginLeft:'10px',
                    background: "#2B2B2B",
                    color: "#fff",
                    outline: "none", boxShadow: "none",
                }}
            />

            {/* X Btn */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                    marginRight:'10px', fill: "white", cursor: "pointer",
                }}
                onClick={() => setSearchQuery('')}
            >
                <path
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m15 9l-6 6m0-6l6 6m6-3a9 9 0 1 1-18 0a9 9 0 0 1 18 0"
                />
            </svg>
        </div>
    );
};

