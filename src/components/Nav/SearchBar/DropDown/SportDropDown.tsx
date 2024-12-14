import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { currentAllSports, LeagueIcon } from './SportBtn';

interface Props {
    input: string,
    sport: string,
    setSport: Dispatch<SetStateAction<string>>
    dropDown: string,
    setDropDown:Dispatch<SetStateAction<string>>
}

export const SportDropDown: React.FC<Props> = ({input, sport, setSport, dropDown, setDropDown}) => {
    const [similarSport, setSimilarSport] = useState<string[]>([]);

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.sport-dropdown') && dropDown === "sports") {
          setDropDown("");
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [dropDown]);

    return (
        <div style={{
            width: '100%', minHeight:'1px', background:'#eaeaea', position:'absolute',
            top: '100%', left: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
            borderLeft: '2px solid black', display:'flex', alignItems:'center',
            borderRight: '2px solid black', borderBottom: '2px solid black',
            overflowX: 'auto'
        }}>
            {currentAllSports.map((option, index) => 
                <SportSquare 
                    selected={option === sport} 
                    setSport={setSport} sport={option} key={index}
                    index={index} totalLen={currentAllSports.length}
                />
            )}
        </div>
    )
}

interface SquareProps {
    selected: boolean,
    sport: string,
    setSport: Dispatch<SetStateAction<string>>
    index: number,
    totalLen: number
}
export const SportSquare: React.FC<SquareProps> = ({ selected, sport, setSport, index, totalLen }) => {
    const handleClick = () => {
        setSport(sport);
    };
    return (
        <div
            className={`sport-square ${selected ? 'selected' : ''}`}
            style={{
                marginRight: "15px",
                marginLeft: index === 0 ? "10px" : "0px"
            }}
            onClick={handleClick}
        >
            <LeagueIcon sport={sport} size="40px" />
            <h3 className="sport-name">
                {sport}
            </h3>
        </div>
    );
};

