import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import { PlayerType } from '../../../../Context/PlayerTypes';
import { findSimilarPlayerName } from '../../../Player/Componenets/NotFound';

interface Props {
    input: string
    sport: string,
    dropDown: string,
    setDropDown: Dispatch<SetStateAction<string>>,
}

export const PlayerDropDown: React.FC<Props> = ({input, sport, dropDown, setDropDown}) => {
    /*
        Only need 
            -firstname
            -lastname
            -picId
    */
    const [similarPlayers, setSimilarPlayers] = useState<PlayerType[]>([]);
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPlayers = async (): Promise<PlayerType[]> => {
        setLoading(true);
    
        try {
            const sportLower = sport.toLowerCase();
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/esport/players/${sportLower}`);
    
            if (!response.ok) {
                throw new Error("Failed to fetch players");
            }
    
            const players: PlayerType[] = await response.json();
            return players;
        } catch (error) {
            console.error("Error fetching players:", error);
            return [];
        } finally {
            setLoading(false);
        }
    };
    const getSimilarPlayers = async (players: PlayerType[]) => {
        const similarPlayers = findSimilarPlayerName(players, input, 1);
        setSimilarPlayers(similarPlayers);
    }

    useEffect(() => {
        const fetchSimilarPlayers = async () => {
            if (input !== "" && loading) {
                const players = await fetchPlayers();
                console.log("players", players)
                setPlayers(players); 
            }
            else if(input !== "" && !loading) {
                getSimilarPlayers(players);
            }
        }

        fetchSimilarPlayers();
    }, [input]);
    useEffect(() => {
        const fetchSimilarPlayers = async () => {
            if (!loading) getSimilarPlayers(players);
        }

        fetchSimilarPlayers();
    }, [loading]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropDown]);

    /* To handle closing the drop down when clicking somewhere on the screen */
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.inputFieldSearchBar') && dropDown === 'players') {
            setDropDown('');
        }
    };

    if(input.trim().length === 0) return null;
    
    if(loading) return (
        <div style={{
            width: '100%', minHeight:'50px', background:'#eaeaea', position:'absolute',
            top: '100%', left: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
            borderLeft: '2px solid black', display:'flex', alignItems:'center',
            borderRight: '2px solid black',
            borderBottom: '2px solid black',
        }}>
            <ClipLoader
                color={'#000'}
                loading={true}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )

    if(!loading && similarPlayers.length === 0) return (
        <div style={{
            width: '100%', minHeight:'50px', background:'#eaeaea', position:'absolute',
            top: '100%', left: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
            borderLeft: '2px solid black', 
            borderRight: '2px solid black',
            borderBottom: '2px solid black',
        }}>
            <div style={{
                width:'100%', height:'50px', display:'flex', alignItems:'center'
            }}>
                <p style={{marginLeft: '15px'}}>Can't Find {input}</p>
            </div>
        </div>
    )

    return (
        <div style={{
                width: '100%', position:'absolute',
                top: '100%', left: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                borderLeft: '2px solid black', 
                borderRight: '2px solid black',
                borderBottom: '2px solid black',
            }}
        >
            {similarPlayers.map((player, index) => 
                <div key={index} style={{
                        width:'100%', height:'50px', display:'flex', alignItems:'center', cursor:'pointer',
                        background:'#eaeaea', 
                        borderBottomLeftRadius: index === similarPlayers.length - 1 ? 10: 0, 
                        borderBottomRightRadius: index === similarPlayers.length - 1 ? 10 : 0,
                    }} 
                    onClick={() => {
                        window.open(`/player/${sport.toLocaleLowerCase()}/${input.trim()}`, '_blank', 'noopener,noreferrer');
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#CAC9C9'} 
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#eaeaea'} 
                >
                    {/* <PlayerPic player={player} width='25' height='25' /> */}
                    <p style={{marginLeft: '15px', fontWeight:'bold'}}>{player.name}</p>
                    <p style={{marginLeft: '5px'}}>• {player.team}</p>
                </div>
            )}
        </div>
    )
}


// type PlayerPicProps = {
//     player: PlayerType;
//     width: string;
//     height: string;
// };
// export const PlayerPic: React.FC<PlayerPicProps> = ({ player, width, height }) => {
//     return (
//         <>
//             {player.picId === "" ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 8 8" style={{ marginLeft: '10px' }}>
//                     <path
//                         fill="#1D1D1D"
//                         d="M4 0C2.9 0 2 1.12 2 2.5S2.9 5 4 5s2-1.12 2-2.5S5.1 0 4 0M1.91 5C.85 5.05 0 5.92 0 7v1h8V7c0-1.08-.84-1.95-1.91-2c-.54.61-1.28 1-2.09 1c-.81 0-1.55-.39-2.09-1"
//                     />
//                 </svg>
//             ) : (
//                 <Image
//                     src={player.picId}
//                     alt={`Headshot of ${player.firstName} ${player.lastName}`}
//                     width={50}
//                     height={35}
//                     style={{ marginLeft: '10px' }}
//                 />
//             )}
//         </>
//     );
// };