import '../styles/NewPoemPage.css'
import { useEffect, useRef, useState } from "react";

import menuPoemImage from '../assets/img/menuColor.png'
import menuSaveIcon from '../assets/img/menuSaveIcon.png'
import closeIcon from '../assets/img/closeImage.png'
import homeIcon from '../assets/img/homeIcon.png'
import menuHamb from '../assets/img/sideMenuNewPoemPage.jpg'
import Axios from "axios"
import { ColorPicker } from './colorPickerSketch';

export const NewPoemPage = ( { closePoemPage, poem, poemKey } )=>{
    
    let textAreaRef = useRef();
    let refTittle = useRef();
    let menuPoemPage = useRef();
    let newPoemPageReference = useRef();

    let [colorPicker, setColorPicker] = useState(false);
    let [menuButton, setMenuButton] = useState(true);
    let [color, setColor] = useState("#fff");
    let [lastColor, setlastColor] = useState("#fff");
    
    let [lastPoem, setLastpoem] = useState({});

    let site = "https://server-poem-site.onrender.com"
    
    // ----------- CLICK METHODS -----------
    const openColorPick = event => {
        setColorPicker(!colorPicker)
    }
    const handleSaveClick = () =>{
        
        let text = textAreaRef.current.innerText
        let title = refTittle.current.value

        let poemObject = {
            id: localStorage.getItem("uid"),
            data: {
                title: title,
                poem: text,
                color: color,
                date: getFormatedDate()
            }
        }
        //? ADD NEW FRESH POEM
        if(poem == null || poemKey === ""){
            
            try {

                Axios.post(`${site}/addPoem`, poemObject)
                    .then(response => {
                        console.log(response);
                        closePoemPage();
                    })
                    .catch( error => {
                        console.error(error)
                    })

            } catch (error) {
                console.error(error)
            }

            
        }
        //? UPDATE POEM
        else{
            poemObject.key = poemKey;

            Axios.post(`${site}/updatePoem`, poemObject)
                .then(response => {
                    console.log(response);
                    closePoemPage();
                })
                .catch( error => {
                    console.error(error)
                })
        }


    }
    const handleHomeClick = ()=>{
        closePoemPage();
    }
    const handleCloseClick = ()=>{
        toogleSideMenu();
    }
    const handleOpenMenu = ()=>{
        toogleSideMenu();
    }

    // ----------- MAIN METHODS -----------

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
    const recoverPoemData = ()=>{
        refTittle.current.value = poem.title
        textAreaRef.current.innerText = poem.poem

        newPoemPageReference.current.style.backgroundColor = poem.color;
        refTittle.current.style.backgroundColor = poem.color;
        setColor(poem.color);
        setLastpoem(poem)
    }
    const updateColor = ()=>{
        newPoemPageReference.current.style.backgroundColor = color;
        refTittle.current.style.backgroundColor = color;
        
        const useDarkText = shouldUseDarkText(color);
        textAreaRef.current.style.color = useDarkText ? '#000000' : '#FFFFFF';
        refTittle.current.style.color = useDarkText ? '#000000' : '#FFFFFF';

        setlastColor(color)
    }

    // ----------- SIDE METHODS -----------
    const toogleSideMenu = ()=>{

        setMenuButton(!menuButton);
        menuPoemPage.current.classList.toggle('menuPoemPage');
        menuPoemPage.current.classList.toggle('menuPoemPageHoverOff');

    }
    const hexToRgb = (hex) => {
        // Remove the leading # if present
        hex = hex.replace(/^#/, '');
    
        // Convert 3-digit hex to 6-digit hex
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
    
        // Parse the r, g, b values
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
    
        return [r, g, b];
    }
    const getLuminance = (r, g, b) => {
        const a = [r, g, b].map(value => {
            value /= 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        });
    
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }
    const shouldUseDarkText = (hex) => {
        const [r, g, b] = hexToRgb(hex);
        const luminance = getLuminance(r, g, b);
        return luminance > 0.179;
    }
    const resizeTitle = (titleSize, fontTitleSize) => {
        const textTittle = document.querySelector('#textTitle')

        textTittle.style.height = `${titleSize}`
        textTittle.style.fontSize = `${fontTitleSize}`
    } 
    const getFormatedDate = () => {
        const today = new Date();

        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return (dd + '/' + mm + '/' + yyyy);
    }   

    
    useEffect( ()=>{
        const textElement = document.querySelector('#text');

        
        if(JSON.stringify(poem) !== JSON.stringify(lastPoem) && poem != null ) recoverPoemData();
        
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

        });

        if(color !== lastColor) updateColor();

    })

    
    return(
        <div className="newPoem" id='newPoemPage' ref={newPoemPageReference}>
            <input id="textTitle" ref={refTittle} className='text1' type="text" placeholder='Tittle' />
            <div id="text" ref={textAreaRef} className='text2' placeholder='Whrite your poem' contentEditable >
        </div>

            <div id='menuPoemPage' ref={menuPoemPage} className="menuPoemPage">

                <div className='imgIcon' onClick={openColorPick}> 
                    <img src={menuPoemImage} alt="PoemColorPick" />
                </div>
                <div className='imgIcon'>
                    <img onClick={() => handleSaveClick(document.querySelector('#textTitle').innerText, document.querySelector('#text').innerText)} src={menuSaveIcon} alt="SaveIcon" />
                </div>
                
                <div className='imgIcon'>
                    <img onClick={handleHomeClick} src={homeIcon} alt="SaveIcon" />
                </div>

                <div className='imgIcon'>
                    <img onClick={handleCloseClick} src={closeIcon} alt="SaveIcon" />
                </div>
            </div>
            {   menuButton?
                    <img src={menuHamb} alt="menu button" className='menuButton' onClick={handleOpenMenu} />
                : <></>
            }

            {colorPicker ? (
                <div className='colorPicker'>
                    <ColorPicker color={color} setColor={setColor} />
                </div>
            ) : null}

        </div>
    )
}