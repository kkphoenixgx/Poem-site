import '../styles/NewPoemPage.css'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import menuPoemImage from '../assets/img/menuColor.png'
import menuSaveIcon from '../assets/img/menuSaveIcon.png'
import homeIcon from '../assets/img/homeIcon.png'

export const NewPoemPage = ()=>{

    let navigate = useNavigate()

    const handleStartWriting = event => {
        let text = event.target.innerText
        if ( text === 'Escreva seu poema') text = ''
    }
    const openColorPick = event => {
        // event.target.
    }
    const handleSaveClick = (name, data) =>{
        const homeLis = document.querySelectorAll('.home ul li')
        
        if(name === '') name = `Meu poema #${homeLis[homeLis.length-1].dataset.id}`

        console.log(name, data);
    }
    const handleHomeClick = ()=>{
        navigate('/')
    }
    
    useEffect( ()=>{
        
        let menuPoemPage = document.querySelector('#menuPoemPage')

        document.querySelector('#text').addEventListener('keydown', event=> {
            if(window.scrollY > 0) window.scrollTo(0, 0)
            
            let textArray = event.target.innerText.split('\n')
            let textColum =  textArray.length

            if(textColum >= 52 ){
                event.target.style.fontSize = '8px'
                resizeTitle('3%', '11px')
            } else resizeTitle('10%', '25px')

            if(textColum >= 17 && textColum <= 26 ) event.target.style.fontSize = '17px'
            else if(textColum >= 27 && textColum <= 30) event.target.style.fontSize = '14px'
            else if(textColum >= 31 && textColum <= 34 ) event.target.style.fontSize = '12px'
            else if(textColum >= 35 && textColum <= 40 ) event.target.style.fontSize = '10px'
            else if(textColum >= 41 && textColum <= 50 ) event.target.style.fontSize = '8px'
            else if(textColum >= 51 && textColum <= 74 ) event.target.style.fontSize = '6px'
            else if(textColum >= 75 ){

                event.target.innerText = event.target.innerText.substring(0,event.target.innerText.length-1)
                alert('O máximo possível é de 74 colunas')
            }

            else event.target.style.fontSize = '25px'

        })
        menuPoemPage.addEventListener('mouseover', event=>{
            document.querySelectorAll('.imgIcon').forEach(element=>{
                element.style.left = '0'
            })
        })
        menuPoemPage.addEventListener('mouseout', event=>{
            document.querySelectorAll('.imgIcon').forEach(element=>{
                element.style.left = '-15vw'
            })
        })
    } )

    // ----------- side functions -----------

    const resizeTitle = (titleSize, fontTitleSize) => {
        const textTittle = document.querySelector('#textTitle')

        textTittle.style.height = `${titleSize}`
        textTittle.style.fontSize = `${fontTitleSize}`
    }    
    
    return(
        <div className="newPoem" id='newPoemPage'>
            <input id="textTitle" className='text1' type="text" placeholder='Escreva o título do seu poema' />
            <div id="text" className='text2' onClick={handleStartWriting} contentEditable="true">
                Escreva seu poema
            </div>

            <div id='menuPoemPage' className="menuPoemPage">

                <div className='imgIcon' onClick={openColorPick}> 
                    <img src={menuPoemImage} alt="PoemColorPick" />
                </div>
                <div className='imgIcon'>
                    <img onClick={() => handleSaveClick(document.querySelector('#textTitle').innerText, document.querySelector('#text').innerText)} src={menuSaveIcon} alt="SaveIcon" />
                </div>
                
                <div className='imgIcon'>
                    <img onClick={handleHomeClick} src={homeIcon} alt="SaveIcon" />
                </div>

            </div>
        </div>
    )
}