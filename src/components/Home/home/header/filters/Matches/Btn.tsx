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

    const isOn = homeFilter.matches.length > 0;
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
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24">
                    <path fill={iconColor} d="M20.162 4.898c.406.49.755 1.029 1.036 1.606a2.75 2.75 0 0 1-3.789 1.148zm-1.06-1.06L16.348 6.59a2.75 2.75 0 0 1 1.147-3.789a8 8 0 0 1 1.607 1.036M22 10c0-.615-.07-1.214-.201-1.79a4.24 4.24 0 0 1-3.05 1.29a4.23 4.23 0 0 1-2.427-.761l-.761.761l5.032 5.032A7.96 7.96 0 0 0 22 10m-7.5-4.75c0-1.196.494-2.277 1.29-3.05a8.03 8.03 0 0 0-6.323 1.207L14.5 8.439l.761-.761A4.23 4.23 0 0 1 14.5 5.25m0 5.31l5.126 5.127A8 8 0 0 1 16 17.748a9.7 9.7 0 0 0-2.346-6.342zm-1.906-.214A9.7 9.7 0 0 0 6.252 8a8 8 0 0 1 2.06-3.626L13.44 9.5zM4.25 9A2.25 2.25 0 0 0 2 11.25v2A8.75 8.75 0 0 0 10.75 22h2A2.25 2.25 0 0 0 15 19.75v-2A8.75 8.75 0 0 0 6.25 9zm2.47 4.72a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06" />
                </svg>
            </div>
            <span style={{
                fontSize: isMobile ? '9px' : '12px', fontWeight: 'bold',
                color: isPicked ? "#1E1E1E" : '#fff'
            }}>
                Matches
            </span>
        </div>
    );
};