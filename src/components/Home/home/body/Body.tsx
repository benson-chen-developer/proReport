import { ClipLoader } from 'react-spinners';
import { useGlobalContext } from '../../../../Context/store';
import { Team } from '../../../../Context/Types/PlayerTypes';
import { Card } from './Card/Card';
import { PopularProp } from '../../../../Context/Types/ProjectionTypes';
import { CardHeaders } from './CardHeaders';

interface Props {
    loading: boolean
    teams: Team[]
}

export const Body: React.FC<Props> = ({loading, teams}) => {
    const {isMobile, shownPopularProps} = useGlobalContext();

    if(loading) return  <div style={{width:'100%', minHeight:'80vh', background:'#1E1E1E'}}>
        <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop: '25px'}}>
            <ClipLoader
                color={'#fff'}
                loading={true}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    </div>

    return (
        <div style={{
            width:'100%', minHeight:'80vh', background:'#1E1E1E',
        }}>
            <CardHeaders />

            {shownPopularProps.length > 0 ?
                <div style={{
                    display: 'grid',
                    gridGap: '.25rem',
                    // gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gridTemplateColumns: '1fr',
                    width: '100%', justifyItems:'center',
                    background:'#1E1E1E'
                }}>
                    {shownPopularProps
                        .filter(prop => prop.matchUp && prop.propRef) // Remove invalid items before mapping
                        .map((prop, i) => (
                            <Card key={i} popularProp={prop} teams={teams} />
                        ))
                    }
                </div> 
                    :
                <div style={{width:'90%', display:'flex', flexDirection:'column', alignItems:'center', marginTop:'50px'}}>
                    <div style={{display:'flex', alignItems:'center', color:'#fff'}}>
                        <p style={{fontSize: isMobile ? '14px' : '25px', fontWeight:'bold', marginRight: isMobile ? '5px' : '15px'}}>No High Hit Rate Props</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? '30px' : "50px"} height={isMobile ? '30px' : "50px"} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m-1.832 13.445a1 1 0 0 0 1.664 1.11c.799-1.199 2.391-1.969 3.925-1.585a1 1 0 1 0 .486-1.94c-2.466-.616-4.874.614-6.075 2.415M9.5 8a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m6-1a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/></g></svg>
                    </div>

                    <p style={{color:"#A2A2A2", fontSize: isMobile ? '12px' : '14px', fontWeight:'bold', textAlign:'center'}}>
                        There may still be projections just none with high previous hit rates
                    </p>
                </div>
            }

            <div style={{marginBottom:'20px'}} />
        </div>
    )
}
