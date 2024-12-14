import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    value: string, 
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setDropDown: Dispatch<SetStateAction<string>>
}

export const InputField: React.FC<Props> = ({value, handleInputChange, setDropDown}) => {
    return (
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onClick={() => setDropDown("players")}
          placeholder="Enter player name"
          className="inputFieldSearchBar"
          maxLength={30}
          style={{
            width: '90%', height: 40, border: 'none', outline:'none',
            fontWeight: 'bold', fontSize: 16, color: '#000' // Regular input text color
          }}
        />
    )
}
