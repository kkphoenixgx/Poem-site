import { useNavigate } from 'react-router-dom'
import '../styles/sidebarMenu.css'

import githubLogo from '../assets/img/githubIcon.png'
import linkedInIcon from '../assets/img/linkedInIcon.png'
import emailIcon from '../assets/img/emailIcon.png'

export const SidebarMenu = ()=>{

    const navigate = useNavigate()

    const handleRedirect = event=>{
        navigate(event.target.dataset.path)
        document.querySelector('#menuRoutes').style.top = '-100vh'
    }

    return (
        <ul id='menuRoutes' className='routes'>
            <h2>Páginas</h2>
            <li onClick={handleRedirect} data-path = '/' >Home</li>
            <li onClick={handleRedirect} data-path = '/login' >Login</li>
            <div>
                <h3>Contact us</h3>

                <a href="https://github.com/kkphoenixgx"> <img src={githubLogo} alt="githubLogo" /> </a>
                <a href="https://www.linkedin.com/in/kau%C3%A3-alves-santos-873b85203/"> <img src={linkedInIcon} alt="githubLogo" /> </a>
                <a href="kkphoenixvs@gmail.com"> <img src={emailIcon} alt="githubLogo" /> </a>
                
            </div>
        </ul>
    )
}