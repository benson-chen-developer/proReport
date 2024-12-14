import { SearchBar } from "../SearchBar/SearchBar"
// import { slide as Menu } from "react-burger-menu";

export const LittleNavBar = () => {
    const showSettings = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    };
    
    return(
        <nav style={{
            width: '100%', 
            height: '70px', 
            background: "#F33479", 
            display: 'flex',
            justifyContent:'space-evenly',
            alignItems: 'center',
            position: 'fixed', 
            top: 0, 
            zIndex: 1000
        }}>
            
            <Menu customBurgerIcon={<BurgerIcon />} customCrossIcon={false}>
                {/* <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ showSettings } className="menu-item--small" href="">Settings</a> */}
            </Menu>

            <SearchBar />
        </nav>
    )
}

const BurgerIcon = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="24px" height="24px" 
            viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" 
            d="M3.5 5a1 1 0 0 0 0 2h17a1 1 0 1 0 0-2zm-1 7a1 1 0 0 1 1-1h17a1 1 0 1 1 0 2h-17a1 1 0 0 1-1-1m0 6.001a1 1 0 0 1 1-1h17a1 1 0 1 1 0 2h-17a1 1 0 0 1-1-1" clip-rule="evenodd"/>
        </svg>
    )
}