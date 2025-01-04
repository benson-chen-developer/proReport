import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import {Projection} from '../../../Context/Types/ProjectionTypes'
import ppImage from '../../../../public/prizepicksLogo.png'; 

interface Props {
    projection: Projection
}

export const ProjectionSquare: React.FC<Props> = ({projection}) => {
    const [isPopUp, setIsPopUp] = useState<boolean>(false);

    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if(
            buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
            popupRef.current && !popupRef.current.contains(event.target as Node)
          ){
            setIsPopUp(false);
          } 
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div 
                style={{
                    width:'150px', height:'27px', borderRadius:'15px',
                    // border:'3px solid #04CDCD', background:'#274242',
                    border:'3px solid #18ED9D', background:'#236F53',
                    // border:'3px solid #7803E8', background:'#27004C',
                    display:'flex', alignItems:'center', cursor:'pointer'
                }}
                ref={buttonRef}
                onClick={() => setIsPopUp(p => !p)}
            >
                <Image 
                    src={ppImage} 
                    height={20} width={20} 
                    alt="Projection icon" 
                    style={{margin:'0px 10px'}}
                />
                <p style={{margin:0, fontSize:'14px', fontWeight:'bold', color:'#fff'}}>
                    Over {projection.value} {projection.name}
                </p>
            </div>

            {isPopUp ?
                <div 
                    style={{
                    width:'150px', background:'#000', borderRadius:'5px', border:'1px solid #5B5B5B',
                    position:'absolute', height:'auto', marginTop:'3px', display:'flex',
                    alignItems:'center', flexDirection:'column', zIndex: 2
                    }}
                    ref={popupRef}
                >

                </div> : null
            }
        </div>
    )
}
