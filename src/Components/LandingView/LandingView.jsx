import React, { useRef } from 'react'
import './LandingView.css'
import Login from '../Login/Login'
import GetStarted from '../GetStarted/GetStarted'
import Faq from '../Faq/Faq'
import Footer from '../Footer/Footer'
import { useSelector } from 'react-redux'
import MovieSlider from '../MovieSlider/MovieSlider'
import ReasonsToJoin from '../ReasonsToJoin/ReasonsToJoin'

function LandingView() {
    const { render } = useSelector((state) => state.onboard)
    const mainViewRef = useRef()

    // Rendering
    return (
        <div className="login-view">
            <div className="main-view" ref={mainViewRef}>
                <div className="bg-gradient "></div>
                <div className="components-wrapper">
                    {render === "get-started" && <GetStarted mainViewRef={mainViewRef} />}
                    {render === "login" && <Login />}
                </div>
            </div>
            <MovieSlider />
            <ReasonsToJoin />
            <Faq />
            <Footer mainViewRef={mainViewRef} />
        </div>
    )
}

export default LandingView
