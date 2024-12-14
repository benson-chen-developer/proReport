import React from 'react'
import { useGlobalContext } from '../../Context/store'

export const ComboBtn = () => {
    const {comboPopUp,setComboPopUp} = useGlobalContext();

    if(comboPopUp) return (
        <></>
    )

    return (
        <div className='comboBtn' onClick={() => setComboPopUp(true)}>
            <div style={{display:'flex', alignItems:'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4" />
                </svg>
                <p style={{fontSize:'18px', fontWeight:'bold', margin:0}}>Add Player</p>
            </div>

            <div>
                <p style={{fontSize:'14px', fontWeight:'bold',  margin:0}}>(Combos)</p>
            </div>
        </div>
    )
}
