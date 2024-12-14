import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SportBtnProps {
    sport: string,
    dropDown: string,
    setDropDown: Dispatch<SetStateAction<string>>,
}

export const currentAllSports = ["WNBA", "Valorant", "LOL", "CS", "Rainbow"];

export const LeagueIcon = ({ sport, size }: { sport: string, size: string }) => {
  if (sport.toLowerCase() === "wnba") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32">
        <path fill="#fff" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m11.95 13h-5.91a14.4 14.4 0 0 1 2.738-7.153A11.94 11.94 0 0 1 27.95 15M17 15V4.05a11.9 11.9 0 0 1 6.287 2.438A16.27 16.27 0 0 0 20.04 15Zm-2 0h-3.04a16.27 16.27 0 0 0-3.247-8.512A11.9 11.9 0 0 1 15 4.051Zm0 2v10.95a11.9 11.9 0 0 1-6.287-2.438A16.27 16.27 0 0 0 11.96 17Zm2 0h3.04a16.27 16.27 0 0 0 3.248 8.512A11.9 11.9 0 0 1 17 27.949ZM7.22 7.847A14.4 14.4 0 0 1 9.96 15H4.051a11.94 11.94 0 0 1 3.17-7.153M4.05 17h5.91a14.4 14.4 0 0 1-2.738 7.153A11.94 11.94 0 0 1 4.05 17m20.73 7.153A14.4 14.4 0 0 1 22.04 17h5.908a11.94 11.94 0 0 1-3.17 7.153" />
      </svg>
    );
  }
  if (sport.toLowerCase() === "valorant") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.5 14H19l2-2V6zM9 19h5L3 6v6z" />
      </svg>
    );
  }
  if (sport.toLowerCase() === "lol") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill="#fff" d="m1.912 0l1.212 2.474v19.053L1.912 24h14.73l1.337-4.682H8.33V0ZM12 1.516c-.913 0-1.798.112-2.648.312v1.74A9.7 9.7 0 0 1 12 3.2c5.267 0 9.536 4.184 9.536 9.348a9.2 9.2 0 0 1-2.3 6.086l-.273.954l-.602 2.112c2.952-1.993 4.89-5.335 4.89-9.122C23.25 6.468 18.213 1.516 12 1.516m0 2.673c-.924 0-1.814.148-2.648.414v13.713h8.817a8.25 8.25 0 0 0 2.36-5.768c0-4.617-3.818-8.359-8.529-8.359M2.104 7.312A10.86 10.86 0 0 0 .75 12.576c0 1.906.492 3.7 1.355 5.266z" />
      </svg>
    );
  }
  if (sport.toLowerCase() === "cs") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill="#fff" d="M21.71 3.235a.02.02 0 0 1-.022-.022c.002-.081.004-.37.005-.424c0-.129-.143-.183-.212-.083l-.229.333a.02.02 0 0 1-.02.01h-6.55a.047.047 0 0 1-.048-.046l-.013-.177a.048.048 0 0 1 .056-.048l.335.032a.06.06 0 0 0 .063-.045l.244-.989a.05.05 0 0 0-.03-.054l-.227-.085a.04.04 0 0 1-.026-.03c-.041-.171-.377-1.323-1.993-1.58c-.787-.125-1.302.21-1.577.478a1.6 1.6 0 0 0-.302.41l-.097.212a2 2 0 0 0-.046.234l.051.982a.11.11 0 0 0 .043.085l.354.153l-.196.325a.055.055 0 0 1-.053.04s-.417.01-.622.02c-.386.015-1.245.485-1.878 1.838l-.724 1.55a.07.07 0 0 1-.068.04l-.578.001c-.035 0-.073.028-.088.06L6.364 9a.11.11 0 0 0 .017.108l.627.392a.06.06 0 0 1 .02.058l-.328.967a.2.2 0 0 1-.023.062l-.435.382a.1.1 0 0 0-.035.06l-.598 1.53a.06.06 0 0 1-.06.045l-.336.002a.163.163 0 0 0-.162.149l-.201 2.288l-.016.121l-.158.908a.13.13 0 0 1-.034.055l-.558.427a4.8 4.8 0 0 0-.767 1.001l-1.86 3.924a.8.8 0 0 0-.078.322l.132.235c.002.084-.032.456-.07.53l-.624 1.09a.1.1 0 0 0-.003.085l.03.07l.094.187L2.829 24c.118.011.247-.14.251-.3l.103-1.297l-.027-.195l3.606-4.232c.095-.114.222-.317.286-.45l1.719-3.79a.17.17 0 0 1 .1-.088l.109-.035a.17.17 0 0 1 .183.053c.15.181.504.781.676 1.032c.143.208.85 1.23 1.158 1.567c.086.093.349.198.466.27a.083.083 0 0 1 .03.112l-1.03 1.808l-.455 2.136a1 1 0 0 0-.036.152l-.412 1.483c.003.188-.14.286-.153.507l-.15 1.084a.06.06 0 0 0 .059.061l2.544.014q.142-.001.286-.006l.075-.007c.124-.016.563-.076.75-.15a.6.6 0 0 0 .227-.13c.185-.194.2-.278.203-.398a.3.3 0 0 0-.028-.105a.12.12 0 0 0-.06-.047l-1.18-.356a.37.37 0 0 1-.19-.134l-.317-.47a.09.09 0 0 1 .018-.097l.618-.609a.2.2 0 0 0 .048-.072l1.904-4.488c.089-.285.059-.605 0-.944c-.044-.25-.686-1.326-.854-1.624l-1.286-2.251c-.079-.138-.19-.133-.228-.276l-.073-1.118a.04.04 0 0 1 .036-.05l.33-.028a.1.1 0 0 0 .075-.048l1.147-2.155a.1.1 0 0 0-.002-.094l-.235-.29a.09.09 0 0 1-.001-.088l.352-.38a.054.054 0 0 1 .073-.02l.934.526a.4.4 0 0 0 .186.05c.26-.001.686-.154.908-.29a.4.4 0 0 0 .139-.148l.458-1.07c.006-.014.027-.012.03.003l.127.595a.064.064 0 0 0 .079.05l1.35-.3a.066.066 0 0 0 .05-.078l-.319-1.344a.07.07 0 0 1 .01-.054l.13-.203a.3.3 0 0 0 .037-.082l.159-.725a.04.04 0 0 1 .04-.032l3.732.005a.09.09 0 0 0 .093-.093v-.634a.02.02 0 0 1 .022-.021h1.439a.047.047 0 0 0 .046-.047V3.28a.047.047 0 0 0-.046-.047h-1.44z" />
      </svg>
    );
  }
  if(sport.toLocaleLowerCase() === "rainbow"){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><path fill="#fff" d="M15 9h-4v2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4m4-4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-8 12h2v-2h-2z"/></svg>
    )
  }
  if (sport.toLowerCase() === "all") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32">
        <g fill="#fff">
          <path d="M10.6 14.18a7.48 7.48 0 0 1 5.39-2.29c1.96 0 3.91.76 5.39 2.29c2.97 3.05 2.97 8.01 0 11.06a7.46 7.46 0 0 1-5.39 2.29c-2.03 0-3.95-.81-5.39-2.29a7.87 7.87 0 0 1-2.23-5.53c0-2.09.79-4.05 2.23-5.53m6.83 3.2l-.83-1.72c-.25-.52-.97-.52-1.24 0l-.83 1.72c-.1.21-.29.35-.51.38l-1.85.28c-.55.08-.77.78-.37 1.18l1.28 1.28c.19.19.26.47.17.73l-.59 1.71c-.2.57.37 1.11.91.87l2.14-.96c.17-.08.37-.08.54 0l2.14.96c.55.24 1.11-.3.91-.87l-.59-1.71a.72.72 0 0 1 .17-.73l1.28-1.28c.41-.4.18-1.1-.37-1.18l-1.85-.28a.69.69 0 0 1-.51-.38" />
          <path d="m5.708 2.01l.003.005h6.235c.67 0 1.272.335 1.602.915L16 6.962l2.447-4.022c.34-.58.95-.93 1.62-.93h2.04l-.003.005h4.561c1.44 0 2.342 1.555 1.622 2.825a16.55 16.55 0 0 1-5.42 5.77c-.353.274-.743.49-1.157.643c2.61 1.858 4.32 4.953 4.32 8.457c0 5.683-4.496 10.29-10.04 10.29c-5.546 0-10.04-4.607-10.04-10.29c0-3.511 1.715-6.612 4.334-8.468a4.3 4.3 0 0 1-1.157-.642c-2.24-1.46-4.1-3.44-5.42-5.77c-.71-1.26.2-2.82 1.65-2.82zm6.93 7.998a10 10 0 0 1 1.793-.465l.144-.236L10.537 3h-4.25a25.3 25.3 0 0 0 6.1 6.79q.124.112.251.218M25.742 3h-4.27L17.3 9.507a9.8 9.8 0 0 1 2.061.507a7 7 0 0 0 .258-.224A25.3 25.3 0 0 0 25.742 3M9.76 26.11A8.64 8.64 0 0 0 16 28.76c2.35 0 4.57-.94 6.25-2.65c3.44-3.53 3.44-9.27 0-12.8a8.69 8.69 0 0 0-12.49 0a9.1 9.1 0 0 0-2.59 6.4c0 2.42.92 4.69 2.59 6.4" />
        </g>
      </svg>
    );
  }
  return null;
};

