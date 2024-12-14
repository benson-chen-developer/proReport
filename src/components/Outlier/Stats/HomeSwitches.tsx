import React, { Dispatch, SetStateAction } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Filter } from '../Matches';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

interface Props {
  filter: Filter,
  setFilter: Dispatch<SetStateAction<Filter>>
}
export const HomeSwitches: React.FC<Props> = ({filter, setFilter}) => {
  return (
      <div style={{display:'flex'}}>
        <div
          style={{display:'flex', alignItems:'center', cursor:'pointer'}}
          onClick={() => {
            if(!filter.isAway){
                setFilter(p => ({...p, isAway:true, isHome: false})); 
            } else {
              setFilter(p => ({...p, isHome: !p.isHome})); 
            }
          }}
        >
          <Switch 
            checked={filter.isHome} 
          />
          <p style={{
              color: filter.isHome ? '#fff' : 'grey',
              fontSize:'14px', fontWeight:'bold'
          }}>
              Home
          </p>
        </div>
        
        <div
          style={{display:'flex', alignItems:'center', cursor:'pointer'}}
          onClick={() => {
            if(!filter.isHome){
                setFilter(p => ({...p, isAway:false, isHome: true})); 
            } else {
                setFilter(p => ({...p, isAway: !p.isAway})); 
            }
          }}
        >
          <Switch 
            checked={filter.isAway} 
          />
          <p style={{
              color: filter.isAway ? '#fff' : 'grey',
              fontSize:'14px', fontWeight:'bold'
          }}>
              Away
          </p>
        </div>
      </div>
  );
}
