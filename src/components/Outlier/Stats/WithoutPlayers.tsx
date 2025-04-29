import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../../Context/store';
import { PPlayer } from '../../../Context/Types/PlayerTypes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchPlayers } from '../../../Context/functions/fetch/players/fetchPlayers';

interface Props {
}
export const WithOutPlayers: React.FC<Props> = () => {
    const router = useRouter();
    const { paramLeague } = router.query;
    const league = paramLeague as string;

    const {isMobile, filter, setFilter, player} = useGlobalContext();
    const [players, setPlayers] = useState<PPlayer[]>([]);
    const [personName, setPersonName] = useState<string[]>([]);

    const [isPopUp, setIsPopUp] = useState<boolean>(false);

    useEffect(() => {
        const func = async () => {
            const players = await fetchPlayers(league);
            
            const teamMates = players
                .filter(otherPlayer => 
                    otherPlayer.city === player.city && 
                    player.name !== otherPlayer.name
                );
            setPlayers(teamMates);
        }

        func();
    }, [])

    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if(
            buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
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

    return (
        <div style={{width:'200px', height:'35px', borderRadius:'10px'}}>
            {/* Button */}
            <div style={{
                    display:'flex', alignItems:'center', background:'#000', border:'1px solid #5B5B5B',
                    height:'100%',  borderRadius: '10px', justifyContent:'space-evenly',
                    cursor:'pointer',userSelect: 'none'
                }}
                ref={buttonRef}
            >   
                <div 
                    onClick={() => setIsPopUp(p => !p)}
                    style={{height:'100%', display:'flex', alignItems:'center', marginLeft:'5px'}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="#fff" d="M15.2 10.95L10.55 6.3q.35-.15.713-.225T12 6q1.475 0 2.488 1.013T15.5 9.5q0 .375-.075.738t-.225.712M5.85 17.1q1.275-.975 2.85-1.537T12 15q.45 0 .863.038t.862.112l-2.2-2.2q-1.175-.15-2.012-.987T8.525 9.95L5.675 7.1q-.8 1.025-1.237 2.263T4 12q0 1.475.488 2.775T5.85 17.1m12.45-.2q.8-1.025 1.25-2.262T20 12q0-3.325-2.337-5.663T12 4q-1.4 0-2.637.45T7.1 5.7zM12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 2q2.075 0 3.888.788t3.174 2.15t2.15 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188t-3.175 2.15T12 22m0-2q1.325 0 2.5-.387t2.15-1.113q-.975-.725-2.15-1.112T12 17t-2.5.388T7.35 18.5q.975.725 2.15 1.113T12 20m0-1.5"/></svg>
                </div>
                <div 
                    onClick={() => setIsPopUp(p => !p)}
                    style={{height:'100%', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}
                >
                    <p style={{color:'#B1B1B1', fontSize:'12px', fontWeight:'bold'}}>{
                        filter.withOutPlayers.length > 0 ? 
                            `Without ${filter.withOutPlayers.length} Player(s)` :
                            'Games Without Players'
                    }</p>
                </div>

                {filter.withOutPlayers.length > 0 ? 
                  <div onClick={() => {
                    setFilter(p => ({...p, withOutPlayers: []}))
                    setIsPopUp(false)
                  }} style={{height:'100%', display:'flex', alignItems:'center', marginRight:'5px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m4.207 12.793l-1.414 1.414L12 13.414l-2.793 2.793l-1.414-1.414L10.586 12L7.793 9.207l1.414-1.414L12 10.586l2.793-2.793l1.414 1.414L13.414 12z"/></svg>
                  </div>
                  :
                <div 
                    onClick={() => setIsPopUp(p => !p)}
                  style={{height:'100%', display:'flex', alignItems:'center', marginRight:'5px'}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"/></g></svg>
                </div>
              }
            </div>

            {/* Pop Up */}
            {isPopUp ?
                <div style={{
                    width:'275px', background:'#000', borderRadius:'5px', border:'1px solid #5B5B5B',
                    position:'absolute', marginTop:'3px', display:'flex',
                    padding:'5px',
                    alignItems:'center', flexDirection:'column', zIndex:2, cursor:'pointer',
                    maxHeight: isMobile ? '175px' : '200px', overflow:'auto'
                }} ref={popupRef}>
                    {players.map((player, i) => {
                        return <div 
                            style={{width:'100%', display:'flex', justifyContent:'center', borderRadius:'5px'}}
                            className='hoverBg' key={i}
                        >
                            <div 
                                style={{
                                    width:'100%', height:'50px', display:'flex', alignItems:'center', 
                                    background: filter.withOutPlayers.includes(player.name) ? '#2B2B2B' : '',
                                    padding: '0px 20px', borderRadius:'5px'
                                }}
                                onClick={() => {
                                    const foundPlayer = filter.withOutPlayers.find(n => n === player.name);
                                    setFilter((prev) => ({
                                        ...prev,
                                        withOutPlayers: foundPlayer
                                          ? prev.withOutPlayers.filter((n) => n !== player.name)
                                          : [...prev.withOutPlayers, player.name],
                                    }));
                                }}
                            >
                                <Image
                                    alt="Player Headshot"
                                    width={25} height={25}
                                    src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`}
                                    style={{ objectFit: 'cover', marginLeft:'-5px', marginRight:'5px' }}
                                />
                                <p style={{fontWeight:'bold', color:'#fff', fontSize:'13px', marginLeft:'10px'}}>
                                    {player.name}
                                </p>
                            </div>
                        </div>
                    })}
                </div> : null
            }
        </div>
    )
}