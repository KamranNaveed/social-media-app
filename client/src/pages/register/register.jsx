import "./register.css"

function Register() {
  return (
    <div className="registerContainer">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">Kamisocial</h3>
                <span className="registerDesc">Connect with friends and the world around you on Kamisocial</span>
            </div>
            <div className="registerRight">
                <div className="registerBox">
                    <input placeholder="Username" type="text" className="registerInput" />
                    <input placeholder="Email" type="text" className="registerInput" />
                    <input placeholder="Password" type="text" className="registerInput" />
                    <input placeholder="Re-enter Password" type="text" className="registerInput" />
                    <button className="loginButton">Sign Up</button>
                    <button className="loginRegisterButton">
                        Log into your account
                    </button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Register
