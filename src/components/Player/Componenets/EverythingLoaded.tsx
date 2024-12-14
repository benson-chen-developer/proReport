import React from 'react'

interface Props {
    allLoaded: boolean
    onClickFunction: () => void
}

export const EverythingLoaded: React.FC<Props> = ({allLoaded, onClickFunction}) => {
    if(allLoaded) return (
        <div style={{ width: '70%', display: 'flex', justifyContent:'center', margin:'25px 0px 25px 0px' }}>
            <p style={{color: '#000', fontSize:12, fontWeight:'bold'}}>
                Everything is Loaded
            </p>
        </div>
    )

    return (
        <div style={{ width: '70%', display: 'flex', justifyContent:'center', marginTop:'25px' }}>
            <button 
                onClick={() => onClickFunction()} 

                style={{
                    width: 100, height:40, borderRadius: 50,
                    background: '#D9D9D9',
                    border: '1px solid #000',
                    display:'flex', justifyContent:'center', alignItems:'center',
                    cursor:'pointer', marginBottom:'50px'
                }}
            >
                <p style={{color: '#000', fontSize:12, fontWeight:'bold'}}>
                    Load More
                </p>
            </button>
        </div>
    )
}
