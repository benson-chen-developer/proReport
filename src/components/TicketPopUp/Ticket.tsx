import React, { useState } from 'react'

interface Props {

}

export const Ticket: React.FC<Props> = ({

}) => {
    const arrowSize = '20px'
    const [pickedBtn, setPickedBtn] = useState<string>('');

    return (
        <div style={{
            width:'90%', height:'125px', borderRadius:10,
            border:'1px solid grey', display:'flex', position:'relative'
        }}>
            <div style={{height:"100%"}}>
                <h2 style={{color:"#fff"}}>
                    C. Clark
                </h2>
                <h1 style={{color:"#fff"}}>
                    17.5 PTS
                </h1>
            </div>
            <div style={{width:'75px', height:'65px', position:'absolute', zIndex:1000, bottom: 10, right:15}}>
                <div style={{
                    width:'100%', height:'50%', display:'flex', justifyContent:'space-evenly',
                    alignItems:'center', cursor:'pointer',
                    background: pickedBtn === "More" ? "#00DEB0" : '#F0EDED', 
                    borderTopLeftRadius: 5, borderTopRightRadius: 5,
                    // borderTop:'1px solid #fff'
                }} onClick={() => {setPickedBtn(p => p === 'More' ? '' : 'More')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={arrowSize} height={arrowSize} viewBox="0 0 24 24"><path fill={pickedBtn === "More" ? "#fff" : '#000'} d="M15 20H9v-8H4.16L12 4.16L19.84 12H15z"/></svg>
                    <h4 style={{color: pickedBtn === "More" ? "#fff" : '#000'}}>More</h4>
                </div>
                <div style={{
                    width:'100%', height:'50%', display:'flex', justifyContent:'space-evenly',
                    alignItems:'center',cursor:'pointer',
                    background: pickedBtn === "Less" ? "#00DEB0" : '#B0B0B0', 
                    borderBottomLeftRadius: 5, borderBottomRightRadius: 5
                }} onClick={() => {setPickedBtn(p => p === 'Less' ? '' : 'Less')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={arrowSize} height={arrowSize} viewBox="0 0 24 24"><path fill={pickedBtn === "Less" ? "#fff" : '#000'} d="M9 4h6v8h4.84L12 19.84L4.16 12H9z"/></svg>
                    <h4 style={{color: pickedBtn === "Less" ? "#fff" : '#000'}}>Less</h4>
                </div>
            </div>
            <button style={{position:'absolute', zIndex:1000, top: 10, right:5, cursor:'pointer', background: 'none', border:'none'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 15 15"><path fill="#fff" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"/></svg>
            </button>
        </div>
    )
}
