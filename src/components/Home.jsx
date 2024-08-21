import '../styles/Home.css'

import trashIconImage from '../assets/img/trashIcon.png'
import roundAddButtonImage from '../assets/img/round-add-button.png'
import scrool from '../assets/img/scrool-image.png'
import poemFitVideo from '../assets/gif/gifMakePoemFit.gif'

import { useEffect, useState } from 'react'

import Axios from "axios"
import { useNavigate } from 'react-router-dom'
import { NewPoemPage } from './newPoemPage'

export const Home = ()=>{

    let [togglePoemsPage, setTogglePoemsPage] = useState(false)
    let [toggleNewPoemsPage, setToggleNewPoemsPage] = useState(false)
    let [poemsCollection, setPoemsCollection] = useState([]);
    let [poem, setPoem] = useState({});
    let [currentPoemKey, setCurrentPoemKey] = useState("");

    const navigate = useNavigate();


    const handleButtonClick = (event)=>{
        openPoemPage();
    }
    const handleDeleteButton = event=>{
        const poemId = event.target.parentNode.parentNode.dataset.id

        Axios.delete(`http://localhost:3000/deletePoem/${localStorage.getItem("uid")}/${poemId}`)
          .then( response => {
            console.log(response);
            getPoems();
          } )
          .catch(error => {
            console.error(error);
          })
        
    }
    const openPoem = event =>{
        let poemPosition = event.target.parentNode.parentNode.dataset.position
        
        let lastPoemKey = event.target.parentNode.parentNode.dataset.id;

        openPoemPage(poemsCollection[poemPosition], lastPoemKey);
    }

    const getPoems = async () =>{
        try {

            
            if(localStorage.getItem("uid") == null){
                console.error("ERROR: invalid UID");
                setTogglePoemsPage(false);
            }else{
                Axios.get(`http://localhost:3000/poems/${localStorage.getItem("uid")}`)
                .then(response => {

                    
                    let responses = []
                    response.data.data.forEach(element => {
                        let object = element
                        object.key = element.key
                        responses.push(object)
                    });
                    setPoemsCollection(responses)
                    
                    setTogglePoemsPage(true)
                })
                .catch( error => {
                    setTogglePoemsPage(false)
                    console.error(error);
                })
            }
           

        } catch (error) {
            setTogglePoemsPage(false)
            console.error(error)
        }
    }

    //-------------------------

    const openPoemPage = (poemOpened = null, lastPoemKey = null)=>{
        
        if (poemOpened && lastPoemKey){
            setCurrentPoemKey(lastPoemKey);
            setPoem(poemOpened);
        }
        else setPoem(null)
        
        window.scrollTo(0,0)
        document.querySelector('body').style.overflow = 'hidden'
        setToggleNewPoemsPage(true)
    }

    const closePoemPage = () => {
        setToggleNewPoemsPage(false);
        document.querySelector('body').style.overflow = 'auto';
        getPoems();
    }

    useEffect( ()=>{

        getPoems();

    }, [])

    return (
        <>
             {toggleNewPoemsPage && <NewPoemPage closePoemPage={closePoemPage} poem={poem} poemKey={currentPoemKey} />}
            <div className="home">
                    { togglePoemsPage 
                    ?<ul>
                        {poemsCollection && poemsCollection.length > 0 ? (
                            poemsCollection.map((value, index) => (
                                <li className="homeLii" data-id={value.key} data-position={index} key={index}>
                                    <div className="containerUp">
                                        <h2 onClick={openPoem} >{value.title}</h2>
                                        <img src={trashIconImage}  onClick={handleDeleteButton} className='trashIcon' alt="delete item" />
                                    </div>
                                    <h4>{value.date}</h4>
                                </li>
                            ))
                        ) : (
                            <>
                                <img src={scrool} alt="Add more poems!" className='scrool' />
                                <h3>Add more poems!!</h3>
                            </>
                        )}
                    </ul>

                    : <div className="loginFirst">
                        <img className='gifPoemFit' src={poemFitVideo} alt="Make your poem fit" />
                        <h2>Save your poems and make them fit into your screen to post in your social media</h2>
                        <p onClick={ ()=>{ navigate("/login") }}>Login for use</p>
                    </div>
                }
                <img 
                    onClick={handleButtonClick} 
                    src={ roundAddButtonImage } 
                    alt="roundButton" 
                    className='addPoemIcon'
                />

            </div>
        </>
    )
}
