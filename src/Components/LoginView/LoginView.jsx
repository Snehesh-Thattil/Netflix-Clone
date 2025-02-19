import React, { useRef, useState } from 'react'
import './LoginView.css'
import LoginHeader from '../LoginHeader/LoginHeader'
import Login from '../Login/Login'
import GetStarted from '../GetStarted/GetStarted'
import Faq from '../Faq/Faq'
import Footer from '../Footer/Footer'

function LoginView() {
    const [signIn, setSignIn] = useState(false)
    const mainViewRef = useRef()

    // Rendering
    return (
        <div className="login-view">
            <div className="main-view" ref={mainViewRef}>
                <div className="bg-gradient "></div>
                <LoginHeader signIn={signIn} setSignIn={setSignIn} />
                <div className="components-wrapper">
                    {signIn ? <Login /> : <GetStarted mainViewRef={mainViewRef} setSignIn={setSignIn} />}
                </div>
            </div>
            <Faq />
            <Footer setSignIn={setSignIn} mainViewRef={mainViewRef} />
        </div>
    )
}

export default LoginView
