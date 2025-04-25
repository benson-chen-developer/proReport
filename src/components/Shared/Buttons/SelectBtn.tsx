import React, { Dispatch, SetStateAction, useState } from 'react'
import { useGlobalContext } from '../../../Context/store';

interface Props {
    currValue: string,
    selectedValue: string,
    func: (newValue: string) => void
}

export const SelectBtn: React.FC<Props> = ({currValue, selectedValue, func}) => {
    const {isMobile} = useGlobalContext();
    const [hovered, setHovered] = useState(false);
    const isPicked = currValue.toLowerCase() === selectedValue.toLowerCase();
    const backgroundColor = hovered
        ? '#3f3f3f' // on hover
        : isPicked
            ? '#3f3f3f' //picked
            : '#1e1e1e'; //not picked

    return (
        <div 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                height: '35px',
                marginRight: '10px',
                padding: '0px 12px',
                background: backgroundColor,
                color: "#fff",
                border: isPicked ? '1px solid #fff' : '0px solid #fff',
                fontWeight: 'bold',
                borderRadius: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center', justifyContent:'center',
                cursor: 'pointer',
                minWidth: '30px', width: 'auto',
            }}
            onClick={() => {
                if (selectedValue.toLowerCase() !== currValue.toLowerCase()) {
                    func(currValue);
                }
            }}
        >
            <span>{currValue.toUpperCase()}</span>
        </div>
    )
}
