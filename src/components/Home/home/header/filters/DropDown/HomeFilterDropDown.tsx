import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useGlobalContext } from "../../../../../../Context/store";

interface DropDownProps {
    setShowDropDown: Dispatch<SetStateAction<boolean>>,
    buttonRef: React.RefObject<HTMLDivElement>,
    btnName: string,
    children: React.ReactNode;
}
export const HomeFilterDropDown: React.FC<DropDownProps> = ({ 
    setShowDropDown, buttonRef,
    btnName, children
}) => {
    const { isMobile } = useGlobalContext();
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
                popupRef.current && !popupRef.current.contains(event.target as Node)
            ) {
                setShowDropDown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowDropDown, buttonRef]);

    return (
        <div
            ref={popupRef}
            style={{
                width: '225px',
                background: '#000',
                borderRadius: '5px',
                border: '1px solid #5B5B5B',
                position: 'absolute',
                marginTop: '3px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: 2,
                cursor: 'pointer',
                minHeight: '50px',
                maxHeight: isMobile ? '175px' : '300px',
                overflow: 'auto'
            }}
        >
            <div style={{
                color:'#fff', fontWeight:'bold', width:'100%', 
                margin:'10px 0px 5px 20px', fontSize:'14px'
            }}>
                {btnName}
            </div>
            
            {children}
        </div>
    );
};