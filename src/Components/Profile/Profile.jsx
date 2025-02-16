import React from 'react'
import './Profile.css'
import Navbar from '../Navbar/Navbar'
import Plans from './innerComponents/Plans'
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase/firebase-config'
import { useSelector } from 'react-redux'

function Profile() {
  const { user } = useSelector((state) => state.user)

  // Sign out user
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        alert('Signed out successfully')
      })
      .catch((err) => {
        console.log('Error signing out', err.message)
      })
  }

  // Rendering
  return (
    <div className='profile'>
      <Navbar />
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
    </div>
  )
}

export default Profile
