import React from 'react'
import { ClipLoader } from 'react-spinners'

const tips = [
    {
        text: "$100s of dollars of free promotions are avaiable in the \"Promos Tab\"",
        emoji: '🤑'
    },
    // {
    //     text: "You can filter out injured players with the \"Games Without Players\" filter",
    //     emoji: '🤕'
    // },
    {
        text: "A game with a lot of hits is not a lock. You should look at the data and make your own choice",
        emoji: '🤔'
    },
    {
        text: "Never chase a lost with an impulsive bet",
        emoji: '😡'
    },
    {
        text: "Gamble responsibly",
        emoji: '🫡'
    },
    {
        text: "Filter for games that are away, without players, minutes played, and more in the filters section",
        emoji: '🧐'
    }
]
const randomTip = tips[Math.floor(Math.random() * tips.length)];

export const Loading = () => {
    return (
        <div style={{
            width:'100%', height:'100vh', background:'#000', display:'flex', 
            alignItems:'center', flexDirection:'column'
        }}>
            <div style={{marginBottom:'150px'}} />

            <ClipLoader color='#fff' size={40}/>

            <div style={{width:'30%', textAlign:'center', marginTop:'10px'}}>
                <p style={{fontSize:'30px', margin:'20px 0px 0px 0px'}}>{randomTip.emoji}</p>
                <p style={{color:'#fff', fontWeight:'bold', fontSize:'16px', lineHeight:'2', marginTop:'10px'}}>
                    {randomTip.text}
                </p>
            </div>
        </div>
    )
}
