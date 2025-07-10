import React, { useRef, useState } from 'react'
import { PopularProp } from '../../../../../../Context/Types/ProjectionTypes';
import { PPlayer } from '../../../../../../Context/Types/PlayerTypes';
import { HomeFilterBtn } from '../Btn/HomeFilterBtn';
import { useGlobalContext } from '../../../../../../Context/store';
import { HomeFilterDropDown } from '../DropDown/HomeFilterDropDown';
import { DropDownItem } from './DropDownItem';

interface Props {
    popularProps: PopularProp[],
}
export const PlayersFilter: React.FC<Props> = ({ popularProps }) => {
    const {popularPropsFilter} = useGlobalContext();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const seenPlayerIds = new Set<string>();
    const uniquePlayers = new Set<PPlayer>();

    for (const prop of popularProps) {
        const player = prop.propRef.player;
        if (!seenPlayerIds.has(player.playerId)) {
            seenPlayerIds.add(player.playerId);
            uniquePlayers.add(player);
        }
    }


    return (
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
            <HomeFilterBtn 
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                buttonRef={buttonRef}
                isOn={popularPropsFilter.players.length > 0}
                btnName='Players'
            />

            {showDropDown &&
                <HomeFilterDropDown
                    setShowDropDown={setShowDropDown}
                    buttonRef={buttonRef}
                    btnName='Players'
                >
                    {Array.from(uniquePlayers).map((player, index) => (
                        <DropDownItem player={player} key={index} />
                    ))}
                </HomeFilterDropDown>
            }
        </div>
    );
};