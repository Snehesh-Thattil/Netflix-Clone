import React, { useState } from 'react'
import './Login.css'
import Description from './InnerComponents/Description'
import SignUp from './InnerComponents/SignUp'
import SignInHeader from './InnerComponents/SignInHeader'

function Login() {
    const [signIn, setSignIn] = useState(false)

    // Rendering
    return (
        <div className='login'>
            <div className="bg-gradient "></div>
            <SignInHeader signIn={signIn} setSignIn={setSignIn} />
            <div className="components-wrapper">
                {signIn ? <SignUp /> : <Description setSignIn={setSignIn} />}
            </div>
        </div>
    )
}

export default Login
