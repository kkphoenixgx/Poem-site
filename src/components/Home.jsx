import '../styles/Home.css'
import roundAddButtonImage from '../assets/img/round-add-button.png'
import roundAddButtonImageOn from '../assets/img/round-add-button-on.png'
import { useState } from 'react'

export const Home = ()=>{

    let [toggleButton, setToggleButton] = useState(false)

    const handleButtonClick = (event)=>{
        window.scrollTo(0,0)
        document.querySelector('#newPoemPage').style.display = 'table-column'
        document.querySelector('body').style.overflow = 'hidden'
        event.target.style.display = 'none'
        setToggleButton(!toggleButton)
    }
    const openPoem = event =>{
        console.log(event.target.parentNode.dataset.id);

        window.scrollTo(0,0)
        document.querySelector('#newPoemPage').style.display = 'table-column'
        document.querySelector('body').style.overflow = 'hidden'
        // document.querySelector('#text').innerHTML = getTextFromFirebase(event.target.parentNode.dataset.id)
    }

    return (
        <div className="home">
            <ul>
                <li className="homeLii" data-id='0'>
                    <h2 onClick={openPoem}>Nome do Poema</h2>
                    <h4>data</h4>
                </li>
            </ul>

            <img id='newPoemButton' onClick={handleButtonClick} src={ toggleButton ? roundAddButtonImage : roundAddButtonImageOn } alt="roundButton" />
        </div>
    )
}
