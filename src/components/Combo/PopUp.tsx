import React from 'react'
import { useGlobalContext } from '../../Context/store'

export const PopUp = () => {
    const {comboPopUp, setComboPopUp} = useGlobalContext();

    if(comboPopUp) return (
        <div className='comboPopUp'>

        </div>
    )
}
