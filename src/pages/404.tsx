import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Custom404 = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            background:'#1f1f1f'
        }}>
            <h1 style={{ fontSize: '2rem', margin:0, color:'#fff'}}>Uh Oh</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem',color:'#fff'}}>This Page Doesn't Exist</p>
            
            <Button variant="contained" href='/'>
                Go Back Home
            </Button>
        </div>
    );
};

export default Custom404;
