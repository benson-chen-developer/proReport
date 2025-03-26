import React, { Dispatch, SetStateAction } from 'react'
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { Filter, Filters } from '../Matches';
import { useGlobalContext } from '../../../Context/store';

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
interface CustomLabelProps {
    filters: Filters;
}
export const SecondStatsHeader: React.FC<CustomLabelProps> = ({filters}) => {
    const {filter, setFilter} = useGlobalContext();

    return (
        <div style={{
            width:'100%', alignItems:'center', margin:'0px 0px 15px -3px',
            display:'flex', justifyContent:'space-between'
        }}>
            <div style={{width:'80%', display:'flex'}}>
                {filters.lastGames.map((lastGame, index) => 
                    <div 
                        key={index}
                        style={{
                            fontWeight:'bold', width:'100px', height:'30px',
                            display:'flex', justifyContent:'center', alignItems:'center',
                            borderRadius:'25px', fontSize:'13px', marginRight:'10px',
                            background: lastGame === filter.lastGame ? '#fff' : '#000',
                            color: lastGame === filter.lastGame ? '' : '#fff', cursor:'pointer'
                        }}
                        onClick={() => setFilter(p => ({...p, lastGame: lastGame}))}
                    >
                        {lastGame}
                    </div>
                )}
            </div>
        </div>
    )
}

