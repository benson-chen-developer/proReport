import React, { useState, FormEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { InputField } from './InputField';
import { DropDown } from './DropDown/DropDown';
import { useRouter } from 'next/router';
import { SportBtn } from './DropDown/SportBtn';

interface Props {
  widthSpacing?: string,
  marginLeftSpacing?: string
}

/* Navigates to new page while appending the new player name to the end */
export const searchPlayer = (input: string, league: string, correctName?: boolean) => {
  /* Esports Players Only have firstname so remove the _ (name will be sent as faker_) */
  if (input.charAt(input.length - 1) === '_') {
    input = input.slice(0, -1);
  }

  /* Correct Name means the name is already parsed so we can just navigate
     Name must be in jonquel_jones format
  */
  if(correctName){
    window.open(`/player/${league}/${input.trim()}`, '_blank', 'noopener,noreferrer');
  } else {
    let parsedName = input.trim(); // Remove whitespace
    parsedName = parsedName.toLowerCase(); // Convert to lowercase
    let nameParts = parsedName.split(' '); // Split the name

    if (nameParts.length >= 2) { // Basically turn Cait Clark to Cait_Clark
      let firstName = nameParts[0];
      let lastName = nameParts[1];
      parsedName = `${firstName}_${lastName}`;
    }

    if (input.trim()) {
      window.open(`/player/${league}/${parsedName.trim()}`, '_blank', 'noopener,noreferrer');
    }
  }
};

export const SearchBar: React.FC<Props> = ({widthSpacing, marginLeftSpacing}) => {
  const router = useRouter();
  const { paramPlayer, paramLeague } = router.query;
  const [playerName, setPlayerName] = useState<string>('');
  const [sport, setSport] = useState<string>('WNBA');
  const [dropDown, setDropDown] = useState<string>("");
  const [botBorderHere, setBotBorderHere] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchPlayer(playerName, sport);
  };

  useEffect(() => {
    if (paramLeague) {
      setSport(paramLeague as string);
    }
  }, [paramLeague, paramPlayer]);

  useEffect(() => {
    if(dropDown === "sports") setBotBorderHere(true);
    else if(dropDown === "players" && playerName.trim().length > 0) setBotBorderHere(true);
    else setBotBorderHere(false);
  }, [dropDown, playerName])

  return (
    <div className='navBar'>
      
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', background:'#fff', 
        width: "100%", justifyContent:'space-between',
        borderRadius: 10, border: '2px solid #000', alignItems:'center',
        borderBottom: botBorderHere ? 'none' : '2px solid #000',
        borderBottomLeftRadius: botBorderHere ? 0 : 10,
        borderBottomRightRadius: botBorderHere ? 0 : 10, height:'50px'
      }}>
        <div style={{display:'flex', width:'70%'}}>

          {/* The Magnifying Glass icon */}
          <button type="submit" style={{
              border: 'none', background: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="30px"
              height="30px" viewBox="0 0 24 24" fill="#000"
              style={{pointerEvents: 'none', color: '#888484'}}
            >
              <path d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
            </svg>
          </button>

          <InputField 
            value={playerName} handleInputChange={handleInputChange} 
            setDropDown={setDropDown}
          />
        </div>

        <SportBtn sport={sport} dropDown={dropDown} setDropDown={setDropDown}/>
      </form>

      <DropDown 
        input={playerName} 
        sport={sport} setSport={setSport}
        dropDown={dropDown} setDropDown={setDropDown}
      />
    </div>
  );
};