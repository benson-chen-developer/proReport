import React, { Dispatch, forwardRef, SetStateAction } from 'react'
import Link from 'next/link';
import { PPlayer } from '../../../../Context/Types/PlayerTypes';
import { useGlobalContext } from '../../../../Context/store';
import Image from 'next/image';
import { SuggestedPlayer } from './SuggestedPlayer';

interface Props {
    similarPlayers: PPlayer[], 
    setIsPopUp: Dispatch<SetStateAction<boolean>>
    setSidebarVisible?: Dispatch<SetStateAction<boolean>>
}

export const SuggestedPlayers = forwardRef<HTMLDivElement, Props>(({ similarPlayers, setIsPopUp, setSidebarVisible }, ref) => {
    const {isMobile} = useGlobalContext();

    return (
        <div
            ref={ref}
            style={{
                borderRadius: "10px",
                maxHeight: "400px",
                width: isMobile ? '90%' : '120%', 
                position: 'relative',
                overflowY: "auto", border: '2px solid #393939',
                backgroundColor: "#1E1E1E", marginTop: '5px', zIndex: 3,
                overflowX: "hidden", padding: '10px',
                display:'flex', alignItems:'center', flexDirection:'column'
            }}
        >
            {similarPlayers.length > 0 ? (
                similarPlayers.map((player, index) => {
                    return <SuggestedPlayer
                        key={index} 
                        player={player}
                        setIsPopUp={setIsPopUp}
                        setSidebarVisible={setSidebarVisible}
                    />
                })
            ) : (
                <div style={{
                    padding: "15px", color: "#999", fontSize: isMobile ? '10px' : '14px' 
                }}>
                    No players found.
                </div>
            )}
        </div>
    )
});
