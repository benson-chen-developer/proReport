import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Filter } from '../Matches';
import { useGlobalContext } from '../../../Context/store';
import { PPlayer } from '../../../Context/PlayerTypes';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
    ourPlayer: PPlayer,
    filter: Filter,
    setFilter: Dispatch<SetStateAction<Filter>>
}
export const WithOutPlayers: React.FC<Props> = ({ourPlayer, filter, setFilter}) => {
    const [names, setNames] = useState<string[]>([]);
    const {fetchNbaPlayers} = useGlobalContext();
    const [personName, setPersonName] = useState<string[]>([]);

    useEffect(() => {
        const func = async () => {
            const players = await fetchNbaPlayers();
            setNames(players
                .filter(player => player.city === ourPlayer.city && player.name !== ourPlayer.name)
                .map(p => p.name)
            );
        }

        func();
    }, [])

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
    
        // Update both personName and filter.withOutPlayers
        const updatedWithOutPlayers = typeof value === 'string' ? value.split(',') : value;
    
        setPersonName(updatedWithOutPlayers);
        setFilter((prev) => ({
            ...prev,
            withOutPlayers: updatedWithOutPlayers,
        }));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Players</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Players" />}
                    renderValue={(selected) => {
                        if (selected.length === 0) return ''; // Empty state
                        if (selected.length === 1) return selected[0]; // Single item
                        return `${selected[0]} +${selected.length - 1}`; // First item + length
                    }}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={filter.withOutPlayers.includes(name)} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}