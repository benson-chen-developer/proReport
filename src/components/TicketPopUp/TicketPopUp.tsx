import React from 'react'
import { Ticket } from './Ticket'

export const TicketPopUp = () => {
  return (
    <div style={{
        width: "400px", height: '70%', 
        borderTopLeftRadius: 10, borderTopRightRadius: 10,
        backgroundColor:'#000', position: 'fixed',
        bottom: 0, right: 10, zIndex: 1000, 
        border: '3px solid #00DEB0',
    }}>
        <div style={{
            width: '100%', height:'70%', 
            display:'flex', alignItems:'center', flexDirection:'column'
        }}>
            <div style={{marginTop:20}}></div>
            <Ticket />
        </div>
    </div>
  )
}
