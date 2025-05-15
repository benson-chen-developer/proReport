import React, { useEffect } from 'react';
import { SignInPopUp } from './Auth/SignInPopUp';

export const Overlay = () => {
    const isActive = false;

    // Disable scroll when overlay is active
    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <SignInPopUp />
            {/* <SignInPopUp /> */}
        </div>
    );
};