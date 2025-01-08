import React from 'react'
import Link from 'next/link'

export const Promos = () => {
    return (
        <Link href="/promotions" passHref>
            <div style={{
                height: '40px', width: '130px', borderRadius: '10px',
                border: '1px solid #A2A2A2', display: 'flex', alignItems: 'center',
                justifyContent: 'space-evenly', cursor: 'pointer'
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#F6CF08" d="m21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42M5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4S7 4.67 7 5.5S6.33 7 5.5 7"/></svg>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>
                    PROMOS <span style={{ color: '#C9C9C9', fontSize: '14px' }}>5+</span>
                </p>
            </div>
        </Link>
    )
}
