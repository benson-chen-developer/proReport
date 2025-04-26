import React from 'react'
import { useGlobalContext } from '../../../../Context/store'
import { copyLink, shareLink } from './shareFunctions';

export const ShareImgBtn = () => {
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
            <span>Share Link</span>

            <div style={{marginLeft:'2px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2"/><path fill="currentColor" d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>
            </div>
        </div>
    )
}
