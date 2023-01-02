import { useContext, useRef } from "react"
import "./login.css"
import {loginCall} from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress } from "@mui/material"

function Login() {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const handleClick = (e)=> {
        e.preventDefault()
        loginCall({email: email.current.value, password: password.current.value}, dispatch )
    }
    console.log(user)
  return (
    <div className="loginContainer">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Kamisocial</h3>
                <span className="loginDesc">Connect with friends and the world around you on Kamisocial</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" required className="loginInput" ref = {email} />
                    <input placeholder="Password" type="password" required minLength = "6" className="loginInput" ref = {password}/>
                    <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/> : "Login"}</button>
                    {error && <span className="errorMessage">Wrong Password or Email</span>}
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/> : "Create New Account"}</button>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Login
