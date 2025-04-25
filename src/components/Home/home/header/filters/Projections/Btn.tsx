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

    const isOn = homeFilter.projections.length > 0;
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
                {/* <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24"><path fill={iconColor} fill-rule="evenodd" d="M2.228 5.852C2 6.403 2 7.102 2 8.5v.75c0 .414.336.75.75.75H3a2 2 0 1 1 0 4h-.25a.75.75 0 0 0-.75.75v.75c0 1.398 0 2.097.228 2.648a3 3 0 0 0 1.624 1.624C4.403 20 5.102 20 6.5 20h11c1.398 0 2.097 0 2.648-.228a3 3 0 0 0 1.624-1.624C22 17.597 22 16.898 22 15.5v-.75a.75.75 0 0 0-.75-.75H21a2 2 0 1 1 0-4h.25a.75.75 0 0 0 .75-.75V8.5c0-1.398 0-2.097-.228-2.648a3 3 0 0 0-1.624-1.624C19.597 4 18.898 4 17.5 4h-11c-1.398 0-2.097 0-2.648.228a3 3 0 0 0-1.624 1.624m9.329 4.836c-.096.248-.144.372-.233.456a.5.5 0 0 1-.081.063c-.104.064-.233.076-.491.1c-.437.04-.655.061-.722.19a.3.3 0 0 0-.028.086c-.022.145.138.297.46.6l.089.084c.15.142.225.213.269.301a.6.6 0 0 1 .051.17c.014.098-.008.2-.052.406l-.016.074c-.079.369-.118.553-.069.644a.26.26 0 0 0 .216.138c.1.005.241-.114.524-.353c.185-.158.278-.236.382-.267a.5.5 0 0 1 .288 0c.104.03.197.11.383.267c.282.239.423.358.523.353a.26.26 0 0 0 .216-.138c.049-.09.01-.275-.07-.644l-.015-.074c-.044-.205-.066-.308-.052-.406a.6.6 0 0 1 .051-.17c.044-.088.119-.16.269-.3l.09-.085c.32-.303.481-.455.459-.6a.3.3 0 0 0-.028-.086c-.067-.129-.285-.15-.722-.19c-.258-.024-.387-.036-.49-.1a.5.5 0 0 1-.082-.063c-.09-.084-.137-.208-.233-.456c-.168-.434-.252-.652-.388-.682a.3.3 0 0 0-.11 0c-.136.03-.22.248-.388.682" clip-rule="evenodd"/></svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24"><path fill={iconColor} d="M15.58 16.8L12 14.5l-3.58 2.3l1.08-4.12L6.21 10l4.25-.26L12 5.8l1.54 3.94l4.25.26l-3.29 2.68M20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2a2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2"/></svg>
            </div>
            <span style={{
                fontSize: isMobile ? '9px' : '12px', fontWeight: 'bold',
                color: isPicked ? "#1E1E1E" : '#fff'
            }}>
                Props
            </span>
        </div>
    );
};