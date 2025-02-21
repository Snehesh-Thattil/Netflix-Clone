import React, { useRef } from 'react'
import './Login.css'
import { auth } from '../../Firebase/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { redirectSignUp } from '../../Redux/slices/onboardSlice'

function Login() {
  const { onboarder } = useSelector((state) => state.onboard)
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // User sign-in function
  function handleSignIn(e) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  // Rendering
  return (
    <div className='Login'>
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
