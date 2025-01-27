import Image from 'next/image'
import React, { useState } from 'react'
import { useGlobalContext } from '../../../Context/store'
import { Promo } from '../../../pages/promotions'

interface Props {
    promo: Promo
    toastFunc: () => void
}

export const PromoItem: React.FC<Props> = ({promo, toastFunc}) => {
    const [hover, setHover] = useState(false);
    const {isMobile} = useGlobalContext();

    return (
        <div 
            style={{
                width:'100%', height: '110px', 
                borderRadius:'5px', background:'#262626', 
                border: hover ? '1px solid #04FF8A' : '1px solid #A2A2A2',
                display:'flex', justifyContent:'center',
                fontWeight:'bold', marginBottom:'10px'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div style={{width:'95%', display:'flex', alignItems:'center'}}>
                <Image 
                    src={`/promos/${promo.sportsbook.split(' ')[0]}.png`} alt="Sportsbook Picture" 
                    width={65} height={65} style={{borderRadius:100}}
                    loader={({ src }) => `${src}`}
                />
                <Image 
                    src={`/promos/PrizePicks.png`} alt="Sportsbook Picture" 
                    width={65} height={65} style={{borderRadius:100}}
                    loader={({ src }) => `${src}`}
                />

                {/* Sportsbook and Bonus */}
                <div style={{marginLeft: '20px', minWidth: isMobile ? '20%' : "30%"}}>
                    <p style={{fontSize: isMobile ? '12px' : '14px', color:'#B1B1B1', margin:'5px 0px 10px 0px'}}>{promo.sportsbook}</p>
                    <p style={{fontSize: isMobile ? '14px' : '22px', color:'#fff', margin:'0px 0px 10px 0px'}}>{promo.signUp}</p>
                </div>

                {/* Description */}
                <div style={{width:'40%'}}>
                    <p style={{fontSize: isMobile ? '10px' : '14px', color:'#B1B1B1', margin: 0}}>{promo.description}</p>
                </div>

                {/* Code + Claim */}
                <div style={{display:'flex', alignItems:'flex-end', flexDirection:'column', justifyContent:'space-evenly', height:'100%', marginLeft:'auto'}}>
                    {/* Claim Btn */}
                    <div style={{
                        width: isMobile ? '50px' : '80px', height: isMobile ? '25px' : '35px', 
                        borderRadius:'5px',
                        background:'#04FF8A', display:'flex', cursor:'pointer',
                        justifyContent:'center', alignItems:'center'
                    }}>
                        <a href={promo.link} target="_blank" rel="noopener noreferrer" style={{
                            textDecoration: 'none',
                            color: '#1E1E1E',
                            fontSize: isMobile ? '11px' : '15px',
                        }}>
                            Claim
                        </a>
                    </div>

                    {/* Copy Code */}
                    <div 
                        style={{
                            width:'auto', height: isMobile ? '25px' : '35px', borderRadius:'5px',
                            display:'flex', border:'1px dashed #04FF8A',
                            justifyContent:'center', alignItems:'center',
                            padding:'0px 10px', cursor:'pointer', whiteSpace: 'nowrap' 
                        }} 
                        onClick={() => {
                            navigator.clipboard.writeText(promo.code).then(() => {
                                toastFunc(); 
                            }).catch(err => {
                                console.error('Failed to copy text: ', err);
                            });
                        }}
                    >
                        <p style={{fontSize: isMobile ? '12px' : '14px', color:"#fff", fontWeight:'initial', marginRight:'5px'}}>
                            {promo.code}
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? '14px' : "20px"} height={isMobile ? '16px' : "20px"} viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433V16a3.75 3.75 0 0 0 3.166 3.705c.137.764.402 1.416.932 1.947c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982s.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26c-.531-.53-1.183-.795-1.947-.932A3.75 3.75 0 0 0 15 1.25m2.13 3.021A2.25 2.25 0 0 0 15 2.75h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S4.025 4.705 3.89 5.71c-.138 1.029-.14 2.383-.14 4.29v6a2.25 2.25 0 0 0 1.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021M7.408 6.41c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399" clipRule="evenodd"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
