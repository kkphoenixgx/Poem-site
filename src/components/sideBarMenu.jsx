import { useNavigate } from 'react-router-dom'
import '../styles/sidebarMenu.css'

import githubLogo from '../assets/img/githubIcon.png'
import linkedInIcon from '../assets/img/linkedInIcon.png'
import emailIcon from '../assets/img/emailIcon.png'
import { useEffect, useRef } from 'react'

export const SidebarMenu = ({passRef})=>{

    const navigate = useNavigate()
    const sideBarRef = useRef()

    useEffect(()=>{
        passRef(sideBarRef)
    })

    const handleRedirect = event=>{
        navigate(event.target.dataset.path)
        sideBarRef.current.style.top = '-100vh'
    }

    return (
        <ul ref={sideBarRef} className='routes'>
            <h2>Pages</h2>
            <li onClick={handleRedirect} data-path = '/' >Home</li>
            <li onClick={handleRedirect} data-path = '/login' >Login</li>
            <div>
                <h3>Contact us</h3>

                <a href="https://github.com/kkphoenixgx"> <img src={githubLogo} alt="githubLogo" /> </a>
                <a href="https://www.linkedin.com/in/kkphoenix/"> <img src={linkedInIcon} alt="githubLogo" /> </a>
                <a href="kauaalvesworkplace@gmail.com"> <img src={emailIcon} alt="githubLogo" /> </a>
                
            </div>
        </ul>
    )
}