import { Footer } from '../components/Footer/Footer';
import { NavBar } from '../components/Nav/NavBar';
import '../styles/TrendingBox.css';
import '../styles/globals.css';
import '../styles/SportDropDown.css';
import '../styles/PlayerPage.css';
import '../styles/Nav.css';
import '../styles/Combo.css';
import '@fontsource/roboto'; // Defaults to weight 400
import { GlobalContextProvider } from '../Context/store'
import Head from 'next/head';
import { ComboBtn } from '../components/Combo/ComboBtn';
import { PopUp } from '../components/Combo/PopUp';
import { LittleNavBar } from '../components/Nav/LittleNavBar/LittleNavBar';
import { useEffect, useState } from 'react';

function App({ Component, pageProps }) {
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

  return (
    <>
      <GlobalContextProvider>
        <Head>
          <title>Sports Stats</title>
          <meta name="ahrefs-site-verification" content="881627b9cdfce1e5ef0a890ec7d5477594ec45471d470d5eeaadea5976b61433" />
          <meta name="description" content="NBA, MLB, NFL, NHL, and Esports stats tracking" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/taskBarLogo.svg" />
        </Head>

        <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Navigation bar */}
          {/* {!isMobile ? <NavBar /> : <LittleNavBar />} */}

          {/* Main content area, takes up remaining space */}
          <main style={{ flex: '1 0 auto' }}>
            <Component {...pageProps} />
          </main>

          {/* Footer stays at the bottom */}
          <Footer />
        </main>

      </GlobalContextProvider>
    </>
  );
}

export default App;
