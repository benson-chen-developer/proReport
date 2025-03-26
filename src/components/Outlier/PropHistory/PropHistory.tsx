import React from 'react'
import { useGlobalContext } from '../../../Context/store';
import { Projection } from '../../../Context/Types/ProjectionTypes'

interface Props {
}
const height = "50px";

export const PropHistory: React.FC<Props> = () => {
    const {pickedProjection} = useGlobalContext();

    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>

            {/* Table */}
            <div style={{width: '95%', display:'flex', flexDirection:'column', border:'1px solid #212121', borderRadius:'10px'}}>

                <BarHeader/>

                {/* Bars */}
                {pickedProjection?.values.map((value, i) => {
                    const isLast = i === pickedProjection.values.length-1;
                    const isFirst = i === 0;

                    let changeNum = isFirst ? 0 : `${value - pickedProjection.values[i-1]}`;
                    const change = changeNum === 0 ? '' : `${changeNum > 0 ? '+' : ''}${changeNum}`;
                    
                    return <Bar 
                        value={value}
                        updatetAt={pickedProjection.updated_ats[i]} 
                        change={change}
                        isLast={isLast}
                        isFirst={isFirst}
                    />
                })}
            </div>
        </div>
    )
}

interface BarProps {
    value: number
    updatetAt: string,
    change: string,
    isLast: boolean
    isFirst: boolean
}
const Bar: React.FC<BarProps> = ({value, updatetAt, change, isLast, isFirst}) => {
    const {isMobile} = useGlobalContext();

    const getDayString = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        
        const isToday = now.toDateString() === date.toDateString();
        
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = yesterday.toDateString() === date.toDateString();
    
        if (isToday) {
            return "Today";
        } else if (isYesterday) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });
        }
    };

    return <div style={{
        height: height, width:'100%', 
        background: isLast ? '#2D2D2D' : '#1F1F1F',
        borderBottomLeftRadius: isLast ? '10px' : '0px', 
        borderBottomRightRadius: isLast ? '10px' : '0px',
        display:'flex', fontWeight:'bold', borderBottom:'1px solid #282828',
        fontSize: isMobile ? '12px' : '14px',
    }}>
        {/* Time */}
        <div style={{width:'65%', height:'100%', alignItems:'center', display:'flex'}}>
            <div style={{ color: "#fff", marginLeft: "10%", fontWeight:'normal', width:'35%'}}>
                {getDayString(updatetAt)}
            </div>

            <div style={{ color: "#B1B1B1", fontWeight:'normal'}}>
                {new Date(updatetAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })}

                <span style={{fontWeight:'bold', fontSize:'11px', marginLeft:'5px'}}>
                    {isFirst ? '(Initial)' : ''}  {isLast ? '(Current)' : ''}
                </span>
            </div>
        </div>

        {/* Change + Value */}
        <div style={{width:'35%', height:'100%', alignItems:'center', display:'flex'}}>
            <div style={{color: Number(change) > 0 ? '#14EE9D' : '#D31920', minWidth:'50%', textAlign:'center'}}>
                {change}
            </div>

            <div style={{color:'#fff', minWidth:'50%', textAlign:'center'}}>
                {value}
            </div>
        </div>
    </div>
}

const BarHeader = () => {
    const {isMobile} = useGlobalContext();

    return <div style={{
        height: height, width:'100%', background:'#000',
        borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
        display:'flex', fontWeight:'bold',
        fontSize: isMobile ? '12px' : '14px',
    }}>
        {/* Time */}
        <div style={{width:'65%', height:'100%', alignItems:'center', display:'flex'}}>
            <p style={{color:'#B1B1B1', marginLeft:'10%'}}>
                Time
            </p>
        </div>

        {/* Time */}
        <div style={{width:'35%', height:'100%', alignItems:'center', display:'flex'}}>
            <div style={{color:'#B1B1B1', minWidth:'50%', textAlign:'center'}}>
                Change
            </div>
            <div style={{color:'#B1B1B1', minWidth:'50%', textAlign:'center'}}>
                Value
            </div>
        </div>
    </div>
}