export const SportBtn: React.FC<SportBtnProps> = ({ dropDown, setDropDown, sport }) => {
  const handleSportSelect = () => {
    setDropDown(p => p === "sports" ? "" : "sports");
  };

  /* To handle closing the drop down when clicking somewhere on the screen */
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.sport-dropdown') && dropDown !== 'players') {
        setDropDown('');
    }
  };
  useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
          document.removeEventListener('click', handleClickOutside);
      };
  }, [dropDown]);

  /* Mobile Responsivness */
  const [isMobile, setIsMobile] = useState(false); 
  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

    if(isMobile) return(
      <div style={{ position: 'relative', width:'15%', marginRight:'3px' }} className="sport-dropdown">
        <button 
          onClick={() => handleSportSelect()} 
          style={{
            width: '95%', borderRadius: 10,
            background: '#000', border: 'none', 
            display: 'flex', justifyContent: 'space-around', alignItems: 'center',
            margin: 3, cursor: 'pointer', height:'45px'
          }} 
          type="button"
        >
          <LeagueIcon sport={sport} size="20px"/>

          <svg 
            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 48 48"
            style={{
                transform: dropDown === "sports" ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease', // Optional: adds a smooth transition
            }}
          >
            <path fill="#fff" stroke="#fff" stroke-linejoin="round" strokeWidth="4" d="m12 29l12-12l12 12z" />
          </svg>

        </button>
      </div>
    )

    return (
      <div style={{ position: 'relative', width:'22%' }} className="sport-dropdown">
        <button 
          onClick={() => handleSportSelect()} 
          style={{
            width: '95%', height: "90%", borderRadius: 10,
            background: '#000', border: 'none', 
            display: 'flex', justifyContent: 'space-around', alignItems: 'center',
            margin: 3, cursor: 'pointer'
          }} 
          type="button"
        >
          <LeagueIcon sport={sport} size="15px"/>
  
          <p style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
            {sport}
          </p>
  
          {/* Up/Down Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 48 48"
            style={{
                transform: dropDown === "sports" ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease', // Optional: adds a smooth transition
            }}
           >
            <path fill="#fff" stroke="#fff" stroke-linejoin="round" strokeWidth="4" d="m12 29l12-12l12 12z" />
          </svg>
  
        </button>
      </div>
    );
};