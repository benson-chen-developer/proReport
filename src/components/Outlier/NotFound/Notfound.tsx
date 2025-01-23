import React from 'react'

export const Notfound = () => {
    return (
        <div style={{
            width:'100%', height:'100%', display:'flex', flexDirection:'column',
            alignItems:'center'
        }}>
            <div style={{height:'200px'}} />

            <p style={{color:'#fff', fontSize:'25px', fontWeight:'bold'}}>
                Player Does Not Exist 
            </p>
            <p style={{color:'#B1B1B1', fontSize:'18px'}}>
                Make Sure The Url Is Correct
            </p>
        </div>
    )
}
