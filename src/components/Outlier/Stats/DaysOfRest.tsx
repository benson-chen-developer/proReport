import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PPlayer } from '../../../Context/Types/PlayerTypes';
import { Filter } from '../Matches';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { height } from '@mui/system';

interface Props {
    ourPlayer?: PPlayer,
    filter: Filter,
    setFilter: Dispatch<SetStateAction<Filter>>
}
export const DaysOfRest: React.FC<Props> = ({filter, setFilter, ourPlayer}) => {
    const [popUps, setPopUps] = useState<{value:number, text: string}[]>([
      {value: 0, text:'Back to Back'},
      {value: 1, text:'1 Day Rest'},
      {value: 2, text:'2 Day Rest'}
    ]);
    const [isPopUp, setIsPopUp] = useState<boolean>(false);
    const [selectedText, setSelectedText] = useState<string>('');
    
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

    return(
      <div style={{width:'150px', height:'35px', borderRadius:'10px', marginLeft:'10px'}}>
          {/* Button */}
          <div 
              style={{
                display:'flex', alignItems:'center', background:'#000', border:'1px solid #5B5B5B',
                height:'100%',  borderRadius: '10px', justifyContent:'space-evenly',
                cursor:'pointer', userSelect: 'none',
              }}
              ref={buttonRef}
              onClick={() => setIsPopUp(p => !p)}
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="#fff" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.95 8.95 0 0 0 13 21a9 9 0 0 0 0-18m-1 5v5l4.28 2.54l.72-1.21l-3.5-2.08V8z"/></svg>
              <p style={{color:'#B1B1B1', fontSize:'12px', fontWeight:'bold'}}>{
                selectedText ? selectedText :'Days Rested'
              }</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"/></g></svg>
          </div>

          {/* Pop Up */}
          {isPopUp ?
              <div 
                style={{
                  width:'150px', background:'#000', borderRadius:'5px', border:'1px solid #5B5B5B',
                  position:'absolute', height:'auto', marginTop:'3px', display:'flex',
                  alignItems:'center', flexDirection:'column', zIndex: 2
                }}
                ref={popupRef}
              >
                  {popUps.map((popUp, i) => {
                      return <div 
                        style={{
                          width:'100%', display:'flex', alignItems:'center', cursor:'pointer',
                          height:'50px', justifyContent:'center'
                        }} 
                        key={i}
                        className='hoverBg'
                        onClick={() => {
                          setIsPopUp(false);
                          setSelectedText(popUp.text)
                          setFilter(p => ({...p, daysRested: popUp.value}))
                        }}
                      >
                        <div style={{width:'80%'}}>
                            <p style={{fontWeight:'bold', color:'#fff', fontSize:'13px'}}>
                                {popUp.text}
                            </p>
                        </div>
                    </div>
                  })}
              </div> : null
          }
      </div>
    )
}