import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PPlayer } from '../../../Context/PlayerTypes';
import { Filter } from '../Matches';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    ourPlayer?: PPlayer,
    filter: Filter,
    setFilter: Dispatch<SetStateAction<Filter>>
}
export const DaysOfRest: React.FC<Props> = ({filter, setFilter, ourPlayer}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(p => ({...p, daysRested: Number(event.target.value)}));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filter.daysRested.toString()}
          onChange={handleChange}
          autoWidth
          label="Days"
        >
          <MenuItem value="">
            <em>No Rest</em>
          </MenuItem>
          <MenuItem value={0}>No Rest</MenuItem>
          <MenuItem value={1}>1 Day</MenuItem>
          <MenuItem value={2}>2 Day</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}