import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginHeader.css'
import Languages from '../LangsDropdown/Languages'
import { useDispatch, useSelector } from 'react-redux'
import { redirectGetStarted, redirectLogin } from '../../Redux/slices/onboardSlice'

function LoginHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { render } = useSelector((state) => state.onboard)

    // Header logo click handling
    function handleLogoClick() {
        navigate('/')
        dispatch(redirectGetStarted())
    }

    // Sign in button click handling
    function handleSignInClick() {
        navigate('/')
        dispatch(redirectLogin())
    }

    // Rendering
    return (
        <div className="login_header">
            <img className='login_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="netflix-bg" onClick={() => handleLogoClick()} />
            {render !== 'login' &&
                <div className="buttons">
                    <Languages />
                    <button className='signin-btn' onClick={handleSignInClick}>Sign In</button>
                </div>}
        </div>
    )
}

export default LoginHeader
