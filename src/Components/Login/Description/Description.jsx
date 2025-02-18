import React from 'react'
import './Description.css'

function Description({ mainViewRef, setSignIn, isFooter }) {

    function handleGetStartedClick() {
        setSignIn(true)
        mainViewRef.current?.scrollIntoView({ behaviour: 'smooth', block: "start" })
    }

    // Rendering
    return (
        <div className={isFooter ? "description footer" : "description"}>
            {!isFooter && <h1>Unlimited movies, TV shows and more</h1>}
            {!isFooter && <h2>Starts at ₹149. Cancel at any time.</h2>}
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
            <form action="">
                <input type="email" placeholder='Email address' />
                <div className="get-started" onClick={handleGetStartedClick}>
                    <p>Get Started </p>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </form>
        </div>
    )
}

export default Description
