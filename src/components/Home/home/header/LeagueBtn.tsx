import React, { Dispatch, SetStateAction, useState } from 'react'
import { useGlobalContext } from '../../../../Context/store'

interface Props {
    currLeague: string,
}

export const getLeagueIcon = (league: string, width: string) => {
    const leagueStr = league.toLowerCase();

    if(leagueStr === 'nba') return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24"><g fill="#fff"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m12 13.414l1.458 1.458A8 8 0 0 0 12.091 22a9.97 9.97 0 0 1-6.138-2.034l-.282-.223zm2.887 2.887l3.442 3.442a9.94 9.94 0 0 1-4.21 2.031a6.01 6.01 0 0 1 .768-5.473m-5.76-5.759L10.587 12l-6.33 6.329A9.97 9.97 0 0 1 2 11.909a8 8 0 0 0 7.128-1.367Zm12.647 3.576a9.9 9.9 0 0 1-1.8 3.918l-.23.293l-3.443-3.442a6.01 6.01 0 0 1 5.473-.769m-2.03-8.447A9.97 9.97 0 0 1 22 12.09a8 8 0 0 0-6.878 1.18l-.25.187L13.414 12zM11.908 2a9.97 9.97 0 0 1 6.138 2.033l.282.223L12 10.586l-1.458-1.458A8 8 0 0 0 11.909 2ZM4.257 5.67l3.442 3.442a6.01 6.01 0 0 1-5.473.769a9.94 9.94 0 0 1 2.03-4.211Zm5.625-3.445a6.01 6.01 0 0 1-.611 5.24l-.158.233L5.67 4.257a9.94 9.94 0 0 1 4.21-2.031Z"/></g></svg>
    else if(leagueStr === 'mlb') return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24"><g fill="#fff"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2a9.96 9.96 0 0 1 6.5 2.4a10 10 0 0 0-2.096 2.488l-.044-.02a1 1 0 1 0-.846 1.812l.043.02a10 10 0 0 0-.508 2.3H15a1 1 0 1 0 0 2h.05a10 10 0 0 0 .507 2.3l-.043.02a1 1 0 1 0 .846 1.812l.044-.02c.56.94 1.27 1.78 2.096 2.488A9.96 9.96 0 0 1 12 22a9.96 9.96 0 0 1-6.5-2.4a10 10 0 0 0 2.096-2.488l.044.02a1 1 0 1 0 .846-1.812l-.043-.02A10 10 0 0 0 8.95 13H9a1 1 0 1 0 0-2h-.05a10 10 0 0 0-.507-2.3l.043-.02a1 1 0 0 0-.846-1.813l-.044.021c-.56-.94-1.27-1.78-2.096-2.488A9.96 9.96 0 0 1 12 2M4.115 5.849A8 8 0 0 1 5.773 7.74a1 1 0 0 0 .845 1.81q.226.7.32 1.452a1 1 0 0 0 0 1.996q-.094.751-.32 1.453a1 1 0 0 0-.845 1.809a8 8 0 0 1-1.658 1.891A9.96 9.96 0 0 1 2 12c0-2.32.79-4.455 2.115-6.151m15.77 0A9.96 9.96 0 0 1 22 12c0 2.32-.79 4.455-2.115 6.151a8 8 0 0 1-1.658-1.891a1 1 0 0 0-.845-1.81a8 8 0 0 1-.32-1.452a1 1 0 0 0 0-1.996q.094-.751.32-1.453a1 1 0 0 0 .845-1.809a8 8 0 0 1 1.658-1.891"/></g></svg>
} 

export const LeagueBtn: React.FC<Props> = ({currLeague}) => {
    const {isMobile, popularPropsFilter, setPopularPropsFilter} = useGlobalContext();
    const [hovered, setHovered] = useState(false);
    const isPicked = currLeague === popularPropsFilter.league;
    const backgroundColor = hovered
        ? '#1A6757' // green on hover
        : isPicked
            ? '#1A6757'
            : '#1e1e1e';

    return (
        <div 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                // height: '35px',
                height: '2rem',
                marginRight: '.5rem',
                padding: '0px 12px',
                background: backgroundColor,
                color: "#fff",
                border: isPicked ? '1px solid #18ED9D' : '0px solid #fff',
                fontWeight: 'bold',
                borderRadius: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                width: 'auto',
            }}
            onClick={() => {
                if (popularPropsFilter.league !== currLeague) {
                    setPopularPropsFilter(p => ({...p, league: currLeague}));
                }
            }}
        >
            <div style={{ marginRight: '6px', display: 'flex', alignItems: 'center' }}>
                {getLeagueIcon(currLeague, isMobile ? '14px' : '18px')}
            </div>
            <span>{currLeague.toUpperCase()}</span>
        </div>
    )
}
