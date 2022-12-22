import '../styles/Header.css'
import menuIcon from "../assets/img/menu-icon.png"

export const Header = ( )=>{

    const handleMenu = ()=>{

        let menuRoutes = document.querySelector('#menuRoutes')
        
        if(menuRoutes.style.top === '-100vh') menuRoutes.style.top = '10vh'
        else menuRoutes.style.top = '-100vh'

    }

    return (
        <header>
            <h1>Notes App</h1>
            <img onClick={handleMenu} src={menuIcon} alt="menuIcon" />
        </header>
    )
}