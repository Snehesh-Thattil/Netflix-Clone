import React from 'react'
import './Profile.css'
import Navbar from '../Navbar/Navbar'
import Plans from './innerComponents/Plans'

function Profile() {
  return (
    <div className='profile'>
      <Navbar />
      <div className="profile-body">
        <h1>Edit Profile</h1>

        <div className="profile-info">
          <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="netflix-profile" />

          <div className="details">
            <h2>sneheshthattil75@gmail.com</h2>

            <div className="plans">
              <h3>Plans(Current Plan: premium)</h3>
              <Plans />
              <button className='signOut-btn'>Sign out</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
