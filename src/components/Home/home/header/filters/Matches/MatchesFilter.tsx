import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { MatchUp } from '../../../../../../Context/Types/Match';
import { Btn } from './Btn';
import { DropDown } from './DropDown';

interface Props {
    matchUps: MatchUp[]
}
export const MatchesFilter: React.FC<Props> = ({ matchUps }) => {
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
                    matchUps={matchUps}
                    setShowDropDown={setShowDropDown}
                    buttonRef={buttonRef}
                />
            }
        </div>
    );
};