import React, { useRef, useState } from 'react'
import { MatchUp } from '../../../../../../Context/Types/Match';
import { HomeFilterBtn } from '../Btn/HomeFilterBtn';
import { HomeFilterDropDown } from '../DropDown/HomeFilterDropDown';
import { DropDownItem } from './DropDownItem';
import { useGlobalContext } from '../../../../../../Context/store';

interface Props {
    matchUps: MatchUp[]
}
export const MatchesFilter: React.FC<Props> = ({ matchUps }) => {
    const { popularPropsFilter } = useGlobalContext();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
            <HomeFilterBtn 
                isOn={popularPropsFilter.matches.length > 0}
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                buttonRef={buttonRef}
                btnName='Matches'
            />

            {showDropDown &&
                <HomeFilterDropDown
                    setShowDropDown={setShowDropDown}
                    buttonRef={buttonRef}
                    btnName='Matches'
                >
                    {matchUps.map((matchUp, index) => (
                        <DropDownItem matchUp={matchUp} key={index} />
                    ))}
                </HomeFilterDropDown>
            }
        </div>
    );
};