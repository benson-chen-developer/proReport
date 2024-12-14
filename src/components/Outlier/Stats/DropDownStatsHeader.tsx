import React, { Dispatch, SetStateAction, useState } from 'react'
import { bgColor } from '../../Player/PPlayerPage';
import { Filter, Filters } from '../Matches';

interface CustomLabelProps {
    filter: Filter,
    filters: Filters,
    setFilter: Dispatch<SetStateAction<Filter>>
}
export const DropDownStatsHeader: React.FC<CustomLabelProps> = ({filter, filters, setFilter}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
    
    return (
        <div style={{width:'100%',display:'flex'}}>
            {filters.stats.map((category, index) => (
                <div 
                    key={index} 
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                >
                    {/* Main button */}
                    <div 
                        style={{
                            cursor:'pointer', color:'#fff', paddingRight:'20px', alignItems:'center',
                            display:'flex', flexDirection:'column', justifyContent:'space-between',
                        }}
                        onClick={() => setFilter(p => ({...p, stat: category[0], barKey: p.barKey+1})) }
                    >
                        <div style={{
                            color: category[0] === filter.stat ? '#fff' : 'grey', marginTop:'5px',
                        }}>
                            <p style={{margin:0, fontWeight:'bold', marginBottom:'15px', fontSize:'14px'}}>
                                {category[0]}{category.length > 1 ? '+' : ''}
                            </p>
                        </div>

                        <div style={{
                            height:'4px', width:'60%', 
                            background: category[0] === filter.stat ? '#fff' : '',
                            borderTopLeftRadius: category[0] === filter.stat ? '8px' : '0', 
                            borderTopRightRadius: category[0] === filter.stat ? '8px' : '0',
                        }}/>
                    </div>

                    {/* Dropdown on hover */}
                    {hoveredIndex === index && category.length > 1 && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            padding: '5px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            zIndex: 10
                        }}>
                            {category.slice(1).map((stat, statIndex) => (
                                <div 
                                    key={statIndex} style={{ padding: '5px 10px' }} 
                                    onClick={() => setFilter(p => ({...p, stat: stat, barKey: p.barKey+1}))}
                                >
                                    {stat}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
