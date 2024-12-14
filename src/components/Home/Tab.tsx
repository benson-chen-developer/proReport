import React, { Dispatch, SetStateAction } from 'react';

interface Props {
    name: string;
    selectedTab: string;
    setSelectedTab: Dispatch<SetStateAction<string>>;
    comingSoon: boolean;
}

export const Tab: React.FC<Props> = ({ name, selectedTab, setSelectedTab, comingSoon }) => {
    const commonStyles = {
        width: '100px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',
        borderRadius: 15,
        cursor: 'pointer',
        border: '2px solid #fff',
    };

    const selectedStyles = {
        ...commonStyles,
        background: '#8F3052',
        borderColor: '#F33479',
    };

    const defaultStyles = {
        ...commonStyles,
        background: '#000',
        borderColor: '#fff',
    };

    if(comingSoon) return (
        <div style={{display:'flex', alignItems:'center', margin: '0px 20px 0px 0px'}}>
            <button
                style={{
                    width: '100px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '10px',
                    borderRadius: '15px',
                    backgroundColor: '#000',
                    border: '2px solid #fff',  // Add border style
                    color: '#fff', opacity: '50%',
                    textDecoration: 'none',    
                    fontFamily: 'inherit',     
                    fontSize: '16px',          // Font size
                }}
            >
                <h4 style={{ color: '#fff' }}>{name}</h4>
            </button>
            <p style={{margin:0, color:'#fff', fontSize:'14px'}}>Coming Soon</p>
        </div>
    );

    return (
        <button
            style={selectedTab === name ? selectedStyles : defaultStyles}
            onMouseOver={(e) => {
                e.currentTarget.style.background = selectedTab === name ? '#722542' : '#333';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = selectedTab === name ? '#8F3052' : '#000';
            }}
            onClick={() => setSelectedTab(name)}
        >
            <h4 style={{ color: '#fff' }}>{name}</h4>
        </button>
    );
};
