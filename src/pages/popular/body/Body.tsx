import { ClipLoader } from 'react-spinners';
import { BarData, Filter, MatchUp } from '../../../components/Outlier/Matches';
import { useGlobalContext } from '../../../Context/store';
import { PGame, PPlayer, Team } from '../../../Context/Types/PlayerTypes';
import { Card } from './Card';

export type PopularProp = {
    player: PPlayer,
    data: BarData[],
    matchUp: MatchUp,
    value: number,
    filter: Filter,
}

interface Props {
    popularProps: PopularProp[]
    loading: boolean
    teams: Team[]
}

export const Body: React.FC<Props> = ({popularProps, loading, teams}) => {
    const {isMobile} = useGlobalContext();

    return (
        <div style={{
            width:'100%', minHeight:'80vh', background:'#1E1E1E', 
        }}>
            <div style={{width:'100%', display:'flex'}}>
                
            </div>

            {loading ? 
                <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop: '25px'}}>
                    <ClipLoader
                        color={'#fff'}
                        loading={true}
                        size={40}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                    :
                <div
                    style={{display: 'flex', alignItems:'center', flexDirection:'column'}}
                >
                    <div style={{
                        display: 'grid', justifyContent:'start',
                        gridTemplateColumns: !isMobile ? 'repeat(auto-fit, 32%)' : 'repeat(auto-fit, 100%)',
                        gap: isMobile ? "0px 0px" : '5px 1%', 
                        width: '95%',
                    }}>
                        {popularProps.map((prop, i) => (
                            <Card key={i} prop={prop} teams={teams}/>
                        ))}
                    </div>

                    <div style={{marginBottom:'20px'}} />
                </div>
            }
        </div>
    )
}