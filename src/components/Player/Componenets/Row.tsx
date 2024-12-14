import React, { useEffect, useState } from 'react'

interface Props {
    compareTo: string[],
    team: string,
    date: string,
    /* 
      Will always be an array of stats to map over
        - So like [3,3,4] (KDA) or [10,10,30] (PRA)
    */
    displayedStats: number[],
    extraText: string
    mapsPlayed?: number
    showDNP? : string
}

/*
  Displayed stats is the box score essentially. It should be an array so we can just loop through it
*/
export const Row:React.FC<Props> = ({displayedStats, team, date, extraText, compareTo, mapsPlayed, showDNP}) => {
    if(showDNP && showDNP === "dont" && displayedStats[0] === -1) return null;

    return (
        <tr style={{display:'flex', minHeight: '35px', marginRight:'20px'}}>
            <th className={mapsPlayed ? "datesAndTeamAndMaps" : "datesAndTeam"}>
                <div style={{width: '40%', display:'flex', justifyContent:'flex-start'}}>{date}</div>

                {/* Team Name */}
                <div style={{ position: 'relative', width: '20%', display: 'flex', justifyContent: 'flex-start' }}>
                  @{team.slice(0, 4)}
                  <div className="tooltip">
                    {team}
                  </div>
                </div>

                {mapsPlayed ?
                  <div style={{ width: '20%', display:'flex', justifyContent:'center' }}>{mapsPlayed}</div> : null
                }
            </th>

            {displayedStats[0] === -1 ? 
              <div  style={{
                width: "200px", minHeight: "35px", display:'flex',alignItems:'center', marginTop:'1px', marginBottom:'1px'
              }}>
                {extraText ? 
                  <p style={{fontSize: '15px', fontWeight:'bold', color:'#3d3d3d', margin:0}}>{extraText}</p>
                    :
                  <p style={{fontSize: '15px', fontWeight:'bold', color:'#3d3d3d', margin:0}}>Did Not Play</p>
                }
              </div>
                :
              <>
                {compareTo.map((value, index) => (
                    <Square 
                        key={index}
                        compareAmount={value}
                        amount={displayedStats[index]} 
                    />
                ))}
              </>
            }
        </tr>
    )
}

interface PropsTwo {
  amount: number, //Actual value
  compareAmount: string //Number you compare to 
}

const Square: React.FC<PropsTwo> = ({ amount, compareAmount }) => {
  let bgColor = '#D9D9D9';
  let amountParsed = parseFloat(compareAmount);
  if (isNaN(amountParsed)) {
    amountParsed = -1;
  }

  // Set background color based on amountParsed compared to compareAmount
  if (amountParsed < 0) {
    bgColor = '#D9D9D9';
  }
  else if (amount > amountParsed) {
    bgColor = '#B1DEA3';
  } 
  else if (amountParsed === amount) {
    bgColor = '#f7f259';
  } else if (amount < amountParsed) {
    bgColor = '#f94352';
  }

  return (
    <th style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: "50px",
          height: "35px",
          background: bgColor,
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <p
          style={{
            margin: 0,
            padding: 0,
            lineHeight: '35px',
            height: '35px',
            overflow: 'hidden',
          }}
        >
          {amount}
        </p>
      </div>
    </th>
  );
};

