import React, { Dispatch, SetStateAction } from 'react';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useGlobalContext } from '../../../Context/store';
import { MatchUp } from '../../../Context/Types/Match';

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 34,
  height: 18,
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
    width: 14,
    height: 14,
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
  matchUp: MatchUp | undefined
}
export const HomeSwitches: React.FC<Props> = ({matchUp}) => {
  const {filter, setFilter, player} = useGlobalContext();
  const divStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    flexDirection: 'column',
  };

  const homeGame = matchUp?.teams[0].name === player.team;

  return (
      <div style={{display:'flex', marginTop:'10px'}}>
        {homeGame ?
          <div
            style={divStyle}
            onClick={() => {
              setFilter(p => ({...p, isHome: !p.isHome})); 
            }}
          >
            <p style={{
                color: filter.isHome ? '#fff' : '#B1B1B1',
                fontSize:'14px', fontWeight:'bold', margin:0
            }}>
                Home Games
            </p>
            
            <div style={{marginLeft:'-10px'}}>
              <Switch 
                checked={filter.isHome} 
              />
            </div>
          </div> : null
        }
        
        {!homeGame ? 
          <div
            style={divStyle}
            onClick={() => {
              setFilter(p => ({...p, isAway: !p.isAway})); 
            }}
          >
            <p style={{
                color: filter.isAway ? '#fff' : '#B1B1B1',
                fontSize:'14px', fontWeight:'bold', margin:0
            }}>
                Away Games
            </p>

            <div style={{marginLeft:'-10px'}}>
              <Switch 
                checked={filter.isAway} 
              />
            </div>
          </div>: null
        }
      </div>
  );
}
