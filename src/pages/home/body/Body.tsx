import React from 'react'
import { Card } from './Card';

export type PopularProp = {
    player: {name: string, id: string},
    team: string,
    hits: boolean[],
    game: string,
    over: boolean,
    value: number,
    stat: string,
    description: string,
    rank: number,
    rankText: string
}

export const Body = () => {
    const props: PopularProp[] = [
        {
            player: {name: 'Trae Young', id:'1629027'},
            team: 'Atlanta',
            hits: [true, true, true, false, true],
            game: 'ATL vs OKL - Today 8:15',
            over: true,
            value: 21.5,
            stat: 'Points',
            description:'Trae Young has hit Over 21.5 PTS in the last 5 games at Home',
            rank: 5,
            rankText: 'OKL PTS allowed'
        },
        {
            player: {name: 'Trae Young', id:'1629027'},
            team: 'Atlanta',
            hits: [true, true, true, false, true],
            game: 'ATL vs OKL - Today 8:15',
            over: true,
            value: 21.5,
            stat: 'Points',
            description:'Trae Young has hit Over 21.5 PTS in the last 5 games at Home',
            rank: 5,
            rankText: 'OKL PTS allowed'
        },
        {
            player: {name: 'Trae Young', id:'1629027'},
            team: 'Atlanta',
            hits: [true, true, true, false, true],
            game: 'ATL vs OKL - Today 8:15',
            over: true,
            value: 21.5,
            stat: 'Points',
            description:'Trae Young has hit Over 21.5 PTS in the last 5 games at Home',
            rank: 5,
            rankText: 'OKL PTS allowed'
        },
        {
            player: {name: 'Trae Young', id:'1629027'},
            team: 'Atlanta',
            hits: [true, true, true, false, true],
            game: 'ATL vs OKL - Today 8:15',
            over: true,
            value: 21.5,
            stat: 'Points',
            description:'Trae Young has hit Over 21.5 PTS in the last 5 games at Home',
            rank: 5,
            rankText: 'OKL PTS allowed'
        },
        
    ];

    return (
        <div style={{
            width:'100%', minHeight:'80vh', background:'#1E1E1E', 
        }}>
            <div style={{width:'100%', display:'flex'}}>

            </div>

            <div
                style={{
                    display: 'grid', justifyContent:'center',
                    gridTemplateColumns: 'repeat(auto-fit, 31%)',
                    gap: '2%',
                    width: '100%',
                }}
            >
                {props.map((prop, i) => (
                    <Card key={i} prop={prop} />
                ))}
            </div>
        </div>
    )
}
