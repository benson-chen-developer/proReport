import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Dispatch, SetStateAction, useState } from 'react';
import { Filter, Filters } from '../Matches';

function valuetext(value: number) {
  return `${value} Minutes`;
}

interface Props {
    filter: Filter,
    filters: Filters,
    setFilter: Dispatch<SetStateAction<Filter>>
}

export const MinutesSlider: React.FC<Props> = ({filter, filters, setFilter}) => {
  const [value, setValue] = useState<number[]>(filter.minutes);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as [number, number]); // Update slider visually
  };

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    setFilter(p => ({ ...p, minutes: newValue as [number, number] })); // Update filter on mouse release
  };

  return (
    <div style={{display:'flex', alignItems:'center'}}>
      <div style={{display:'flex', marginRight:'25px', alignItems:'center'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="#fff" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m1-8h4v2h-6V7h2z"/></svg>
        <p style={{fontWeight:'bold', fontSize:'12px', color:'#B1B1B1', marginLeft:'6px'}}>
          Minutes Played
        </p>
      </div>

      <Box sx={{ width: 175, height: 0 }}>
        <Slider
          getAriaLabel={() => 'Minutes range'}
          value={value} 
          onChange={handleChange} 
          onChangeCommitted={handleChangeCommitted} // Trigger on release
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          min={filters.minutes[0]} 
          max={filters.minutes[1]} 
          sx={{
              '& .MuiSlider-thumb': {
                width: 18, // Smaller thumb width
                height: 18, // Smaller thumb height
                background:'#14EE9D'
              },
              '& .MuiSlider-track': {
                border:'0px',
                background:'#14EE9D',
              },
              '& .MuiSlider-rail': {
                background:'#14EE9D',
              },
              '& .MuiSlider-valueLabel': {
                fontSize: '12px', // Larger text size
                fontWeight: 'bold', // Optional: make the text bold
                lineHeight: '1', // Adjust line height
                padding: '2px 6px', // Reduce padding for a smaller box
                backgroundColor: '#4c4c4c', // Optional: background color
              },
          }}
        />
      </Box>
    </div>
  );
}