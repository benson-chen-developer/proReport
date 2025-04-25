import React, { useRef, useState } from 'react'
import { Btn } from './Btn';
import { DropDown } from './DropDown';

interface Props {
}
export const PlayersFilter: React.FC<Props> = ({ }) => {
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
                    players={[
                        {"name":"Precious Achiuwa","team":"New York Knicks","picId":"1630173","playerId":"1630173","sport":"nba","city":"New York","position":"F",}
                    ]}
                    setShowDropDown={setShowDropDown}
                    buttonRef={buttonRef}
                />
            }
        </div>
    );
};