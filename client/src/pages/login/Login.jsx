import "./login.css"

function Login() {
  return (
    <div className="loginContainer">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Kamisocial</h3>
                <span className="loginDesc">Connect with friends and the world around you on Kamisocial</span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="Email" type="text" className="loginInput" />
                    <input placeholder="Password" type="text" className="loginInput" />
                    <button className="loginButton">Login</button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">Create New Account</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Login
