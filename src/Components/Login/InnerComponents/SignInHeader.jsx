import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignInHeader({ signIn, setSignIn }) {
    const navigate = useNavigate()

    // Rendering
    return (
        <div className="login_header">
            <img className='login_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="netflix-bg" onClick={() => navigate('/')} />
            {!signIn &&
                <div className="buttons">
                    <div className="languages">
                        <div className="selected">
                            <p>Language</p>
                            <i className="fa-solid fa-caret-down"></i>
                        </div>
                        <div className='options'>
                            <button>English</button>
                            <button>Hindi</button>
                            <button>Tamil</button>
                        </div>
                    </div>

                    <button className='signin-btn' onClick={() => setSignIn(true)}>Sign In</button>
                </div>}
        </div>
    )
}

export default SignInHeader
