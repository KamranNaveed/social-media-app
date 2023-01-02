import axios from "axios"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./register.css"

function Register() {

    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const username = useRef()
    const navigate = useNavigate()

    const handleClick = async (e)=>{
        e.preventDefault()
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match")
        } else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user)
                navigate("/login")
                
            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <div className="registerContainer">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">KamiSocial</h3>
                <span className="registerDesc">Connect with friends and the world around you on Kamisocial</span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input placeholder="Username" type="text" required className="registerInput" ref={username}/>
                    <input placeholder="Email" type="email" required className="registerInput" ref={email}/>
                    <input placeholder="Password" type="password" minLength="6" required className="registerInput" ref={password}/>
                    <input placeholder="Re-enter Password" type="password" minLength="6" required className="registerInput" ref={passwordAgain}/>
                    <button className="loginButton" type="submit">Sign Up</button>
                    <Link to='/login' className="buttonContainer" style={{textDecoration: "none"}}>
                        <button className="loginRegisterButton">
                            Log into your account
                        </button>
                    </Link>
                    
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Register
