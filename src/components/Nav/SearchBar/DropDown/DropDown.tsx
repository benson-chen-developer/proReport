import React, { useEffect, useState } from 'react'
import { PlayerType } from '../../../../Context/PlayerTypes';
import { ClipLoader } from 'react-spinners';
import { SportDropDown } from './SportDropDown';
import { PlayerDropDown } from './PlayerDropDown';

interface Props {
    input: string;
    sport: string;
    setDropDown: React.Dispatch<React.SetStateAction<string>>;
    setSport: React.Dispatch<React.SetStateAction<string>>;
    dropDown: string;
}

export const DropDown: React.FC<Props> = ({ input, sport, dropDown, setDropDown, setSport }) => {
    const [loading, setLoading] = useState<boolean>(false);

    if (dropDown === "") return null;

    if (loading) return (
        <div style={{
            width: '100%', minHeight: '50px', background: '#eaeaea', position: 'absolute',
            top: '100%', left: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
            borderLeft: '2px solid black', display: 'flex', alignItems: 'center',
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
    );

    if (dropDown === "sports") return (
        <SportDropDown input={input} sport={sport} setSport={setSport} dropDown={dropDown} setDropDown={setDropDown}/>
    );

    else if (dropDown === "players") return (
        <PlayerDropDown input={input} sport={sport} dropDown={dropDown} setDropDown={setDropDown}/>
    );

    return ( null );
}
