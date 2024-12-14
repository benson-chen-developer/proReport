import React from 'react'
import { SearchBar } from '../components/Nav/SearchBar/SearchBar'

const Missing = () => {
    return (
        <div style={{
            minWidth:'100vw', minHeight:'100vh', display:'flex',
            justifyContent:'center', alignItems:'center', flexDirection:'column'
        }}>
            <h1>This Page Doesn't Exist</h1>
            <h1>Try Searching for a Player</h1>

            <SearchBar marginLeftSpacing='0px' widthSpacing='50vw'/>
        </div>
    )
}

export default Missing;