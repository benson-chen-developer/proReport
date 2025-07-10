import { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "../../../../../../Context/store";
import { btnIcon } from "./BtnIcon";

interface BtnProps {
    showDropDown: boolean,
    setShowDropDown: Dispatch<SetStateAction<boolean>>,
    buttonRef: React.RefObject<HTMLDivElement>,
    btnName: string,
    isOn: boolean
}
export const HomeFilterBtn: React.FC<BtnProps> = ({ 
    showDropDown, setShowDropDown, buttonRef,
    btnName, isOn 
}) => {
    const { isMobile, popularPropsFilter } = useGlobalContext();
    const [hovered, setHovered] = useState(false);

    const width = isMobile ? '14' : '18';
    const isPicked = hovered || isOn || showDropDown;
    const iconColor = isPicked ? "#1E1E1E" : "#fff";

    return (
        <div
            ref={buttonRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                height: isMobile ? '2rem' : '2.5rem',
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
                {btnIcon(btnName, width, iconColor)}
            </div>
            <span style={{
                fontSize: '12px', fontWeight: 'bold',
                color: isPicked ? "#1E1E1E" : '#fff'
            }}>
                {btnName}
            </span>
        </div>
    );
};