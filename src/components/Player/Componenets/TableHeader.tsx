import React from 'react'
import { PreviousGamesBarChart } from './PreviousGamesBarCharts'

export type TableHeaderObject = {
    name: string,
    underName: string,
}
interface Props {
    statsHeader: TableHeaderObject[],
    hasMaps: boolean
}

export const TableHeader: React.FC<Props> = ({ statsHeader, hasMaps }) => {
    return (
        <tr style={{ display: 'flex' }}>
            <th className={hasMaps ? "statsHeaderAndMaps" : "statsHeader"}>
                <div style={{width: '40%', display:'flex', justifyContent:'flex-start'}}>Date</div>
                {hasMaps ? 
                    <div style={{ width: '20%', display:'flex', justifyContent:'center' }}>Maps</div> : null
                }
            </th>

            {statsHeader.map((statObj, index) => (
                <th 
                    className="dropdown-container"
                    style={{ position: 'relative', width: '50px' }} 
                    key={index}
                >
                    {statObj.name}
                    <div className="dropdown">
                        <h2 className="dropdown-content">
                            {statObj.underName}
                        </h2>
                    </div>
                </th>
            ))}
        </tr>
    )
}
