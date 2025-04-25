import { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "../../../../../../Context/store";

interface BtnProps {
    showDropDown: boolean,
    setShowDropDown: Dispatch<SetStateAction<boolean>>,
    buttonRef: React.RefObject<HTMLDivElement>
}
export const Btn: React.FC<BtnProps> = ({ showDropDown, setShowDropDown, buttonRef }) => {
    const { isMobile, homeFilter } = useGlobalContext();
    const [hovered, setHovered] = useState(false);

    const isOn = homeFilter.players.length > 0;
    const width = isMobile ? '14' : '18';
    const isPicked = hovered || isOn || showDropDown;
    const iconColor = isPicked ? "#1E1E1E" : "#fff";

    return (
        <div
            ref={buttonRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                height: isMobile ? '25px' : '35px',
                width: 'auto',
                borderRadius: '10px',
                border: isPicked ? '1px solid #fff' : '1px solid #5B5B5B',
                cursor: 'pointer',
                padding: '0px 10px',
                background: isPicked ? '#fff' : '#1E1E1E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}
            onClick={() => setShowDropDown(p => !p)}
        >
            <div style={{ margin: '3px 5px 0px 0px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24"><path fill={iconColor} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4"/></svg>
            </div>
            <span style={{
                fontSize: isMobile ? '9px' : '12px', fontWeight: 'bold',
                color: isPicked ? "#1E1E1E" : '#fff'
            }}>
                Players
            </span>
        </div>
    );
};