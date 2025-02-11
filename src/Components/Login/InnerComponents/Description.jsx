import React from 'react'

function Description({ setSignIn }) {

    // Rendering
    return (
        <div className="description">
            <h1>Unlimited movies, TV shows and more</h1>
            <h2>Starts at ₹149. Cancel at any time.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
            <form action="">
                <input type="email" placeholder='Email address' />
                <div className="get-started" onClick={() => setSignIn(true)}>
                    <p>Get Started </p>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </form>
        </div>
    )
}

export default Description
