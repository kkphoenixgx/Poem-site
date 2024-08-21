import '../styles/Header.css'
import menuIcon from "../assets/img/menu-icon.png"
import logo from "../assets/img/logoCompleta.png"
import { useState } from 'react'

import  {SidebarMenu}  from './sideBarMenu';


export const Header = ( )=>{
    let menuRoutes;
    let [toogleMenuRoutes, setToogleMenuRoutes] = useState(false);
    let styleTop = toogleMenuRoutes ? '-100vh' : "10vh";

    const handleChildRef = (childRef) => {
        menuRoutes = childRef.current;
    };

    const handleMenu = ()=>{
        
        if(toogleMenuRoutes) setToogleMenuRoutes(false)
        else if(!toogleMenuRoutes) setToogleMenuRoutes(true)

        menuRoutes.style.top = styleTop
    }

    return (
        <header>
            <SidebarMenu passRef={handleChildRef} />

            <div className="siteLogo">
                <img src={logo} alt="kkophoenix logo" className='myLogo' />
                <h1>Poem Maker</h1>
            </div>
            <img className='header-img' onClick={handleMenu} src={menuIcon} alt="menuIcon" />
        </header>
    )
}