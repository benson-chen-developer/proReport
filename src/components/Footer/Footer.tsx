import React from 'react';
import { useGlobalContext } from '../../Context/store';

export const Footer = () => {
    const { isMobile } = useGlobalContext();

    return (
        <div style={{
            width: '100%', height: '200px', display: 'flex', alignItems: 'center',
            flexDirection: 'column', background: "#1E1E1E", fontSize: '14px', zIndex: 100
        }}>
            <div style={{ width: '100%', height: '1px', background: '#808080', borderRadius: '10px' }} />

            {isMobile ? (
                <div style={{ width: '95%', marginTop: '12px' }}>
                    <p style={{ color: '#fff', fontWeight: 'bold' }}>ProReport @ 2025 All Rights Reserved</p>
                    <p style={{ color: '#a2a2a2', fontWeight: 'bold', fontSize: '10px' }}>
                        This website is for data analytics only. You must be an
                        adult and 21+ to use this site.
                    </p>
                    <p style={{ color: '#a2a2a2', fontWeight: 'bold', fontSize: '10px' }}>
                        If you or a loved one has a problem with gambling please call
                        1-800-GAMBLER to get live support.
                    </p>

                    <div style={{ marginTop: '30px', fontWeight:'bold' }}>
                        <p style={{ color: '#fff', fontSize: '10px',}}>
                            Contact our support and report bugs at
                        </p>
                        <p style={{ color: '#a2a2a2', fontSize:'10px' }}>proreport.helper@gmail.com</p>
                    </div>
                </div>
            ) : (
                <div style={{ width: '95%', marginTop: '35px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '50%' }}>
                        <p style={{ color: '#fff', fontWeight: 'bold' }}>ProReport @ 2025 All Rights Reserved</p>
                        <p style={{ color: '#a2a2a2', fontWeight: 'bold', fontSize: '12px' }}>
                            This website is for data analytics only. You must be an
                            adult and 21+ to use this site.
                        </p>
                        <p style={{ color: '#a2a2a2', fontWeight: 'bold', fontSize: '12px' }}>
                            If you or a loved one has a problem with gambling please call
                            1-800-GAMBLER to get live support.
                        </p>
                    </div>

                    <div style={{ textAlign: 'right', fontWeight:'bold' }}>
                        <p style={{ color: '#a2a2a2', fontSize: '12px'}}>
                            Contact our support and report bugs at
                        </p>
                        <p style={{ color: '#fff', fontSize: '14px' }}>proreport.helper@gmail.com</p>
                    </div>
                </div>
            )}
        </div>
    );
};
