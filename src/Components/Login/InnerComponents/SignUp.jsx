import React, { useRef } from 'react'
import { auth } from '../../../Firebase/firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()

  // User sign-up function
  function handleSignUp(e) {
    e.preventDefault()
    
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userAuth) => {
        console.log('|| New in user :', userAuth)
      })
      .catch((err) => {
        alert.log(err.message)
      })
  }

  // User sign-in function
  function handleSignIn(e) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userAuth) => {
        console.log('|| Signed in user :', userAuth)
      })
      .catch((err) => {
        alert.log(err.message)
      })
  }

  // Rendering
  return (
    <div className='signUp'>
      <h1>Sign In</h1>
      <form action="">
        <input type="text" placeholder='Email or mobile number' ref={emailRef} />
        <input type="password" name="" id="" placeholder='Password' ref={passwordRef} />
        <button type='submit' onClick={handleSignIn}>Sign In</button>
      </form>
      <a href="/">Forgot password?</a>
      <h4 onClick={handleSignUp}>New to Netflix?<a href="/">Sign up now</a></h4>
      <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="/">Learn more.</a></p>
    </div>
  )
}

export default SignUp
