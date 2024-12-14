import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { EGame2 } from "../../../Context/ESport"
import { PlayerType } from "../../../Context/PlayerTypes"
import { ESport } from "../SportClass/Esport"

interface Props {
    game: EGame2
    player: PlayerType
    pickedBtn: string
    setPickedBtn: Dispatch<SetStateAction<string>>
}

export const DisplayedGame: React.FC<Props> = ({ game, player, pickedBtn, setPickedBtn }) => {
    const [totalStats, setTotalStats] = useState<Record<string, number>>({});

    const oppTeam = game.team1 === player.team ? game.team2 : game.team1
    let dateObject = new Date(game.date);
    let month = dateObject.getUTCMonth() + 1;
    let day = dateObject.getUTCDate();
    let year = dateObject.getUTCFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    let totalMapsPlayed = game.maps.filter((map) => map.didPlay).length;
    
    useEffect(() => {
        let totalStats: Record<string, number> = {};
        let counter = 0;
        let maxCounter = pickedBtn[pickedBtn.length-1] === 's' ? 5 : Number(pickedBtn[pickedBtn.length-1]);

        const gamesPlayed = game.maps.filter((map) => map.didPlay).length;
        if(gamesPlayed < maxCounter && pickedBtn !== 'All Maps'){
            setTotalStats({});
            return;
        }

        game.maps.forEach((map) => {
            if(counter < maxCounter){
                const playerFound = map.players.find((p) => p.name === player?.name);
                Object.entries(playerFound!.stats).forEach(([key, value]) => {
                    totalStats[key] = (totalStats[key] || 0) + Number(value);
                });
            }
            counter++;
        });

        setTotalStats(totalStats);
    }, [pickedBtn, setPickedBtn])

    return (
        <tr style={{display:'flex', minHeight: '35px', marginRight:'20px'}}>

            {/* Date + Team */}
            <th style={{width:"100px", alignItems:"center", justifyContent: "spaceEvenly"}}>
                <div style={{width:'40%', display:'flex', justifyContent:'flex-start'}}>
                    {formattedDate}
                </div>

                {/* Team Name */}
                <div style={{ 
                    position: 'relative', width: '20%', display: 'flex', justifyContent: 'flex-start'
                }}>
                  @{oppTeam}
                </div>
            </th>

            {/* Right Part */}
            <div style={{ marginBottom:'20px' }}>
                {/* Totals Map */}
                <tr style={{ display: 'flex', width: '100%', marginBottom:'5px'}}>
                    {Object.keys(totalStats).length === 0 ? 
                        <div>
                            Did not play {pickedBtn[pickedBtn.length - 1]} Maps
                        </div> 
                        : 
                        null
                    }

                    {Object.entries(totalStats).map(([key, value], index) => (
                        <td style={{ padding: '0px'}}>
                            <Square 
                                compareAmount="0" 
                                amount={Number(value)} 
                            />
                        </td>
                    ))}

                    <div>
                        {pickedBtn} {pickedBtn === "All Maps" ? `(${totalMapsPlayed})` : null}

                        <svg 
                            onClick={() => {
                                const allBtns = ESport.getAllPickedBtns();
                                const currentIndex = allBtns.indexOf(pickedBtn);
                                const nextIndex = (currentIndex + 1) % allBtns.length;
                                const nextBtn = allBtns[nextIndex];

                                setPickedBtn(nextBtn);
                            }}
                            xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"
                        >
                            <path fill="grey" d="M14.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L16.586 8H5a1 1 0 0 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414m-4.586 10a1 1 0 0 1 0 1.414L7.414 16H19a1 1 0 1 1 0 2H7.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0"/>
                        </svg>
                    </div>
                </tr>

                {/* Each Map */}
                {game.maps.filter(map => map.didPlay).map((map, mapIndex) => {
                    const playerStats = map.players.find((play) => play.name === player.playerId);
                    
                    const scores = map.score.split('-');
                    const team1Won = Number(scores[0]) > Number(scores[1]);
                    const isTeam1 = game.team1 === player.team;
                    const wonGame = (team1Won && isTeam1);

                    return <tr key={mapIndex} style={{ display: 'flex', width: '100%'}}>
                        {Object.entries(playerStats!.stats).map(([key, value], index) => (
                            <td 
                                key={`${mapIndex}-${key}`} 
                                style={{ padding: '0px',}}
                            >
                                <Square 
                                    compareAmount="0" 
                                    amount={Number(value)} 
                                />
                            </td>
                        ))}
                        <div>
                            {map.map} {map.score} {wonGame ? 'W' : "L"}
                        </div>
                    </tr>
                })}
                
            </div>
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
  