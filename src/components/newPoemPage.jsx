import '../styles/NewPoemPage.css'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import menuPoemImage from '../assets/img/menuColor.png'
import menuSaveIcon from '../assets/img/menuSaveIcon.png'
import homeIcon from '../assets/img/homeIcon.png'

import { currentDB, addToFirestoreDB, ChangeCurrentRef } from '../services/fireBase/FirebaseStart';

export const NewPoemPage = ()=>{

    let navigate = useNavigate()

    const handleStartWriting = event => {
        let text = event.target.innerText
        if ( text === 'Escreva seu poema') text = ''
    }
    const openColorPick = event => {
        // event.target.
        let colorPicker = document.querySelector('.inputColor')
        let btnColorPicker = document.querySelector('.btnColor')
        colorPicker.style.display = 'block'
        btnColorPicker.style.display = 'block'

    }
    const changeColorBtn = event => {
        let colorPicker = document.querySelector('.inputColor')
        let btnColorPicker = document.querySelector('.btnColor')
        
        console.log(colorPicker.value);
        console.log(document.querySelector('.newPoem').style);
        document.querySelector('#newPoemPage').style.background = colorPicker.value
        document.querySelector('#textTitle').style.background = colorPicker.value

        btnColorPicker.style.display = 'none'
        colorPicker.style.display = 'none'
    }

    const handleSaveClick = (name, data) =>{
        const homeLis = document.querySelectorAll('.home ul li')
        
        if(name === '') name = `Meu poema #${homeLis[homeLis.length-1].dataset.id}`

        ChangeCurrentRef('Users', 'Kauã Alves').then( ()=> {

            addToFirestoreDB( {
                name: name,
                data: data, currentDB,
                id: homeLis[homeLis.length-1].dataset.id
            } )
        
        } )
        // console.log(name, data);
    }
    const handleHomeClick = ()=>{
        navigate('/');
        document.querySelector('#newPoemPage').style.display = 'none';
        document.querySelector('#newPoemButton').style.display = 'block'
    }

    const resizeText = (target, text)=>{
        let textArray = text.split('\n')
        let textColum =  textArray.length

        if(textColum >= 52 ){
            target.style.fontSize = '8px'
            resizeTitle('3%', '11px')
        } else resizeTitle('10%', '25px')

        if(textColum >= 17 && textColum <= 26 ) target.style.fontSize = '17px'
        else if(textColum >= 27 && textColum <= 30) target.style.fontSize = '14px'
        else if(textColum >= 31 && textColum <= 34 ) target.style.fontSize = '12px'
        else if(textColum >= 35 && textColum <= 40 ) target.style.fontSize = '10px'
        else if(textColum >= 41 && textColum <= 50 ) target.style.fontSize = '8px'
        else if(textColum >= 51 && textColum <= 74 ) target.style.fontSize = '6px'
        else if(textColum >= 75 ){

            target.innerText = target.innerText.substring(0,target.innerText.length-1)
            alert('O máximo possível é de 74 colunas')
        }

        else target.style.fontSize = '25px'
    }
    
    
    useEffect( ()=>{
        const menuPoemPage = document.querySelector('#menuPoemPage')
        const textElement = document.querySelector('#text')
    
        
        textElement.addEventListener('keydown', event=> {
            if(!typeof event.target.innerText === 'string') return
            if(window.scrollY > 0) window.scrollTo(0, 0)
            
            document.querySelector('body').style.scrollBehavior = 'unset';
            
            let text = event.target.innerText
            if ( (event.key === 'v' && event.ctrlKey) || (event.key === 'Backspace') ){
                resizeText(event.target, text)
            } 
            // console.log(event.key);
            resizeText(event.target, text)

        })
        menuPoemPage.addEventListener('mouseover', event=>{
            document.querySelectorAll('.imgIcon').forEach(element=>{
                element.style.left = '0'
            })
        })
        menuPoemPage.addEventListener('mouseout', event=>{
            document.querySelectorAll('.imgIcon').forEach(element=>{
                element.style.left = '-50vw'
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
            <div id="text" className='text2' onClick={handleStartWriting} contentEditable >
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

                <input type="text" className='inputColor' placeholder='#FFF (coloque um valor em RGB para definir a cor)' />
                <button className='btnColor' onClick={changeColorBtn} >ok</button>
            </div>
        </div>
    )
}