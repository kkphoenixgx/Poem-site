import '../styles/Login.css'
import userImage from "../assets/img/user.png"

export const Login = () =>{
    return (
        <div className="login">

            <div className="loginBox">
                <img src={userImage} alt="userImage"/> <br></br>
            
                <input type ="text" id ="loginName" placeholder = "User Name"></input> <br></br>
                <input type ="password" id ="loginPassword" placeholder = "Password"></input> <br></br>

                <button>OK</button>
            </div>
        </div>
    )
}