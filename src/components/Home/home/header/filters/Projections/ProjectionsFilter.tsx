import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { MatchUp } from '../../../../../../Context/Types/Match';
import { Btn } from './Btn';
import { DropDown } from './DropDown';

interface Props {
}
export const ProjectionsFilter: React.FC<Props> = ({ }) => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
            <Btn
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                buttonRef={buttonRef}
            />

            {showDropDown &&
                <DropDown
                    projectionNames={['PTS', "REB", "PTS+REB", "BLK"]}
                    setShowDropDown={setShowDropDown}
                    buttonRef={buttonRef}
                />
            }
        </div>
    );
};