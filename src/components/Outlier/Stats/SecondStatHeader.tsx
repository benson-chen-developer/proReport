import React, { Dispatch, SetStateAction } from 'react'
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { useGlobalContext } from '../../../Context/store';
import { SelectBtn } from '../../Shared/Buttons/SelectBtn';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };
interface Props {
}
export const SecondStatsHeader: React.FC<Props> = ({}) => {
    const {filter, setFilter, activeProp} = useGlobalContext();
    
    const filters = ["L5", "L10", "L20"];
    if(activeProp) filters.push("H2H");
    
    return (
        <div style={{
            width:'100%', 
            // alignItems:'center', 
            margin:'0px 0px 10px 0px',
            display:'flex', justifyContent:'space-between', 
            flexDirection:'column'
        }}>
            <p className='filterTitle'>
                Last Games
            </p>
            <div style={{width:'80%', display:'flex'}}>
                {filters.map((lastGame, index) => 
                    <SelectBtn 
                        key={index}
                        currValue={lastGame}
                        selectedValue={filter.lastGame}
                        func={() => setFilter(p => ({...p, lastGame: lastGame}))}
                    />
                )}
            </div>
        </div>
    )
}

