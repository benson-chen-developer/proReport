import React, { Dispatch, SetStateAction, useState } from 'react'
import { useGlobalContext } from '../../../../Context/store';

interface Props {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
}

export const Search: React.FC<Props> = ({search, setSearch}) => {
    const [searchParam, setSearchParam] = useState<string>("");
    const {isMobile} = useGlobalContext();

    /* Make it so that if the user clears search but doesn't enter then after a few seconds it resets */
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchParam(value);

        // Clear the previous timeout
        if (typingTimeout) clearTimeout(typingTimeout);

        // Set a new timeout to trigger search after 1 second of inactivity
        const timeout = setTimeout(() => {
            setSearch(value);
        }, 1000);

        setTypingTimeout(timeout);
    };
    
    return (
        <div
            style={{
                margin: isMobile ? '0px 0px 10px 0px' : '0px 0px 15px 15px', 
                width: isMobile ? "95%" : "500px", 
                minHeight: isMobile ? "35px" : "40px", 
                border: '1px solid #6D6D6D',
                borderRadius: "10px", display:'flex',
                background: "#2B2B2B", alignItems:'center'
            }}
        >
            {/* Search Btn */}
            <div 
                style={{
                    fill: "white", height:'100%',
                    width:"10%", display:'flex',
                    justifyContent:'center', alignItems:'center'
                }}
            >
                <svg
                    // style={{cursor: "pointer"}}
                    // onClick={() => {setSearch('')}}
                    width="18" height="18" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 740 840"><path fill="#fff" d="M734 668q8 9 0 17l-49 49q-3 3-8 3t-8-3L519 584q-50 38-112 55t-133 6q-53-8-99-33t-83-61t-59-85T3 366q-10-79 16-150T96 95t121-76T367 3q53 7 100 30t84 59t62 82t33 100q11 69-6 131t-55 114zM325 557q48 0 90-18t74-50t50-74t18-90t-18-90t-50-74t-74-50t-90-18t-90 18t-73 50t-50 74t-18 90t18 90t50 74t73 50t90 18"/>
                </svg>
            </div>

            {/* Search Part */}
            <input
                type="text"
                value={searchParam}
                // onChange={(e) => setSearchParam(e.target.value)}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearch(searchParam);
                    }
                }}
                placeholder="Search for players"
                style={{
                    all: "unset", fontSize: isMobile ? "12px" : "15px", 
                    color: "#fff", width: "80%", minHeight:'100%', 
                }}
            />

            {/* X Btn */}
            <div 
                style={{
                    fill: "white", height:'100%',
                    width:"10%", display:'flex',
                    justifyContent:'center', alignItems:'center'
                }}
            >
                <svg
                    style={{cursor: "pointer"}}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    onClick={() => {
                        setSearch('');
                        setSearchParam('')
                    }}
                >
                    <path
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 9l-6 6m0-6l6 6m6-3a9 9 0 1 1-18 0a9 9 0 0 1 18 0"
                    />
                </svg>
            </div>
        </div>
    );
}