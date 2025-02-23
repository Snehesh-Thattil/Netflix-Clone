import React, { useRef, useState } from 'react'
import './Login.css'
import { auth } from '../../Firebase/firebase-config'
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { redirectSignUp } from '../../Redux/slices/onboardSlice'
import Loader from '../Loader/Loader'

function Login() {
  const { onboarder } = useSelector((state) => state.onboard)
  const [load, setLoad] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  // User sign-in function
  function handleSignIn(e) {
    e.preventDefault()
    setLoad(true)

    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then(async (res) => {
        const user = res.user
        await user.reload()
        await user.getIdToken(true)

        if (!user.emailVerified) {
          sendEmailVerification(res.user)
          setLoad(false)
          alert("Please verify your email before logging in.")
        }
        setLoad(false)
      })
      .catch((err) => {
        setLoad(false)
        alert(err.message)
      })
  }

  // Rendering
  return (
    <div className='Login'>
      {load && <Loader />}
      <h1>Sign In</h1>
      <form action="">
        <input type="text" placeholder='Email or mobile number' ref={emailRef} defaultValue={onboarder?.email} />
        <input type="password" name="" id="" placeholder='Password' ref={passwordRef} />
        <button type='submit' onClick={handleSignIn}>Sign In</button>
      </form>
      <a href="/">Forgot password?</a>
      <h4>New to Netflix?<Link to="sign-up" className='link' onClick={() => dispatch(redirectSignUp())}>Sign up now</Link></h4>
      <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="/">Learn more.</a></p>
    </div>
  )
}

export default Login
