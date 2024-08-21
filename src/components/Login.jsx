import '../styles/Login.css'

import olhinho from "../assets/img/olho.png"
import closedEye from "../assets/img/closed-eye.png"
import userIcon from "../assets/img/bx-user.svg"
import lockIcon from "../assets/img/bx-lock.svg"

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Axios from "axios"


export const Login = () => {
    

    //? References && React Hooks
    const loginBox = useRef();
    const loginEmail = useRef();
    const loginPassword = useRef();

    const signUpBox = useRef();
    const signupName = useRef();
    const signupPassword = useRef();
    const signupEmail = useRef();
    
    const navigate = useNavigate();

    //? Change eye variables - Front-end code
    let [toogleEye, setToogleEye] = useState(false);
    let [toogleInvalidAccount, setToogleInvalidAccount] = useState(false);
    let [toogleInvalidInfo, setInvalidInfo] = useState(false);
    let [toogleTypePassord, setToogleTypePassord] = useState(false);
    let eye = toogleEye ? closedEye : olhinho;
    let typePassord = toogleTypePassord ? "text" : "password";


    const handleClickEvent = event => {
        event.preventDefault();
        let state = event.target.dataset.page

        switch (state) {
            case "login":

                let object =  {
                    "email" : loginEmail.current.value,
                    "password" : loginPassword.current.value
                }

                Axios.post("http://localhost:3000/login", object)
                  .then(function (response) {
                   
                    localStorage.setItem('uid', response.data.data.uid);
                    navigate("/");
                  })
                  .catch(function (error) {
                    console.log(error.response.data.message);
                    setToogleInvalidAccount(true)

                  });

                break;
            case "signUp":

                loginBox.current.style["display"] = "none"
                signUpBox.current.style["display"] = "flex"
                break;
            case "sendSignUp":

                if(!(signupEmail.current.checkValidity() && signupPassword.current.value && signupName.current.value) ){
                    
                    console.error("You shoud give correct informations")
                    setInvalidInfo(true);
                }else{

                    let object =  {
                        "name" : signupName.current.value,
                        "password" : signupPassword.current.value,
                        "email" : signupEmail.current.value,
                        "poems" : []
                    }

                    Axios.post("http://localhost:3000/signup", object)
                      .then(function (response) {
                        navigate("/");
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                }


                break;
            case "back":
                signUpBox.current.style["display"] = "none"
                loginBox.current.style["display"] = "flex"

                break;

            default:
                break;
        }

    }
    const changeEyeAndPassord = ()=>{
        if(toogleEye){
            setToogleEye(false);
            setToogleTypePassord(false)
        }
        else if(!toogleEye){
            setToogleEye(true);
            setToogleTypePassord(true)
           
        }
    }


    return (
        <div className="login">

            <div className="loginBox" ref={loginBox}>
                <h2>Login</h2>

                <form action='/login' method="post">
                    
                    <div className="email">
                        <img src={userIcon} alt="user icon" />
                        <input ref={loginEmail} type="email" placeholder="Email" required></input>
                    </div>
                
                    <div className="password">
                        <img src={lockIcon} alt="lock icon" />
                        <input ref={loginPassword} type={typePassord} id="loginPassword" placeholder="Password" required></input>
                        <img src={eye} onClick={changeEyeAndPassord} alt="show password" className='eye'/>
                    </div>

                    { toogleInvalidAccount ? <p className='invalidMessage'>Invalid email/password</p> : <></> }
                    
                    
                    <button onClick={handleClickEvent} data-page="login" alt="login">login</button>
                </form>

                <p onClick={handleClickEvent}
                    data-page="signUp"
                    alt="signUp"
                    className='signUp'
                >
                    Do not have a login? Signup
                </p>

            </div>

            <div className="signUpBox" ref={signUpBox} style={{ display: "none" }}>
                <h2>Sign up</h2>

                <form action='/signup' method="post" >

                    <input ref={signupName} type="text" placeholder="User Name" required></input>
                    <div className="password">
                        <input ref={signupPassword} type={typePassord} placeholder="Password" required></input>
                        <img src={eye} onClick={changeEyeAndPassord} alt="show password" className='eye'/>
                    </div>
                    <input ref={signupEmail} type="email" placeholder="Email" required></input>
                    { toogleInvalidInfo ? <p className='invalidMessage'>You shoud give correct informations</p> : <></> }

                    <button onClick={handleClickEvent} data-page="sendSignUp" alt="Send SignUp" >OK</button>
                </form>

               
                <p onClick={handleClickEvent}
                    data-page="back"
                    alt="cancel signup"
                    className='cancelSignUp'
                    style={{ color: "#930d0d" }}
                >
                    Cancel
                </p>
            </div>

        </div>
    )
}