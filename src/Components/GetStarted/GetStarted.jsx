import React, { useRef } from 'react'
import './GetStarted.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../Firebase/firebase-config'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { redirectLogin, redirectSignUp } from '../../Redux/slices/onboardSlice'

function GetStarted({ mainViewRef, isFooter }) {
    const emailRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Handle clicking get started with email
    function handleGetStartedClick() {
        const email = emailRef.current?.value

        if (!email) {
            emailRef.current?.focus()
        }
        else if (!email.endsWith('mail.com')) {
            alert('Invalid email')
        }
        else {
            const checkUser = query(collection(db, "customers"), where("email", "==", email))

            getDocs(checkUser)
                .then(async (snapshot) => {
                    if (!snapshot.empty) {
                        dispatch(redirectLogin(snapshot.docs[0]?.data()))
                        mainViewRef.current?.scrollIntoView({ behaviour: 'smooth', block: "start" })
                    } else {
                        navigate('/sign-up')
                        dispatch(redirectSignUp(email))
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error.message);
                })
        }
    }

    // Rendering
    return (
        <div className={isFooter ? "description footer" : "description"}>
            <div className="headings">
                <h1>Unlimited movies, TV shows and more</h1>
                <h2>Starts at ₹149. Cancel at any time.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
            </div>
            <form action="">
                <input type="email" placeholder='Email address' ref={emailRef} />
                <div className="get-started" onClick={handleGetStartedClick}>
                    <p>Get Start</p>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </form>
        </div>
    )
}

export default GetStarted
