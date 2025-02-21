import React from 'react'
import './ProfileBody.css'
import Plans from '../Plans/Plans'
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase/firebase-config'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { redirectGetStarted } from '../../Redux/slices/onboardSlice'

function ProfileBody() {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Sign out user
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        alert('Signed out successfully')
        dispatch(redirectGetStarted())
        navigate('/')
      })
      .catch((err) => {
        console.log('Error signing out', err.message)
      })
  }

  // Rendering
  return (
    <div className="profile-body">
      <h1>Edit Profile</h1>

      <div className="profile-info">
        <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="netflix-profile" />

        <div className="details">
          <h2>{user.email}</h2>

          <div className="plans">
            <Plans />
            <button className='signOut-btn' onClick={handleSignOut}>Sign out</button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProfileBody
