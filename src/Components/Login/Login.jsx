import React from 'react'
import './Login.css'

function Login() {
    return (
        <div className='login'>
            <div className="login_header">
                <img className='login_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="netflix-bg" />
                <div className="buttons">
                    <div className="languages">
                        <div className="selected">
                            <p>Language</p>
                            <i className="fa-solid fa-caret-down"></i>
                        </div>
                        <div className='options' >
                            <button>English</button>
                            <button>Hindi</button>
                            <button>Tamil</button>
                        </div>
                    </div>

                    <button className='signin-btn'>Sign In</button>
                </div>
            </div>
            <div className="description-wrapper">
                <div className="description">
                    <h1>Unlimited movies, TV shows and more</h1>
                    <h2>Starts at ₹149. Cancel at any time.</h2>
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    <form action="">
                        <input type="email" placeholder='Email address' />
                        <div className="get-started">
                            <p>Get Started </p>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
