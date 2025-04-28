import React from 'react'
import { useGlobalContext } from '../../../../Context/store'
import { copyLink, shareLink } from './shareFunctions';

export const ShareLinkBtn = () => {
    const {filter, player, isMobile} = useGlobalContext();

    // const copyLink = ()
    
    return (
        <div
            style={{
                display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap',
                borderRadius: '20px', background: '#1E1E1E',
                border: '1px solid #2B2B2B',
                alignItems: 'center', cursor: 'pointer',
                justifyContent: 'center',
                width: 'auto', padding:'0px 10px',
                height: isMobile ? '25px' : '40px',
                color:'#fff', fontWeight:'bold', 
                fontSize: isMobile ? '8px' : '12px'
            }} 

            onClick={() => {
                const link = shareLink(player, filter);
                copyLink(link);
                console.log(link)
            }}
        >
            <span>Share Prop</span>

            <div style={{marginLeft:'2px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48"><path fill="currentColor" d="M31.605 6.838a1.25 1.25 0 0 0-2.105.912v5.472c-.358.008-.775.03-1.24.072c-1.535.142-3.616.526-5.776 1.505c-4.402 1.995-8.926 6.374-9.976 15.56a1.25 1.25 0 0 0 2.073 1.075c4.335-3.854 8.397-5.513 11.336-6.219a17.7 17.7 0 0 1 3.486-.497l.097-.003v5.535a1.25 1.25 0 0 0 2.105.912l12-11.25a1.25 1.25 0 0 0 0-1.824zM6 14.25A6.25 6.25 0 0 1 12.25 8h8.25a1.25 1.25 0 1 1 0 2.5h-8.25a3.75 3.75 0 0 0-3.75 3.75v21.5a3.75 3.75 0 0 0 3.75 3.75h21.5a3.75 3.75 0 0 0 3.75-3.75V33.5a1.25 1.25 0 0 1 2.5 0v2.25A6.25 6.25 0 0 1 33.75 42h-21.5A6.25 6.25 0 0 1 6 35.75z"/></svg>
            </div>
        </div>
    )
}
