import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Dispatch, SetStateAction, useState } from 'react';
import { useGlobalContext } from '../../../Context/store';

function valuetext(value: number) {
    return `${value} Minutes`;
}

interface Props {
}

/*
  Filter.minutes = [0, 45, 1] if last digit is -1 then we disabled this
*/
export const MinutesSlider: React.FC<Props> = ({}) => {
    const {filter, setFilter, filters} = useGlobalContext();

    const [value, setValue] = useState<number[]>(filter.minutes);

    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue([...newValue as number[]]); // Update slider visually
    };

    const handleChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
      setFilter(p => ({ ...p, minutes: [...newValue as [number, number]]})); // Update filter on mouse release
    };

    const handleCheckboxChange = () => {
      setFilter(prev => ({
          ...prev, minutesChecked: !prev.minutesChecked
      }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginTop:'25px', alignItems:'flex-start'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
            <path fill="#fff" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m1-8h4v2h-6V7h2z"/>
          </svg>
          <p style={{ fontWeight: 'bold', fontSize: '12px', color: '#B1B1B1', marginLeft: '6px' }}>
            Minutes Played
          </p>

          <Checkbox
            style={{ padding: '5px 0px 5px 5px' }}
            checked={filter.minutesChecked}
            onChange={handleCheckboxChange}
            sx={{
              color: '#18ED9D',
              '&.Mui-checked': {
                color: '#18ED9D',
              },
            }}
          />
        </div>
        
        <div style={{ margin: '30px 0px 0px 15px', opacity: filter.minutesChecked ? '100%' : '50%' }}> 
          <Box sx={{ width: 175 }}>
            <Slider
              getAriaLabel={() => 'Minutes range'}
              value={value}
              disabled={!filter.minutesChecked}
              onChange={handleChange}
              onChangeCommitted={handleChangeCommitted}
              getAriaValueText={valuetext}
              valueLabelDisplay="on"
              min={filters.minutes[0]}
              max={filters.minutes[1]}
              sx={{
                '& .MuiSlider-thumb': { //The circle part
                  width: 18,
                  height: 18,
                  background: '#14EE9D'
                },
                '& .MuiSlider-track': {
                  border: '0px',
                  background: '#14EE9D',
                },
                '& .MuiSlider-rail': {
                  background: '#14EE9D',
                },
                '& .MuiSlider-valueLabel': {
                  fontSize: '12px',
                  fontWeight: 'bold',
                  lineHeight: '1',
                  padding: '6px 10px',
                  backgroundColor: '#4c4c4c',
                },
              }}
            />
          </Box>
        </div>
      </div>
    );
}