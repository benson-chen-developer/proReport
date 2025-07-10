import React, { useRef, useState } from 'react'
import { PopularProp } from '../../../../../../Context/Types/ProjectionTypes';
import { HomeFilterBtn } from '../Btn/HomeFilterBtn';
import { useGlobalContext } from '../../../../../../Context/store';
import { HomeFilterDropDown } from '../DropDown/HomeFilterDropDown';
import { DropDownItem } from './DropDownItem';

interface Props {
    popularProps: PopularProp[],
}
export const ProjectionsFilter: React.FC<Props> = ({ popularProps }) => {
    const {popularPropsFilter} = useGlobalContext();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const seenPropNames = new Set<string>();
    const uniquePropNames: string[] = [];
    
    for (const prop of popularProps) {
        const name = prop.propRef.name;
        if (!seenPropNames.has(name)) {
            seenPropNames.add(name);
            uniquePropNames.push(name);
        }
    }

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
            <HomeFilterBtn
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                buttonRef={buttonRef}
                btnName='Props'
                isOn={popularPropsFilter.projections.length > 0}
            />

            {showDropDown &&
                <HomeFilterDropDown
                    setShowDropDown={setShowDropDown}
                    buttonRef={buttonRef}
                    btnName='Props'
                >
                    {uniquePropNames.map((prop, index) => (
                        <DropDownItem name={prop} key={index} />
                    ))}
                </HomeFilterDropDown>
            }
        </div>
    );
};