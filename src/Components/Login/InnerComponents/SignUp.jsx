import React from 'react'

function SignUp() {
  return (
    <div className='signUp'>
      <h1>Sign In</h1>
      <form action="">
        <input type="text" placeholder='Email or mobile number' />
        <input type="password" name="" id="" placeholder='Password' />
        <button type='submit'>Sign In</button>
      </form>
      <a href="/">Forgot password?</a>
      <h4>New to Netflix?<a href="/">Sign up now</a></h4>
      <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="/">Learn more.</a></p>
    </div>
  )
}

export default SignUp
