import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import {Projection} from '../../../Context/Types/ProjectionTypes'
import ppImage from '../../../../public/prizepicksLogo.png'; 
import { useGlobalContext } from '../../../Context/store';
import { Filter } from '../Matches';

interface Props {
    pickedProjection: Projection | null
    setPickedProjection: Dispatch<SetStateAction<Projection | null>>
    filter: Filter
}

export const ProjectionSquare: React.FC<Props> = ({pickedProjection, setPickedProjection, filter}) => {
    const [projections, setProjections] = useState<Projection[]>([]);
    const [isPopUp, setIsPopUp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const {fetchProjections} = useGlobalContext();
    const getSameProjections = (projections: Projection[]): Projection[] => {
        return projections.filter(p => 
            p.name === filter.stat &&
            p.period === filter.period
        )
    }

    useEffect(() => {
        const func = async () => {
            const projections = await fetchProjections('Jaylen Brown');
            setProjections(getSameProjections(projections));

            setLoading(false);
        }
        func();

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

    useEffect(() => {
        const func = async () => {
            let projections = await fetchProjections('Jaylen Brown');
            projections = getSameProjections(projections);
            setProjections(projections);
            setPickedProjection(projections[0])
        }

        func();
    }, [filter])

    if(loading) return null;

    return (
        <div>
            <div 
                style={{
                    width:'175px', height:'30px', borderRadius:'15px',
                    border:'3px solid #18ED9D', background:'#236F53',
                    // border:'3px solid #04CDCD', background:'#274242',
                    // border:'3px solid #7803E8', background:'#27004C',
                    display:'flex', alignItems:'center', cursor:'pointer',
                    justifyContent:'space-between'
                }}
                ref={buttonRef}
                onClick={() => setIsPopUp(p => !p)}
            >
                <Image 
                    src={ppImage} 
                    height={20} width={20} 
                    alt="Projection icon" 
                    style={{margin:'0px 0px 0px 10px'}}
                />
                <p style={{margin:0, fontSize:'14px', fontWeight:'bold', color:'#fff'}}>
                    Over {pickedProjection?.values[pickedProjection.values.length-1]} {pickedProjection?.name}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight:'10px'}} width="20" height="20" viewBox="0 0 24 24"><g fill="#246E53" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"/></g></svg>
            </div>

            {isPopUp ?
                <div 
                    style={{
                    width:'175px', background:'#000', borderRadius:'5px', border:'1px solid #5B5B5B',
                    position:'absolute', height:'auto', marginTop:'3px', display:'flex',
                    alignItems:'center', flexDirection:'column', zIndex: 2
                    }}
                    ref={popupRef}
                >
                    {projections
                        .filter(p => p.name === pickedProjection?.name)
                        .sort((a, b) => b.values[b.values.length-1] - a.values[a.values.length-1])
                        .map((projection, i) => {
                            return <div 
                                key={i} 
                                className='hoverBg' 
                                style={{
                                    height:'40px', color:'#fff', cursor:'pointer', display:'flex',
                                    justifyContent:'center', alignItems:'center', width:'100%',
                                    fontSize:'14px', fontWeight:'bold'
                                }} 
                                onClick={() => {
                                    setPickedProjection(projection)
                                    setIsPopUp(false);
                                }}
                            > 
                                {projection.values[projection.values.length-1].toFixed(1)} {projection.name}
                            </div>
                        })}
                </div> : null
            }
        </div>
    )
}
