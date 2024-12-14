import React, { Dispatch, SetStateAction } from 'react';

interface Props {
    compareTo: string[],
    setCompareTo: Dispatch<SetStateAction<string[]>>
    hasMaps: boolean
}

export const StatComparator: React.FC<Props> = ({ compareTo, setCompareTo, hasMaps }) => {
    const handleCompareToChange = (value: string, index: number) => {
        const validInput = /^\d*\.?\d*$/;
        if (validInput.test(value)) {
            setCompareTo((prev: string[]) => {
                const newCompareTo = [...prev];
                newCompareTo[index] = value;
                return newCompareTo;
            });
        }
    };

    return (
        <tr style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
            <th className={hasMaps ? 'statCompareMap' : "statCompare"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" style={{marginLeft:'20px', marginRight:'10px'}}>
                    <path fill="#666363" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1m1-8h-2V7h2z" />
                </svg>

                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <p style={{ color: '#666363', fontSize: '12px', margin: 0 }}>
                        Type a Number 
                    </p>
                    <p style={{ color: '#666363', fontSize: '12px', margin: 0 }}>
                        to Compare to Stats
                    </p>
                </div>
            </th>

            {compareTo.map((value, index) => (
                <td key={index} style={{ width: '50px', height: '35px' }}>
                    <input
                        style={{
                            width: '90%',
                            height: '100%',
                            border: '1px solid #000',
                            borderRadius: 5,
                            textAlign: 'center',
                            fontSize: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        type="string"
                        maxLength={5}
                        onChange={(e) => handleCompareToChange((e.target.value), index)}
                        value={value}
                    />
                </td>
            ))}
        </tr>
    );
}
