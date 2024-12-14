import React, { useEffect } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();
    const { paramPlayer, paramLeague } = router.query;
    
    useEffect(() => {
    }, []);

    return (
        <div style={{
            width:'100%', minHeight:'100vh', justifyContent:'center', alignItems:'center',
            display:'flex'
        }}>
        </div>
    )
}

export default Index;