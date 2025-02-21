import React, { useRef } from 'react'
import './Landing.css'
import LoginHeader from '../LoginHeader/LoginHeader'
import Login from '../Login/Login'
import GetStarted from '../GetStarted/GetStarted'
import Faq from '../Faq/Faq'
import Footer from '../Footer/Footer'
import { useSelector } from 'react-redux'

function Landing() {
    const { render } = useSelector((state) => state.onboard)
    const mainViewRef = useRef()

    // Rendering
    return (
        <div className="login-view">
            <div className="main-view" ref={mainViewRef}>
                <div className="bg-gradient "></div>
                <LoginHeader />
                <div className="components-wrapper">
                    {render === "get-started" && <GetStarted mainViewRef={mainViewRef} />}
                    {render === "login" && <Login />}
                </div>
            </div>
            <Faq />
            <Footer mainViewRef={mainViewRef} />
        </div>
    )
}

export default Landing
