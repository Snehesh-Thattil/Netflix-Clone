import React, { useRef, useState } from 'react'
import './Login.css'
import Description from './Description/Description'
import SignUp from './SignUp/SignUp'
import SignInHeader from './SignInHeader/SignInHeader'
import Footer from '../Footer/Footer'

function Login() {
    const [signIn, setSignIn] = useState(false)
    const mainViewRef = useRef()

    // Rendering
    return (
        <div className='login'>
            <div className="main-view" ref={mainViewRef}>
                <div className="bg-gradient "></div>
                <SignInHeader signIn={signIn} setSignIn={setSignIn} />
                <div className="components-wrapper">
                    {signIn ? <SignUp /> : <Description mainViewRef={mainViewRef} setSignIn={setSignIn} />}
                </div>
            </div>
            <Footer mainViewRef={mainViewRef} setSignIn={setSignIn} />
        </div>
    )
}

export default Login
