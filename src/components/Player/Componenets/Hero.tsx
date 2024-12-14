import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from 'next/image';
import { PreviousGamesBarChart } from "./PreviousGamesBarCharts";

type Props = {
    playerName: string
    picUrl: string,
    number: string,
    team: string,
    position: string,
    pickedBtn: string,
    setPickedBtn: Dispatch<SetStateAction<string>>,
    allPickedBtns: string[]
}

export const Hero: React.FC<Props> = ({
    playerName, number, team, position, picUrl, allPickedBtns, pickedBtn, setPickedBtn
}) => {

    return <div className="playerPageHeroContainer">

        <div style={{width:'100%', height:'20%', display:'flex', justifyContent:'space-between'}}>
            <div className="playerPagePfpHeaders">
                {/* Player Pic */}
                <div className="playerPagePic">
                    {picUrl !== "" ?
                        <Image
                            src={picUrl}
                            style={{width: '150px', height: '110px', display:'flex'}}
                            alt={`Pic of ${playerName}`} width={150} height={110}
                        /> 
                            :
                        <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 8 8">
                            <path fill="#1D1D1D" d="M4 0C2.9 0 2 1.12 2 2.5S2.9 5 4 5s2-1.12 2-2.5S5.1 0 4 0M1.91 5C.85 5.05 0 5.92 0 7v1h8V7c0-1.08-.84-1.95-1.91-2c-.54.61-1.28 1-2.09 1c-.81 0-1.55-.39-2.09-1" />
                        </svg>
                    }
                </div>

                {/* Player name */}
                <div className="playerPagePfpInfo">
                    <h1 className="playerPageName">
                        {playerName}
                    </h1>
                    <h2 className="playerPageTeam">
                        {number !== "" ? `#${number}  -` : ""} {team !== "" ? `${team}` : ""} {position !== "" ? `- ${position}` : ""}
                    </h2>
                </div>

            </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div className="playerPagescrollableContainer">
                {allPickedBtns.map((btnText, index) => 
                    <StatBtn 
                        onClick={() => setPickedBtn(btnText)} key={index} index={index}
                        pickedBtn={pickedBtn} btnText={btnText}
                    />
                )}
            </div>
        </div>
    </div>
}

type StatBtnProps = {
    btnText: string,
    index: number,
    pickedBtn:string,
    onClick: () => void
}
  
const black = "#1f202d";

const StatBtn: React.FC<StatBtnProps> = ({ btnText, pickedBtn, onClick, index }) => {
    return (
        <button 
            onClick={() => onClick()} 
            className="playerPageStatBtn"
            style={{
                background: pickedBtn === btnText ? '#fff' : 'black',
            }}
        >
            <p style={{
                color: pickedBtn === btnText ? '#000' : '#fff', fontSize:12, fontWeight:'bold', margin: 0
            }}>
                {btnText}
            </p>
        </button>
    );
}