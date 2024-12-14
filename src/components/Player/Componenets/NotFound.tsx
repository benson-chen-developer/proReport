import React from 'react'
import Image from 'next/image';
import { useGlobalContext } from '../../../Context/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useEffect } from 'react';
import { PlayerType, PPlayer, WNBAPlayer } from '../../../Context/PlayerTypes';
import { searchPlayer } from '../../Nav/SearchBar/SearchBar';
// import { PlayerPic } from '../../Nav/SearchBar/DropDown/PlayerDropDown';

interface Props{
}

/*
    Don't worry what this does just know it is used to find similar names to the one
    the user searched
*/
const levenshteinDistance = (a: string, b: string): number => {
    a = a.toLocaleLowerCase(); b = b.toLocaleLowerCase();

    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
};

/*
    Returns all the player names that are similar to the one we searched
*/
export const findSimilarPlayerName = (players: PlayerType[], input: string, maxAllowedDistance: number): any[] => {
    const trimmedInput = input.trim();

    let firstName = ''; let lastName = ''; 
    let foundPlayers = new Set<any>();

    /* This means if the user has used a space while typing */
    if (trimmedInput.split(' ').length > 1) {
        firstName = trimmedInput.split(' ')[0];
        lastName = trimmedInput.split(' ')[1];
    
        for (const player of players) {
            if (levenshteinDistance(player.name, firstName) <= maxAllowedDistance) {
                foundPlayers.add(player);
            }
            if (foundPlayers.size >= 5) break;
        }
    } else {
        for (const player of players) {
            if (levenshteinDistance(player.name, trimmedInput) <= maxAllowedDistance) {
                foundPlayers.add(player);
            }
            if (foundPlayers.size >= 5) break;
        }
        firstName = trimmedInput;
    }
    // console.log(foundPlayers)
    
    return Array.from(foundPlayers);
};

export const findSimilarNames = (players: PlayerType[], firstName: string, lastName: string): PlayerType[] => {
    if(firstName) firstName = firstName.trim(); 
    if(lastName) lastName = lastName.trim(); 
    let foundPlayers = new Set<any>();

    if (firstName && lastName) {
        for (const player of players) {
            if (levenshteinDistance(player.name, firstName) <= 2) {
                foundPlayers.add(player);
            }
            if (foundPlayers.size >= 5) break;

            // if (levenshteinDistance(player.lastName, lastName) <= 2) {
            //     foundPlayers.add(player);
            // }
            // if (foundPlayers.size >= 5) break;
        }
    } else {
        /* This code runs if they typed one thing only so we have to check that name with the first and last name */
        for (const player of players) {
            if (levenshteinDistance(player.name, firstName) <= 2) {
                foundPlayers.add(player);
            }
            if (foundPlayers.size >= 5) break;

            // if (levenshteinDistance(player.name, firstName) <= 2) {
            //     foundPlayers.add(player);
            // }
            // if (foundPlayers.size >= 5) break;
        }
    }
    
    return Array.from(foundPlayers);
};

export const findSimilarNamesNew = (players: PlayerType[], searchQuery: string): PlayerType[] => {
    let foundPlayer = new Set<any>();
    if(searchQuery.trim().length === 0) return [];

    for (const player of players) {
        const name = player.name;
        const firstName = name.split(' ')[0];
        const lastName = name.split(' ')[1] ? name.split(' ')[1] : '';

        if (levenshteinDistance(firstName, searchQuery) <= 2) {
            foundPlayer.add(player);
        }
        if (foundPlayer.size >= 5) break;
    }
    
    return Array.from(foundPlayer);
};

/*
    We only need the paramPlayer name

    1) Make a call depending on league to get all the players of that league
    2) The players will be PlayerType so we can just try to find their names with findSimilarLastNames
    3) Anyone returned is displayed
*/
export const NotFound: React.FC<Props> = ({}) => {
    const {
        fetchWnbaPlayer, fetchLolPlayers, fetchValorantPlayers, fetchCSPlayers,
        fetchRainbowPlayers
    } = useGlobalContext();
    const router = useRouter();
    const { paramPlayer, paramLeague } = router.query;
    const firstName = (paramPlayer as string).split('_')[0]; 
    const lastName = (paramPlayer as string).split('_')[1];
    const [allPlayers, setAllPlayers] = useState<PlayerType[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [similarPlayers, setSimilarPlayers] = useState<PlayerType[]>([]);

    useEffect(() => {
        let players: PlayerType[] = [];
        
        const fetchPlayers = async () => {
            if ((paramLeague as string).toLowerCase() === 'lol') {
                players = await fetchLolPlayers();
            }
            else if((paramLeague as string).toLowerCase() === 'valorant') {
                players = await fetchValorantPlayers();
            }
            else if((paramLeague as string).toLowerCase() === 'wnba') {
                players = await fetchWnbaPlayer();
            }
            else if((paramLeague as string).toLowerCase() === 'cs') {
                players = await fetchCSPlayers();
            }
            else if((paramLeague as string).toLowerCase() === 'rainbow') {
                players = await fetchRainbowPlayers();
            }

            setAllPlayers(players);
            setSimilarPlayers(findSimilarNames(players, firstName, lastName));
            setIsLoading(false);
        };

        if(paramLeague) fetchPlayers();
    }, [])

    if(isLoading) return <ClipLoader
        color={'#000'}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />

    return(
        <div style={{
            width:'100%', minHeight:'100vh', justifyContent:'center', alignItems:'center',
            display:'flex', flexDirection:'column'
        }}>
            {similarPlayers.length === 0 ?
                <>
                    <h2 style={{}}>This Player Doesn't Exist or Has No Games</h2>
                </> 
                    :
                <div style={{display:'flex', alignItems:'center', flexDirection:'column', width:'100%'}}>
                    <h2>Did You Mean</h2>
                    
                    {/* <div style={{display:'flex'}}>
                        {similarPlayers.map((player, index) => 
                            <PlayerBox player={player} key={index}/>
                        )}
                    </div> */}
                </div>
            }
        </div>
    )
}

type PlayerBoxProps = {
    player: PlayerType;
};
  
// const PlayerBox: React.FC<PlayerBoxProps> = ({ player }) => {
//     return(
//         <div style={{
//             width:'200px', height:'100px', border:'2px solid #1E1E1E', borderRadius:20,
//             display:'flex', alignItems:'center', margin:'20px',
//             cursor:'pointer'
//         }} onClick={() => {
//             if(player.name){
//                 searchPlayer(`${player.firstName}_${player.lastName}`, player.sport)
//             } else {
//                 searchPlayer(`${player.firstName}_`, player.sport)
//             }
//         }}>
//             <PlayerPic player={player} width={"50%"} height={'75%'}/>
//             <p>{player.firstName} {player.lastName}</p>
//         </div>
//     )
// }