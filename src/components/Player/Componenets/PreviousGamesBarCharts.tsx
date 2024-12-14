import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EGameMap } from '../../../Context/ESport';
import { useEffect, useState } from 'react';

type Props = {
  maps: EGameMap[]
  pickedStat: string,
  playerName: string
}
export const PreviousGamesBarChart: React.FC<Props> = ({maps, pickedStat, playerName}) => {
  const [data, setData] = useState<{name:string, amt: number}[]>([]);

  useEffect(() => {
    const newData: {name:string, amt: number}[] = [];
    
    maps.forEach((map) => {
      const ourPlayer = map.players.find(player => player.name === playerName);
      if (ourPlayer && ourPlayer.stats[pickedStat] !== undefined && ourPlayer.stats[pickedStat] >= 0) {
        newData.push({ name: pickedStat, amt: ourPlayer.stats[pickedStat] });
      }
    })  

    setData(newData)
  }, [])
  
  return(
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amt" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
    </ResponsiveContainer>
  )
}